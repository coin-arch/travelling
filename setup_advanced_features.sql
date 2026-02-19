-- 1. Create Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Property Amenities (Many-to-Many)
CREATE TABLE IF NOT EXISTS property_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    UNIQUE(property_id, amenity_id)
);

-- 3. Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Seed Amenities
INSERT INTO amenities (name, icon) VALUES 
    ('Private Pool', '🏊'),
    ('Wifi', '📶'),
    ('Chef on Call', '👨‍🍳'),
    ('Air Conditioning', '❄️'),
    ('Bonfire', '🔥'),
    ('Pet Friendly', '🐾'),
    ('Parking', '🚗'),
    ('Housekeeping', '🧹')
ON CONFLICT (name) DO NOTHING;

-- 5. Link Amenities to Existing Villas (Example for one villa)
-- Repeat this logic for other villas as needed
DO $$
DECLARE
    v_prop_id UUID;
    v_amenity_id UUID;
BEGIN
    FOR v_prop_id IN SELECT id FROM properties LOOP
        -- Link 'Wifi' and 'Parking' to every property
        SELECT id INTO v_amenity_id FROM amenities WHERE name = 'Wifi';
        INSERT INTO property_amenities (property_id, amenity_id) VALUES (v_prop_id, v_amenity_id) ON CONFLICT DO NOTHING;
        
        SELECT id INTO v_amenity_id FROM amenities WHERE name = 'Parking';
        INSERT INTO property_amenities (property_id, amenity_id) VALUES (v_prop_id, v_amenity_id) ON CONFLICT DO NOTHING;

        -- Link 'Private Pool' to villas (those with 'Villa' in title)
        IF EXISTS (SELECT 1 FROM properties WHERE id = v_prop_id AND title ILIKE '%Villa%') THEN
            SELECT id INTO v_amenity_id FROM amenities WHERE name = 'Private Pool';
            INSERT INTO property_amenities (property_id, amenity_id) VALUES (v_prop_id, v_amenity_id) ON CONFLICT DO NOTHING;
        END IF;
    END LOOP;
END $$;

-- 6. Seed some initial reviews
INSERT INTO reviews (property_id, user_name, rating, comment)
SELECT id, 'Rahul Sharma', 5, 'Absolutely stunning! The pool was pristine and the service was top-notch.' FROM properties LIMIT 5;

INSERT INTO reviews (property_id, user_name, rating, comment)
SELECT id, 'Priya V.', 4, 'Great stay, very peaceful. A bit far from the main road but worth it for the views.' FROM properties OFFSET 2 LIMIT 5;
