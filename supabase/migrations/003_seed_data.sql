-- Seed Communities
INSERT INTO communities (id, slug, name_en, name_ar, property_count) VALUES
('11111111-1111-1111-1111-111111111111', 'palm-jumeirah', 'Palm Jumeirah', 'نخلة جميرا', 12),
('22222222-2222-2222-2222-222222222222', 'downtown-dubai', 'Downtown Dubai', 'وسط مدينة دبي', 15),
('33333333-3333-3333-3333-333333333333', 'dubai-marina', 'Dubai Marina', 'مرسى دبي', 8);

-- Seed Properties
INSERT INTO properties (
    id, slug, title_en, title_ar, price, price_verified, bedrooms, bathrooms, area_sqft, 
    community, property_type, tenure, verification_status, is_featured, images, thumbnail
) VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'luxury-villa-palm',
    'Luxury Signature Villa',
    'فيلا فخمة مميزة',
    25000000,
    true,
    5,
    6,
    7000,
    'Palm Jumeirah',
    'villa',
    'ready',
    'verified',
    true,
    '{"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"}',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80'
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'modern-apartment-downtown',
    'Modern Apartment with Burj View',
    'شقة حديثة بإطلالة على البرج',
    4500000,
    true,
    2,
    3,
    1500,
    'Downtown Dubai',
    'apartment',
    'ready',
    'verified',
    true,
    '{"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"}',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'penthouse-marina',
    'Exclusive Marina Penthouse',
    'بنتهاوس حصري في المرسى',
    12000000,
    false,
    4,
    5,
    5000,
    'Dubai Marina',
    'penthouse',
    'ready',
    'review',
    false,
    '{"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"}',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
);
