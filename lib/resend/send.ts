import type { InquiryInput } from '@/lib/validation/inquiry'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'hello@olea-wholesale.com'
const OPS_EMAIL = process.env.RESEND_OPS_EMAIL || 'infomegatitulocomerciotradelda@gmail.com'

async function sendEmail(to: string, subject: string, html: string) {
  if (!RESEND_API_KEY) {
    console.log(`[DEV] Email skipped (no RESEND_API_KEY):\n  To: ${to}\n  Subject: ${subject}`)
    return
  }

  const { Resend } = await import('resend')
  const resend = new Resend(RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: `Olea Wholesale <${FROM_EMAIL}>`,
    to,
    subject,
    html,
  })

  if (error) {
    console.error('Resend error:', error)
    throw error
  }
}

export async function sendConfirmationEmail(data: InquiryInput) {
  const subjects = {
    quote_request: 'We received your quote request — Olea Wholesale',
    specs_request: 'We received your specs request — Olea Wholesale',
    contact: 'Thanks for reaching out — Olea Wholesale',
  }

  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
      <h1 style="font-size: 24px; font-weight: 600; color: #191c1e; margin-bottom: 16px;">
        Thank you, ${data.contact_name}
      </h1>
      <p style="font-size: 16px; line-height: 24px; color: #45464d;">
        We've received your ${data.type === 'quote_request' ? 'quote request' : data.type === 'specs_request' ? 'specs request' : 'message'} and our supply team will review it promptly.
      </p>
      <p style="font-size: 16px; line-height: 24px; color: #45464d;">
        <strong>Expected response time:</strong> Within 1 business day
      </p>

      <div style="background: #f2f4f6; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <h3 style="font-size: 14px; font-weight: 600; color: #191c1e; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">
          Submission Summary
        </h3>
        <table style="width: 100%; font-size: 14px; color: #45464d;">
          <tr><td style="padding: 4px 0;"><strong>Company:</strong></td><td>${data.company_name}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Contact:</strong></td><td>${data.contact_name}</td></tr>
          <tr><td style="padding: 4px 0;"><strong>Email:</strong></td><td>${data.email}</td></tr>
          ${data.country ? `<tr><td style="padding: 4px 0;"><strong>Country:</strong></td><td>${data.country}</td></tr>` : ''}
          ${data.message ? `<tr><td style="padding: 4px 0;"><strong>Message:</strong></td><td>${data.message}</td></tr>` : ''}
        </table>
      </div>

      <p style="font-size: 14px; color: #45464d;">
        For urgent inquiries, contact us on WhatsApp: <a href="https://wa.me/351917379662" style="color: #745b11;">+351 917 379 662</a>
      </p>

      <hr style="border: none; border-top: 1px solid #c6c6cd; margin: 24px 0;" />

      <p style="font-size: 12px; color: #76777d;">
        Olea Wholesale Corp. · <a href="https://www.megatitulocomercio.com/products" style="color: #745b11;">Browse our catalog</a>
      </p>
    </div>
  `

  await sendEmail(data.email, subjects[data.type], html)
}

export async function sendNotificationEmail(data: InquiryInput, inquiryData: Record<string, unknown>) {
  let subject = ''
  const productName = (inquiryData.product_name_snapshot as string) || 'N/A'
  const quantity = (inquiryData.estimated_quantity_liters as number) || 0

  switch (data.type) {
    case 'quote_request':
      subject = `[QUOTE] ${data.company_name} — ${productName} — ${quantity ? quantity + 'L' : 'TBD'}`
      break
    case 'specs_request':
      subject = `[SPECS] ${data.company_name} — ${productName}`
      break
    case 'contact':
      subject = `[CONTACT] ${data.company_name} — ${'subject' in data ? data.subject : 'General'}`
      break
  }

  const rows = Object.entries(inquiryData)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .map(([k, v]) => `<tr><td style="padding: 6px 12px; font-weight: 600; color: #191c1e; white-space: nowrap; vertical-align: top;">${k}</td><td style="padding: 6px 12px; color: #45464d;">${v}</td></tr>`)
    .join('')

  const html = `
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 700px; margin: 0 auto; padding: 24px;">
      <h2 style="font-size: 20px; font-weight: 600; color: #191c1e; margin-bottom: 16px;">
        New ${data.type.replace('_', ' ')} from ${data.company_name}
      </h2>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px; border: 1px solid #c6c6cd; border-radius: 8px;">
        <thead>
          <tr style="background: #131b2e;">
            <th style="padding: 8px 12px; text-align: left; color: #fff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Field</th>
            <th style="padding: 8px 12px; text-align: left; color: #fff; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>

      <p style="margin-top: 16px; font-size: 12px; color: #76777d;">
        View in Supabase dashboard to manage this inquiry.
      </p>
    </div>
  `

  await sendEmail(OPS_EMAIL, subject, html)
}
