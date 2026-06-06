'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { quoteInquirySchema, specsInquirySchema, type QuoteInquiryInput, type SpecsInquiryInput } from '@/lib/validation/inquiry'
import { FormField } from './form-field'
import { SuccessState } from './success-state'
import type { Product } from '@/types'

interface QuoteFormProps {
  prefilledProduct?: Product | null
  prefilledContainer?: string
  prefilledQuantity?: number
  prefilledType?: 'quote_request' | 'specs_request'
  prefilledTier?: string
  allProducts: { slug: string; name: string }[]
}

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Portugal',
  'Italy', 'Netherlands', 'Belgium', 'Canada', 'Mexico', 'Brazil',
  'United Arab Emirates', 'Saudi Arabia', 'Japan', 'South Korea', 'Australia', 'Other',
]

type FormType = 'quote_request' | 'specs_request' | 'contact'

export function QuoteForm({
  prefilledProduct,
  prefilledContainer,
  prefilledQuantity,
  prefilledType = 'quote_request',
  prefilledTier,
  allProducts,
}: QuoteFormProps) {
  const [inquiryType, setInquiryType] = useState<FormType>(prefilledType)
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const isQuote = inquiryType === 'quote_request'
  const schema = isQuote ? quoteInquirySchema : specsInquirySchema

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    // eslint-disable-next-line
    resolver: zodResolver(schema) as any,
    defaultValues: {
      type: prefilledType,
      product_slug: prefilledProduct?.slug || '',
      container_type: prefilledContainer || '',
      estimated_quantity_liters: prefilledQuantity || undefined,
      timeline: 'exploring',
      country: '',
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      message: prefilledTier ? `Interested in ${prefilledTier} tier pricing.` : '',
      privacy_accepted: undefined as unknown as true,
      website: '',
      source_url: typeof window !== 'undefined' ? window.location.href : '',
      referrer: typeof window !== 'undefined' ? document.referrer : '',
    } as QuoteInquiryInput,
  })

  if (submitted) {
    return <SuccessState type={inquiryType as 'quote_request' | 'specs_request'} />
  }

  const onSubmit = async (data: QuoteInquiryInput | SpecsInquiryInput) => {
    setServerError(null)

    // Capture UTM params
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      ;(data as QuoteInquiryInput).utm_source = url.searchParams.get('utm_source') || undefined
      ;(data as QuoteInquiryInput).utm_medium = url.searchParams.get('utm_medium') || undefined
      ;(data as QuoteInquiryInput).utm_campaign = url.searchParams.get('utm_campaign') || undefined
      data.source_url = window.location.href
      data.referrer = document.referrer
    }

    try {
      // Send to API (Supabase storage + Resend if configured)
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }

      // Send email notification via Web3Forms (client-side)
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: 'ab6a127e-e17e-4745-ba90-c0d87603adb9',
          subject: `[${inquiryType.replace('_', ' ').toUpperCase()}] ${data.company_name}`,
          from_name: `${data.contact_name} (${data.company_name})`,
          email: data.email,
          phone: data.phone || 'N/A',
          country: data.country,
          inquiry_type: inquiryType.replace('_', ' '),
          product: (data as QuoteInquiryInput).product_slug || 'N/A',
          quantity: (data as QuoteInquiryInput).estimated_quantity_liters ? `${(data as QuoteInquiryInput).estimated_quantity_liters} liters` : 'N/A',
          timeline: (data as QuoteInquiryInput).timeline || 'N/A',
          message: data.message || 'No message',
        }),
      }).catch(() => {})

      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {serverError && (
        <div className="rounded-lg border border-error bg-error-container px-4 py-3 text-body-md text-on-error-container">
          {serverError}
        </div>
      )}

      {/* Inquiry context card */}
      {prefilledProduct && (
        <div className="rounded-xl border border-outline-variant bg-surface-container-low p-5">
          <p className="mb-1 font-label text-label-sm text-on-surface-variant">About your inquiry</p>
          <p className="text-body-lg font-semibold text-on-surface">{prefilledProduct.name}</p>
          <p className="text-body-md text-on-surface-variant">SKU: {prefilledProduct.sku}</p>
        </div>
      )}

      {/* Inquiry type */}
      <div>
        <p className="mb-3 font-label text-label-md text-on-surface">Inquiry Type</p>
        <div className="flex flex-wrap gap-3">
          {[
            { value: 'quote_request', label: 'Get a quote' },
            { value: 'specs_request', label: 'Request product specs' },
            { value: 'contact', label: 'General inquiry' },
          ].map((opt) => (
            <label
              key={opt.value}
              className={`cursor-pointer rounded-lg border px-4 py-2.5 text-label-md transition-colors ${
                inquiryType === opt.value
                  ? 'border-primary bg-primary text-on-primary'
                  : 'border-outline text-on-surface hover:bg-surface-container'
              }`}
            >
              <input
                type="radio"
                value={opt.value}
                checked={inquiryType === opt.value}
                onChange={(e) => setInquiryType(e.target.value as FormType)}
                className="sr-only"
              />
              {opt.label}
            </label>
          ))}
        </div>
      </div>

      <input type="hidden" {...register('type')} value={inquiryType} />

      {/* Company details */}
      <div>
        <h3 className="mb-4 font-label text-label-md uppercase tracking-wider text-on-surface">
          Company Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Company Name" required error={errors.company_name}>
            <input
              {...register('company_name')}
              className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </FormField>
          <FormField label="Contact Name" required error={errors.contact_name}>
            <input
              {...register('contact_name')}
              className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </FormField>
          <FormField label="Work Email" required error={errors.email}>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </FormField>
          <FormField label="Phone" error={errors.phone}>
            <input
              type="tel"
              {...register('phone')}
              placeholder="Optional but encouraged"
              className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </FormField>
          <FormField label="Country" required error={errors.country} className="sm:col-span-2">
            <select
              {...register('country')}
              className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      {/* Sourcing details (quote only) */}
      {isQuote && (
        <div>
          <h3 className="mb-4 font-label text-label-md uppercase tracking-wider text-on-surface">
            Sourcing Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {!prefilledProduct && (
              <FormField label="Product of Interest" className="sm:col-span-2">
                <select
                  {...register('product_slug' as keyof QuoteInquiryInput)}
                  className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select a product</option>
                  {allProducts.map((p) => (
                    <option key={p.slug} value={p.slug}>{p.name}</option>
                  ))}
                  <option value="other">Other / multiple products</option>
                </select>
              </FormField>
            )}
            <FormField label="Estimated Quantity (liters)">
              <input
                type="number"
                min={1}
                {...register('estimated_quantity_liters' as keyof QuoteInquiryInput)}
                className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </FormField>
            <FormField label="Timeline" required error={errors.timeline}>
              <select
                {...register('timeline' as keyof QuoteInquiryInput)}
                className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="exploring">Just exploring</option>
                <option value="asap">Need ASAP</option>
                <option value="within_30_days">Within 30 days</option>
                <option value="within_90_days">Within 90 days</option>
              </select>
            </FormField>
          </div>
        </div>
      )}

      {/* Message */}
      <FormField label="Message" error={errors.message}>
        <textarea
          {...register('message')}
          rows={4}
          placeholder={isQuote ? 'Any special requirements, certifications needed, or questions...' : 'Your message...'}
          className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </FormField>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register('website')} tabIndex={-1} autoComplete="off" />
      </div>

      {/* Privacy checkbox */}
      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register('privacy_accepted')}
          className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
        />
        <span className="text-body-md text-on-surface-variant">
          I agree to the{' '}
          <Link href="/privacy" target="_blank" className="text-secondary hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" target="_blank" className="text-secondary hover:underline">
            Terms of Service
          </Link>
          . <span className="text-error">*</span>
        </span>
      </label>
      {errors.privacy_accepted && (
        <p className="text-label-sm text-error">{errors.privacy_accepted.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-6 py-3.5 text-label-md text-on-secondary transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Submitting...' : isQuote ? 'Submit Quote Request' : 'Submit Request'}
      </button>
    </form>
  )
}
