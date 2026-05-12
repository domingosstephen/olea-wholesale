'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { contactInquirySchema, type ContactInquiryInput } from '@/lib/validation/inquiry'
import { FormField } from './form-field'
import { SuccessState } from './success-state'

const SUBJECTS = [
  'General Inquiry',
  'Partnership',
  'Press',
  'Careers',
  'Other',
]

const COUNTRIES = [
  'United States', 'United Kingdom', 'Germany', 'France', 'Spain', 'Portugal',
  'Italy', 'Netherlands', 'Belgium', 'Canada', 'Mexico', 'Brazil',
  'United Arab Emirates', 'Saudi Arabia', 'Japan', 'South Korea', 'Australia', 'Other',
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      type: 'contact',
      company_name: '',
      contact_name: '',
      email: '',
      phone: '',
      country: '',
      subject: '',
      message: '',
      privacy_accepted: undefined as unknown as true,
      website: '',
    },
  })

  if (submitted) {
    return <SuccessState type="contact" />
  }

  const onSubmit = async (data: ContactInquiryInput) => {
    setServerError(null)

    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      data.utm_source = url.searchParams.get('utm_source') || undefined
      data.utm_medium = url.searchParams.get('utm_medium') || undefined
      data.utm_campaign = url.searchParams.get('utm_campaign') || undefined
      data.source_url = window.location.href
      data.referrer = document.referrer
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => null)
        throw new Error(body?.error || 'Something went wrong. Please try again.')
      }

      setSubmitted(true)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {serverError && (
        <div className="rounded-lg border border-error bg-error-container px-4 py-3 text-body-md text-on-error-container">
          {serverError}
        </div>
      )}

      <input type="hidden" {...register('type')} />

      <div className="grid gap-4 sm:grid-cols-2">
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
        <FormField label="Company Name" required error={errors.company_name}>
          <input
            {...register('company_name')}
            className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </FormField>
        <FormField label="Phone" error={errors.phone}>
          <input
            type="tel"
            {...register('phone')}
            placeholder="Optional"
            className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </FormField>
        <FormField label="Country" required error={errors.country}>
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
        <FormField label="Subject" required error={errors.subject}>
          <select
            {...register('subject')}
            className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="">Select a subject</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Message" required error={errors.message}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder="How can we help you?"
          className="w-full rounded-lg border border-outline bg-surface-bright px-4 py-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </FormField>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input {...register('website')} tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          {...register('privacy_accepted')}
          className="mt-1 h-4 w-4 rounded border-outline text-primary focus:ring-primary"
        />
        <span className="text-body-md text-on-surface-variant">
          I agree to the{' '}
          <a href="/privacy" target="_blank" className="text-secondary hover:underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/terms" target="_blank" className="text-secondary hover:underline">
            Terms of Service
          </a>
          . <span className="text-error">*</span>
        </span>
      </label>
      {errors.privacy_accepted && (
        <p className="text-label-sm text-error">{errors.privacy_accepted.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-label-md text-on-primary transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
