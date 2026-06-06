import { NextRequest, NextResponse } from 'next/server'
import { inquirySchema } from '@/lib/validation/inquiry'
import { sendConfirmationEmail, sendNotificationEmail } from '@/lib/resend/send'

// In-memory rate limit store (fine for MVP, resets on deploy)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000 // 1 hour
  const maxRequests = 3

  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (entry.count >= maxRequests) {
    return false
  }

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Server-side validation
    const result = inquirySchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const data = result.data

    // Honeypot check — silently succeed for bots
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ ok: true, id: 'honeypot' })
    }

    // Rate limit
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Prepare inquiry row
    const inquiryData: Record<string, unknown> = {
      type: data.type,
      company_name: data.company_name,
      contact_name: data.contact_name,
      email: data.email,
      phone: data.phone || null,
      country: data.country,
      message: data.message || null,
      source_url: data.source_url || null,
      utm_source: data.utm_source || null,
      utm_medium: data.utm_medium || null,
      utm_campaign: data.utm_campaign || null,
      referrer: data.referrer || null,
    }

    // Add type-specific fields
    if (data.type === 'quote_request') {
      inquiryData.product_slug_snapshot = data.product_slug || null
      inquiryData.container_type = data.container_type || null
      inquiryData.estimated_quantity_liters = data.estimated_quantity_liters || null
      inquiryData.timeline = data.timeline
    } else if (data.type === 'specs_request') {
      inquiryData.product_slug_snapshot = data.product_slug || null
    } else if (data.type === 'contact') {
      inquiryData.subject = data.subject
    }

    // If product slug provided, try to snapshot the product name
    if ('product_slug' in data && data.product_slug) {
      try {
        const { getProductBySlug } = await import('@/lib/data/products')
        const product = await getProductBySlug(data.product_slug)
        if (product) {
          inquiryData.product_id = product.id
          inquiryData.product_name_snapshot = product.name
        }
      } catch {
        // Non-critical, continue
      }
    }

    // Insert into Supabase if configured
    let inquiryId = 'local-' + Date.now()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseServiceKey) {
      const { getSupabaseServiceClient } = await import('@/lib/supabase/server')
      const supabase = getSupabaseServiceClient()
      const { data: row, error } = await supabase
        .from('inquiries')
        .insert(inquiryData)
        .select('id')
        .single()

      if (error) {
        console.error('Supabase insert error:', error)
        return NextResponse.json(
          { error: 'Failed to save inquiry. Please try again.' },
          { status: 500 }
        )
      }
      inquiryId = row.id
    } else {
      // Dev mode — log to console
      console.log('[DEV] Inquiry received:', JSON.stringify(inquiryData, null, 2))
    }

    // Send notification via Web3Forms (always works, no config needed)
    try {
      const productName = (inquiryData.product_name_snapshot as string) || ''
      const quantity = (inquiryData.estimated_quantity_liters as number) || 0

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ab6a127e-e17e-4745-ba90-c0d87603adb9',
          subject: `[${data.type.replace('_', ' ').toUpperCase()}] ${data.company_name}${productName ? ` — ${productName}` : ''}${quantity ? ` — ${quantity}L` : ''}`,
          from_name: `${data.contact_name} (${data.company_name})`,
          email: data.email,
          phone: data.phone || 'N/A',
          country: data.country,
          inquiry_type: data.type.replace('_', ' '),
          product: productName || 'N/A',
          quantity: quantity ? `${quantity} liters` : 'N/A',
          timeline: 'timeline' in data ? data.timeline : 'N/A',
          message: data.message || 'No message',
          source_url: data.source_url || 'N/A',
        }),
      })
    } catch (emailError) {
      console.error('Web3Forms send failed:', emailError)
    }

    // Send Resend emails if configured (optional, fire-and-forget)
    try {
      await Promise.all([
        sendConfirmationEmail(data),
        sendNotificationEmail(data, inquiryData),
      ])
    } catch (emailError) {
      console.error('Resend email failed:', emailError)
    }

    return NextResponse.json({ ok: true, id: inquiryId })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
