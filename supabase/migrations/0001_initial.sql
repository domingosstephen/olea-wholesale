-- =====================================================
-- products
-- =====================================================
create table products (
  id uuid primary key default gen_random_uuid(),
  sku text unique not null,
  slug text unique not null,
  name text not null,
  category text not null,
  grade text,
  origin_country text,
  origin_region text,
  short_description text,
  long_description text,
  specifications jsonb,
  certifications text[],
  hero_image_url text,
  gallery_images jsonb,
  base_unit_price_cents int not null,
  base_currency text not null default 'EUR',
  base_unit text not null default 'liter',
  moq_liters int not null default 1000,
  lead_time_days int not null default 21,
  port_of_origin text,
  status text not null default 'active'
    check (status in ('active','low_stock','backorder','archived')),
  display_order int default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_status_idx on products(status);
create index products_category_idx on products(category);

-- =====================================================
-- product_containers
-- =====================================================
create table product_containers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  container_type text not null,
  display_name text not null,
  volume_liters int not null,
  unit_price_cents int not null,
  is_default boolean default false,
  display_order int default 0
);
create index product_containers_product_idx on product_containers(product_id);

-- =====================================================
-- product_pricing_tiers (shown on product page; reference only)
-- =====================================================
create table product_pricing_tiers (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade not null,
  tier_name text not null,
  min_liters int not null,
  max_liters int,
  unit_price_cents int,
  label text,
  is_inquiry_only boolean default false,
  display_order int default 0
);
create index product_pricing_tiers_product_idx on product_pricing_tiers(product_id);

-- =====================================================
-- inquiries (unified: quote requests, specs requests, general contact)
-- =====================================================
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quote_request','specs_request','contact')),

  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  country text,

  product_id uuid references products(id) on delete set null,
  product_slug_snapshot text,
  product_name_snapshot text,
  container_type text,
  estimated_quantity_liters int,
  timeline text check (timeline in ('asap','within_30_days','within_90_days','exploring') or timeline is null),

  subject text,
  message text,

  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,

  status text not null default 'new'
    check (status in ('new','reviewed','quoted','won','lost','closed')),
  internal_notes text,

  created_at timestamptz not null default now()
);

create index inquiries_type_idx on inquiries(type);
create index inquiries_status_idx on inquiries(status);
create index inquiries_created_idx on inquiries(created_at desc);
create index inquiries_email_idx on inquiries(email);

-- =====================================================
-- updated_at trigger for products
-- =====================================================
create or replace function set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

create trigger products_updated_at before update on products
  for each row execute function set_updated_at();

-- =====================================================
-- Row-Level Security
-- =====================================================
alter table products enable row level security;
alter table product_containers enable row level security;
alter table product_pricing_tiers enable row level security;
alter table inquiries enable row level security;

-- Public read on catalog
create policy "products public read" on products
  for select using (status != 'archived');
create policy "containers public read" on product_containers
  for select using (true);
create policy "pricing tiers public read" on product_pricing_tiers
  for select using (true);
