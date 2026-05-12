-- =====================================================
-- Seed: 4 reference products from Stitch design
-- =====================================================

-- 1. Extra Virgin Olive Oil — Spanish
insert into products (sku, slug, name, category, grade, origin_country, origin_region, short_description, long_description, specifications, certifications, hero_image_url, base_unit_price_cents, base_currency, base_unit, moq_liters, lead_time_days, port_of_origin, status, display_order)
values (
  'EVOO-SP-1000',
  'extra-virgin-olive-oil-spanish',
  'Premium Extra Virgin Olive Oil',
  'Olive Oils',
  'Extra Virgin',
  'Spain',
  'Jaen',
  'Bulk industrial supply for premium food manufacturers and high-end restaurant chains. Harvest 2023/24.',
  'Our Spanish Extra Virgin Olive Oil is cold-pressed within 24 hours of harvest in Jaen, Spain. This premium-grade oil is ideal for high-end food manufacturing, restaurant chains, and specialty food producers who demand the highest quality. Every batch undergoes rigorous ISO 22000 laboratory testing for acidity, peroxide value, and UV absorbency to ensure consistent quality.',
  '{"free_acidity": {"result": "0.24%", "limit": "≤ 0.8%"}, "peroxide_value": {"result": "7.2 mEq O2/kg", "limit": "≤ 20"}, "absorbency_k270": {"result": "0.14", "limit": "≤ 0.22"}, "absorbency_k232": {"result": "1.65", "limit": "≤ 2.50"}, "wax_content": {"result": "85 mg/kg", "limit": "≤ 150"}}',
  '{"ISO 22000","EU Organic"}',
  '/images/site/hero.jpeg',
  485,
  'EUR',
  'liter',
  1000,
  21,
  'Valencia, Spain',
  'active',
  1
);

-- 2. Refined Sunflower Oil — Ukrainian, High-Oleic
insert into products (sku, slug, name, category, grade, origin_country, origin_region, short_description, long_description, specifications, certifications, hero_image_url, base_unit_price_cents, base_currency, base_unit, moq_liters, lead_time_days, port_of_origin, status, display_order)
values (
  'SFO-UA-200',
  'refined-sunflower-oil-high-oleic',
  'Refined Sunflower Oil',
  'Seed Oils',
  'High-Oleic',
  'Ukraine',
  null,
  'High-oleic grade refined sunflower oil for industrial frying and food processing applications.',
  'Our high-oleic refined sunflower oil is sourced from premium Ukrainian sunflower crops and refined to meet the highest industrial standards. With superior oxidative stability, this oil is ideal for high-temperature frying operations, snack food manufacturing, and commercial food processing. Available in 200L industrial drums for efficient logistics.',
  '{"free_fatty_acid": {"result": "0.05%", "limit": "≤ 0.1%"}, "peroxide_value": {"result": "1.5 mEq O2/kg", "limit": "≤ 10"}, "oleic_acid": {"result": "82%", "limit": "≥ 75%"}, "iodine_value": {"result": "82", "limit": "75-90"}, "smoke_point": {"result": "232°C", "limit": "≥ 220°C"}}',
  '{"ISO 22000"}',
  '/images/products/sunflower-oil.png',
  380,
  'USD',
  'liter',
  1000,
  14,
  'Odessa, Ukraine',
  'low_stock',
  2
);

-- 3. Non-GMO Canola Oil — Canadian, Expeller Pressed
insert into products (sku, slug, name, category, grade, origin_country, origin_region, short_description, long_description, specifications, certifications, hero_image_url, base_unit_price_cents, base_currency, base_unit, moq_liters, lead_time_days, port_of_origin, status, display_order)
values (
  'CAN-CA-20',
  'non-gmo-canola-oil-canadian',
  'Non-GMO Canola Oil',
  'Seed Oils',
  'Expeller Pressed',
  'Canada',
  null,
  'Expeller-pressed non-GMO canola oil. Full pallet quantities (48 x 20L).',
  'Our Canadian Non-GMO Canola Oil is expeller-pressed without chemical solvents, preserving the natural nutritional profile. Sourced from verified non-GMO Canadian canola crops, this oil offers a neutral flavor profile ideal for commercial baking, foodservice frying, and processed food manufacturing. Available in 20L containers, shipped as full pallets (48 units per pallet).',
  '{"free_fatty_acid": {"result": "0.04%", "limit": "≤ 0.1%"}, "erucic_acid": {"result": "<0.5%", "limit": "≤ 2%"}, "smoke_point": {"result": "204°C", "limit": "≥ 200°C"}, "omega_3": {"result": "11%", "limit": "9-13%"}, "saturated_fat": {"result": "7%", "limit": "≤ 8%"}}',
  '{"ISO 22000","Non-GMO Project Verified"}',
  '/images/products/canola-oil.jpg',
  1680,
  'USD',
  'pallet',
  960,
  18,
  'Vancouver, Canada',
  'backorder',
  3
);

-- 4. Premium Fryer Blend — Soybean & Palm Olein
insert into products (sku, slug, name, category, grade, origin_country, origin_region, short_description, long_description, specifications, certifications, hero_image_url, base_unit_price_cents, base_currency, base_unit, moq_liters, lead_time_days, port_of_origin, status, display_order)
values (
  'BLN-MX-1000',
  'premium-fryer-blend',
  'Premium Fryer Blend',
  'Blended Oils',
  null,
  'Multi-origin',
  null,
  'Soybean & Palm Olein blend optimized for high-volume commercial frying operations.',
  'Our Premium Fryer Blend combines refined soybean oil with palm olein in an optimized ratio for maximum fry life and consistent food quality. Engineered for high-volume commercial frying operations including QSR chains, industrial snack production, and institutional foodservice. The blend offers superior oxidative stability with a high smoke point for extended fryer cycles.',
  '{"free_fatty_acid": {"result": "0.06%", "limit": "≤ 0.1%"}, "smoke_point": {"result": "228°C", "limit": "≥ 220°C"}, "polar_compounds": {"result": "3%", "limit": "≤ 25%"}, "blend_ratio": {"result": "60/40 Soy/Palm", "limit": "N/A"}, "iodine_value": {"result": "115", "limit": "110-120"}}',
  '{"ISO 22000","RSPO Certified"}',
  '/images/products/soybean-oil.png',
  2100,
  'USD',
  'unit',
  1000,
  14,
  'Veracruz, Mexico',
  'active',
  4
);

-- =====================================================
-- Containers for each product
-- =====================================================

-- EVOO containers
insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '20l_jerrycan', '20L Jerrycan', 20, 540, false, 1 from products where sku = 'EVOO-SP-1000';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '200l_drum', '200L Industrial Drum', 200, 510, false, 2 from products where sku = 'EVOO-SP-1000';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '1000l_ibc', '1000L IBC Tote', 1000, 485, true, 3 from products where sku = 'EVOO-SP-1000';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, 'flexitank', 'Flexitank (24,000L)', 24000, 460, false, 4 from products where sku = 'EVOO-SP-1000';

-- Sunflower Oil containers
insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '200l_drum', '200L Industrial Drum', 200, 380, true, 1 from products where sku = 'SFO-UA-200';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '1000l_ibc', '1000L IBC Tote', 1000, 355, false, 2 from products where sku = 'SFO-UA-200';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, 'flexitank', 'Flexitank (24,000L)', 24000, 330, false, 3 from products where sku = 'SFO-UA-200';

-- Canola Oil containers
insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '20l_pallet', 'Full Pallet (48 x 20L)', 960, 1680, true, 1 from products where sku = 'CAN-CA-20';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '20l_pallet_3', '3+ Pallets (48 x 20L each)', 2880, 1550, false, 2 from products where sku = 'CAN-CA-20';

-- Fryer Blend containers
insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, '1000l_ibc', '1000L IBC Tote', 1000, 2100, true, 1 from products where sku = 'BLN-MX-1000';

insert into product_containers (product_id, container_type, display_name, volume_liters, unit_price_cents, is_default, display_order)
select id, 'flexitank', 'Flexitank (24,000L)', 24000, 1950, false, 2 from products where sku = 'BLN-MX-1000';

-- =====================================================
-- Pricing tiers for each product
-- =====================================================

-- EVOO pricing tiers
insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Standard', 1000, 5000, 485, 'Ideal for Boutique Bottling', false, 1 from products where sku = 'EVOO-SP-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Business', 5001, 20000, 442, 'Logistics Optimized (FCL)', false, 2 from products where sku = 'EVOO-SP-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Enterprise', 20001, 100000, 415, 'Contract Supply Ready', false, 3 from products where sku = 'EVOO-SP-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Global B2B', 100001, null, null, null, true, 4 from products where sku = 'EVOO-SP-1000';

-- Sunflower Oil pricing tiers
insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Standard', 1000, 10000, 380, 'Drum Quantities', false, 1 from products where sku = 'SFO-UA-200';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Business', 10001, 50000, 355, 'IBC/Flexitank Pricing', false, 2 from products where sku = 'SFO-UA-200';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Enterprise', 50001, 200000, 335, 'Bulk Contract', false, 3 from products where sku = 'SFO-UA-200';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Global B2B', 200001, null, null, null, true, 4 from products where sku = 'SFO-UA-200';

-- Canola Oil pricing tiers
insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Standard', 960, 5000, 1680, 'Single Pallet', false, 1 from products where sku = 'CAN-CA-20';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Business', 5001, 20000, 1550, 'Multi-Pallet Discount', false, 2 from products where sku = 'CAN-CA-20';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Enterprise', 20001, 100000, 1420, 'Annual Supply Agreement', false, 3 from products where sku = 'CAN-CA-20';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Global B2B', 100001, null, null, null, true, 4 from products where sku = 'CAN-CA-20';

-- Fryer Blend pricing tiers
insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Standard', 1000, 5000, 2100, 'IBC Quantities', false, 1 from products where sku = 'BLN-MX-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Business', 5001, 25000, 1950, 'Multi-IBC Pricing', false, 2 from products where sku = 'BLN-MX-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Enterprise', 25001, 100000, 1820, 'Flexitank / Bulk Contract', false, 3 from products where sku = 'BLN-MX-1000';

insert into product_pricing_tiers (product_id, tier_name, min_liters, max_liters, unit_price_cents, label, is_inquiry_only, display_order)
select id, 'Global B2B', 100001, null, null, null, true, 4 from products where sku = 'BLN-MX-1000';
