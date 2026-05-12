import type { Product, ProductContainer, ProductPricingTier } from '@/types'

// Hardcoded seed data for development without Supabase
const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'EVOO-SP-1000',
    slug: 'extra-virgin-olive-oil-spanish',
    name: 'Premium Extra Virgin Olive Oil',
    category: 'Olive Oils',
    grade: 'Extra Virgin',
    origin_country: 'Spain',
    origin_region: 'Jaen',
    short_description: 'Bulk industrial supply for premium food manufacturers and high-end restaurant chains. Harvest 2023/24.',
    long_description: 'Our Spanish Extra Virgin Olive Oil is cold-pressed within 24 hours of harvest in Jaen, Spain. This premium-grade oil is ideal for high-end food manufacturing, restaurant chains, and specialty food producers who demand the highest quality. Every batch undergoes rigorous ISO 22000 laboratory testing for acidity, peroxide value, and UV absorbency to ensure consistent quality.',
    specifications: {
      free_acidity: { result: '0.24%', limit: '≤ 0.8%' },
      peroxide_value: { result: '7.2 mEq O2/kg', limit: '≤ 20' },
      absorbency_k270: { result: '0.14', limit: '≤ 0.22' },
      absorbency_k232: { result: '1.65', limit: '≤ 2.50' },
      wax_content: { result: '85 mg/kg', limit: '≤ 150' },
    },
    certifications: ['ISO 22000', 'EU Organic'],
    hero_image_url: '/images/site/hero.jpeg',
    gallery_images: null,
    base_unit_price_cents: 485,
    base_currency: 'EUR',
    base_unit: 'liter',
    moq_liters: 1000,
    lead_time_days: 21,
    port_of_origin: 'Valencia, Spain',
    status: 'active',
    display_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    sku: 'SFO-UA-200',
    slug: 'refined-sunflower-oil-high-oleic',
    name: 'Refined Sunflower Oil',
    category: 'Seed Oils',
    grade: 'High-Oleic',
    origin_country: 'Ukraine',
    origin_region: null,
    short_description: 'High-oleic grade refined sunflower oil for industrial frying and food processing applications.',
    long_description: 'Our high-oleic refined sunflower oil is sourced from premium Ukrainian sunflower crops and refined to meet the highest industrial standards. With superior oxidative stability, this oil is ideal for high-temperature frying operations, snack food manufacturing, and commercial food processing.',
    specifications: {
      free_fatty_acid: { result: '0.05%', limit: '≤ 0.1%' },
      peroxide_value: { result: '1.5 mEq O2/kg', limit: '≤ 10' },
      oleic_acid: { result: '82%', limit: '≥ 75%' },
      iodine_value: { result: '82', limit: '75-90' },
      smoke_point: { result: '232°C', limit: '≥ 220°C' },
    },
    certifications: ['ISO 22000'],
    hero_image_url: '/images/products/sunflower-oil.png',
    gallery_images: null,
    base_unit_price_cents: 380,
    base_currency: 'USD',
    base_unit: 'liter',
    moq_liters: 1000,
    lead_time_days: 14,
    port_of_origin: 'Odessa, Ukraine',
    status: 'low_stock',
    display_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    sku: 'CAN-CA-20',
    slug: 'non-gmo-canola-oil-canadian',
    name: 'Non-GMO Canola Oil',
    category: 'Seed Oils',
    grade: 'Expeller Pressed',
    origin_country: 'Canada',
    origin_region: null,
    short_description: 'Expeller-pressed non-GMO canola oil. Full pallet quantities (48 x 20L).',
    long_description: 'Our Canadian Non-GMO Canola Oil is expeller-pressed without chemical solvents, preserving the natural nutritional profile. Sourced from verified non-GMO Canadian canola crops, this oil offers a neutral flavor profile ideal for commercial baking, foodservice frying, and processed food manufacturing.',
    specifications: {
      free_fatty_acid: { result: '0.04%', limit: '≤ 0.1%' },
      erucic_acid: { result: '<0.5%', limit: '≤ 2%' },
      smoke_point: { result: '204°C', limit: '≥ 200°C' },
      omega_3: { result: '11%', limit: '9-13%' },
      saturated_fat: { result: '7%', limit: '≤ 8%' },
    },
    certifications: ['ISO 22000', 'Non-GMO Project Verified'],
    hero_image_url: '/images/products/canola-oil.jpg',
    gallery_images: null,
    base_unit_price_cents: 1680,
    base_currency: 'USD',
    base_unit: 'pallet',
    moq_liters: 960,
    lead_time_days: 18,
    port_of_origin: 'Vancouver, Canada',
    status: 'backorder',
    display_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    sku: 'BLN-MX-1000',
    slug: 'premium-fryer-blend',
    name: 'Premium Fryer Blend',
    category: 'Blended Oils',
    grade: null,
    origin_country: 'Multi-origin',
    origin_region: null,
    short_description: 'Soybean & Palm Olein blend optimized for high-volume commercial frying operations.',
    long_description: 'Our Premium Fryer Blend combines refined soybean oil with palm olein in an optimized ratio for maximum fry life and consistent food quality. Engineered for high-volume commercial frying operations including QSR chains, industrial snack production, and institutional foodservice.',
    specifications: {
      free_fatty_acid: { result: '0.06%', limit: '≤ 0.1%' },
      smoke_point: { result: '228°C', limit: '≥ 220°C' },
      polar_compounds: { result: '3%', limit: '≤ 25%' },
      blend_ratio: { result: '60/40 Soy/Palm', limit: 'N/A' },
      iodine_value: { result: '115', limit: '110-120' },
    },
    certifications: ['ISO 22000', 'RSPO Certified'],
    hero_image_url: '/images/products/soybean-oil.png',
    gallery_images: null,
    base_unit_price_cents: 2100,
    base_currency: 'USD',
    base_unit: 'unit',
    moq_liters: 1000,
    lead_time_days: 14,
    port_of_origin: 'Veracruz, Mexico',
    status: 'active',
    display_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

const SEED_CONTAINERS: Record<string, ProductContainer[]> = {
  '1': [
    { id: 'c1', product_id: '1', container_type: '20l_jerrycan', display_name: '20L Jerrycan', volume_liters: 20, unit_price_cents: 540, is_default: false, display_order: 1 },
    { id: 'c2', product_id: '1', container_type: '200l_drum', display_name: '200L Industrial Drum', volume_liters: 200, unit_price_cents: 510, is_default: false, display_order: 2 },
    { id: 'c3', product_id: '1', container_type: '1000l_ibc', display_name: '1000L IBC Tote', volume_liters: 1000, unit_price_cents: 485, is_default: true, display_order: 3 },
    { id: 'c4', product_id: '1', container_type: 'flexitank', display_name: 'Flexitank (24,000L)', volume_liters: 24000, unit_price_cents: 460, is_default: false, display_order: 4 },
  ],
  '2': [
    { id: 'c5', product_id: '2', container_type: '200l_drum', display_name: '200L Industrial Drum', volume_liters: 200, unit_price_cents: 380, is_default: true, display_order: 1 },
    { id: 'c6', product_id: '2', container_type: '1000l_ibc', display_name: '1000L IBC Tote', volume_liters: 1000, unit_price_cents: 355, is_default: false, display_order: 2 },
    { id: 'c7', product_id: '2', container_type: 'flexitank', display_name: 'Flexitank (24,000L)', volume_liters: 24000, unit_price_cents: 330, is_default: false, display_order: 3 },
  ],
  '3': [
    { id: 'c8', product_id: '3', container_type: '20l_pallet', display_name: 'Full Pallet (48 x 20L)', volume_liters: 960, unit_price_cents: 1680, is_default: true, display_order: 1 },
    { id: 'c9', product_id: '3', container_type: '20l_pallet_3', display_name: '3+ Pallets (48 x 20L each)', volume_liters: 2880, unit_price_cents: 1550, is_default: false, display_order: 2 },
  ],
  '4': [
    { id: 'c10', product_id: '4', container_type: '1000l_ibc', display_name: '1000L IBC Tote', volume_liters: 1000, unit_price_cents: 2100, is_default: true, display_order: 1 },
    { id: 'c11', product_id: '4', container_type: 'flexitank', display_name: 'Flexitank (24,000L)', volume_liters: 24000, unit_price_cents: 1950, is_default: false, display_order: 2 },
  ],
}

const SEED_PRICING_TIERS: Record<string, ProductPricingTier[]> = {
  '1': [
    { id: 't1', product_id: '1', tier_name: 'Standard', min_liters: 1000, max_liters: 5000, unit_price_cents: 485, label: 'Ideal for Boutique Bottling', is_inquiry_only: false, display_order: 1 },
    { id: 't2', product_id: '1', tier_name: 'Business', min_liters: 5001, max_liters: 20000, unit_price_cents: 442, label: 'Logistics Optimized (FCL)', is_inquiry_only: false, display_order: 2 },
    { id: 't3', product_id: '1', tier_name: 'Enterprise', min_liters: 20001, max_liters: 100000, unit_price_cents: 415, label: 'Contract Supply Ready', is_inquiry_only: false, display_order: 3 },
    { id: 't4', product_id: '1', tier_name: 'Global B2B', min_liters: 100001, max_liters: null, unit_price_cents: null, label: null, is_inquiry_only: true, display_order: 4 },
  ],
  '2': [
    { id: 't5', product_id: '2', tier_name: 'Standard', min_liters: 1000, max_liters: 10000, unit_price_cents: 380, label: 'Drum Quantities', is_inquiry_only: false, display_order: 1 },
    { id: 't6', product_id: '2', tier_name: 'Business', min_liters: 10001, max_liters: 50000, unit_price_cents: 355, label: 'IBC/Flexitank Pricing', is_inquiry_only: false, display_order: 2 },
    { id: 't7', product_id: '2', tier_name: 'Enterprise', min_liters: 50001, max_liters: 200000, unit_price_cents: 335, label: 'Bulk Contract', is_inquiry_only: false, display_order: 3 },
    { id: 't8', product_id: '2', tier_name: 'Global B2B', min_liters: 200001, max_liters: null, unit_price_cents: null, label: null, is_inquiry_only: true, display_order: 4 },
  ],
  '3': [
    { id: 't9', product_id: '3', tier_name: 'Standard', min_liters: 960, max_liters: 5000, unit_price_cents: 1680, label: 'Single Pallet', is_inquiry_only: false, display_order: 1 },
    { id: 't10', product_id: '3', tier_name: 'Business', min_liters: 5001, max_liters: 20000, unit_price_cents: 1550, label: 'Multi-Pallet Discount', is_inquiry_only: false, display_order: 2 },
    { id: 't11', product_id: '3', tier_name: 'Enterprise', min_liters: 20001, max_liters: 100000, unit_price_cents: 1420, label: 'Annual Supply Agreement', is_inquiry_only: false, display_order: 3 },
    { id: 't12', product_id: '3', tier_name: 'Global B2B', min_liters: 100001, max_liters: null, unit_price_cents: null, label: null, is_inquiry_only: true, display_order: 4 },
  ],
  '4': [
    { id: 't13', product_id: '4', tier_name: 'Standard', min_liters: 1000, max_liters: 5000, unit_price_cents: 2100, label: 'IBC Quantities', is_inquiry_only: false, display_order: 1 },
    { id: 't14', product_id: '4', tier_name: 'Business', min_liters: 5001, max_liters: 25000, unit_price_cents: 1950, label: 'Multi-IBC Pricing', is_inquiry_only: false, display_order: 2 },
    { id: 't15', product_id: '4', tier_name: 'Enterprise', min_liters: 25001, max_liters: 100000, unit_price_cents: 1820, label: 'Flexitank / Bulk Contract', is_inquiry_only: false, display_order: 3 },
    { id: 't16', product_id: '4', tier_name: 'Global B2B', min_liters: 100001, max_liters: null, unit_price_cents: null, label: null, is_inquiry_only: true, display_order: 4 },
  ],
}

function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

async function getSupabaseProducts(filters?: { grade?: string[]; origin?: string[]; page?: number }): Promise<{ products: Product[]; total: number }> {
  const { getSupabaseServerClient } = await import('@/lib/supabase/server')
  const supabase = getSupabaseServerClient()
  let query = supabase.from('products').select('*', { count: 'exact' }).neq('status', 'archived').order('display_order')

  if (filters?.grade?.length) {
    query = query.in('grade', filters.grade)
  }
  if (filters?.origin?.length) {
    query = query.in('origin_country', filters.origin)
  }

  const page = filters?.page || 1
  const perPage = 12
  const from = (page - 1) * perPage
  query = query.range(from, from + perPage - 1)

  const { data, count, error } = await query
  if (error) throw error
  return { products: (data as Product[]) || [], total: count || 0 }
}

export async function getProducts(filters?: { grade?: string[]; origin?: string[]; page?: number }): Promise<{ products: Product[]; total: number }> {
  if (isSupabaseConfigured()) {
    return getSupabaseProducts(filters)
  }

  let products = [...SEED_PRODUCTS]

  if (filters?.grade?.length) {
    products = products.filter((p) => p.grade && filters.grade!.includes(p.grade))
  }
  if (filters?.origin?.length) {
    products = products.filter((p) => p.origin_country && filters.origin!.includes(p.origin_country))
  }

  const total = products.length
  const page = filters?.page || 1
  const perPage = 12
  const start = (page - 1) * perPage
  products = products.slice(start, start + perPage)

  return { products, total }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (isSupabaseConfigured()) {
    const { getSupabaseServerClient } = await import('@/lib/supabase/server')
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).neq('status', 'archived').single()
    if (error) return null
    return data as Product
  }

  return SEED_PRODUCTS.find((p) => p.slug === slug) || null
}

export async function getProductContainers(productId: string): Promise<ProductContainer[]> {
  if (isSupabaseConfigured()) {
    const { getSupabaseServerClient } = await import('@/lib/supabase/server')
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from('product_containers').select('*').eq('product_id', productId).order('display_order')
    if (error) return []
    return (data as ProductContainer[]) || []
  }

  return SEED_CONTAINERS[productId] || []
}

export async function getProductPricingTiers(productId: string): Promise<ProductPricingTier[]> {
  if (isSupabaseConfigured()) {
    const { getSupabaseServerClient } = await import('@/lib/supabase/server')
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from('product_pricing_tiers').select('*').eq('product_id', productId).order('display_order')
    if (error) return []
    return (data as ProductPricingTier[]) || []
  }

  return SEED_PRICING_TIERS[productId] || []
}

export async function getAllProducts(): Promise<Product[]> {
  if (isSupabaseConfigured()) {
    const { getSupabaseServerClient } = await import('@/lib/supabase/server')
    const supabase = getSupabaseServerClient()
    const { data, error } = await supabase.from('products').select('*').neq('status', 'archived').order('display_order')
    if (error) return []
    return (data as Product[]) || []
  }

  return SEED_PRODUCTS
}
