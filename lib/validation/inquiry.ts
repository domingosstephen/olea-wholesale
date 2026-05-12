import { z } from 'zod'

const baseFields = {
  company_name: z.string().min(1, 'Company name is required').max(200),
  contact_name: z.string().min(1, 'Contact name is required').max(200),
  email: z.string().email('Valid work email is required'),
  phone: z.string().max(30).optional().or(z.literal('')),
  country: z.string().min(1, 'Country is required'),
  message: z.string().max(5000).optional().or(z.literal('')),
  privacy_accepted: z.literal(true, { error: 'You must accept the privacy policy' }),
  website: z.string().max(0).optional(), // honeypot
  source_url: z.string().optional(),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  referrer: z.string().optional(),
}

export const quoteInquirySchema = z.object({
  type: z.literal('quote_request'),
  ...baseFields,
  product_slug: z.string().optional(),
  container_type: z.string().optional(),
  estimated_quantity_liters: z.coerce.number().int().min(1).optional(),
  timeline: z.enum(['asap', 'within_30_days', 'within_90_days', 'exploring']),
})

export const specsInquirySchema = z.object({
  type: z.literal('specs_request'),
  ...baseFields,
  product_slug: z.string().min(1, 'Please select a product'),
})

export const contactInquirySchema = z.object({
  type: z.literal('contact'),
  ...baseFields,
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required').max(5000),
})

export const inquirySchema = z.discriminatedUnion('type', [
  quoteInquirySchema,
  specsInquirySchema,
  contactInquirySchema,
])

export type QuoteInquiryInput = z.infer<typeof quoteInquirySchema>
export type SpecsInquiryInput = z.infer<typeof specsInquirySchema>
export type ContactInquiryInput = z.infer<typeof contactInquirySchema>
export type InquiryInput = z.infer<typeof inquirySchema>
