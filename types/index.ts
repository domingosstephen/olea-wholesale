export interface Product {
  id: string
  sku: string
  slug: string
  name: string
  category: string
  grade: string | null
  origin_country: string | null
  origin_region: string | null
  short_description: string | null
  long_description: string | null
  specifications: Record<string, unknown> | null
  certifications: string[] | null
  hero_image_url: string | null
  gallery_images: { url: string; alt: string }[] | null
  base_unit_price_cents: number
  base_currency: string
  base_unit: string
  moq_liters: number
  lead_time_days: number
  port_of_origin: string | null
  status: 'active' | 'low_stock' | 'backorder' | 'archived'
  display_order: number
  created_at: string
  updated_at: string
}

export interface ProductContainer {
  id: string
  product_id: string
  container_type: string
  display_name: string
  volume_liters: number
  unit_price_cents: number
  is_default: boolean
  display_order: number
}

export interface ProductPricingTier {
  id: string
  product_id: string
  tier_name: string
  min_liters: number
  max_liters: number | null
  unit_price_cents: number | null
  label: string | null
  is_inquiry_only: boolean
  display_order: number
}

export interface Inquiry {
  id: string
  type: 'quote_request' | 'specs_request' | 'contact'
  company_name: string
  contact_name: string
  email: string
  phone: string | null
  country: string | null
  product_id: string | null
  product_slug_snapshot: string | null
  product_name_snapshot: string | null
  container_type: string | null
  estimated_quantity_liters: number | null
  timeline: 'asap' | 'within_30_days' | 'within_90_days' | 'exploring' | null
  subject: string | null
  message: string | null
  source_url: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  referrer: string | null
  status: 'new' | 'reviewed' | 'quoted' | 'won' | 'lost' | 'closed'
  internal_notes: string | null
  created_at: string
}
