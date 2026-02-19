-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'user',
    password_hash TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    icon TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Locations Table
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Properties Table (CORE)
CREATE TABLE IF NOT EXISTS properties (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration TEXT,
    group_size_min INTEGER,
    group_size_max INTEGER,
    level TEXT,
    season TEXT,
    address TEXT,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    location_id UUID REFERENCES locations(id) ON DELETE SET NULL,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Property Images Table
CREATE TABLE IF NOT EXISTS property_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Amenities Table
CREATE TABLE IF NOT EXISTS amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    icon TEXT
);

-- 7. Property Amenities Join Table
CREATE TABLE IF NOT EXISTS property_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
    UNIQUE(property_id, amenity_id)
);

-- 8. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    booking_date DATE NOT NULL,
    slot TEXT,
    quantity INTEGER DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Payments Table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method TEXT,
    payment_status TEXT DEFAULT 'pending',
    transaction_id TEXT UNIQUE,
    paid_at TIMESTAMPTZ
);

-- 10. Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    city TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT,
    image_url TEXT,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


-- 12. Newsletter Subscribers Table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- MIGRATION: Ensure slug exists if table was created previously
ALTER TABLE properties ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- SAMPLE DATA INSERTION
-- Use a block to ensure we can capture IDs for foreign keys

DO $$
DECLARE
    v_user_id UUID;
    v_cat_id UUID;
    v_loc_id UUID;
    v_prop_id UUID;
    v_amenity_id UUID;
BEGIN
    -- 1. Insert Sample User
    INSERT INTO users (name, email, role)
    VALUES ('Admin User', 'admin@khoji.com', 'admin')
    ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_user_id;

    -- 2. Insert Sample Category
    INSERT INTO categories (name, slug, icon)
    VALUES ('Trekking', 'trekking', 'mountain-icon')
    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
    RETURNING id INTO v_cat_id;

    -- 3. Insert Sample Location
    INSERT INTO locations (city, state, country)
    VALUES ('Manali', 'Himachal Pradesh', 'India')
    RETURNING id INTO v_loc_id;

    -- 4. Insert Sample Property (CORE)
    INSERT INTO properties (
        title, slug, description, price, duration, group_size_min, group_size_max, 
        level, season, address, category_id, location_id, created_by
    )
    VALUES (
        'Beas Kund Trek', 
        'beas-kund-trek',
        'A beautiful trek to the source of the Beas River.', 
        5000.00, 
        '3 Days / 2 Nights', 
        2, 12, 
        'Moderate', 'Summer/Autumn', 
        'Old Manali, Near Temple', 
        v_cat_id, v_loc_id, v_user_id
    )
    RETURNING id INTO v_prop_id;

    -- 5. Insert Sample Property Image
    INSERT INTO property_images (property_id, image_url, is_primary)
    VALUES (v_prop_id, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b', TRUE);

    -- 6. Insert Sample Amenity
    INSERT INTO amenities (name, icon)
    VALUES ('Camping Gear', 'tent-icon')
    RETURNING id INTO v_amenity_id;

    -- 7. Link Amenity to Property
    INSERT INTO property_amenities (property_id, amenity_id)
    VALUES (v_prop_id, v_amenity_id)
    ON CONFLICT DO NOTHING;

    -- 8. Insert Sample Review
    INSERT INTO reviews (user_id, property_id, rating, comment, city)
    VALUES (v_user_id, v_prop_id, 5, 'Amazing experience!', 'Delhi');

    -- 9. Insert Sample Blog
    INSERT INTO blogs (title, slug, content, image_url, author_id, published_at)
    VALUES (
        'Top 10 Treks in Manali', 
        'top-10-treks-manali', 
        'Discover the best trekking routes...', 
        'https://images.unsplash.com/photo-1551632811-561732d1e306', 
        v_user_id, 
        NOW()
    )
    ON CONFLICT (slug) DO NOTHING;

    -- 10. Insert Sample Newsletter Subscriber
    INSERT INTO newsletter_subscribers (email)
    VALUES ('explorer@example.com')
    ON CONFLICT DO NOTHING;


END $$;

-- ==========================================
-- AUTH SYNC TRIGGER
-- ==========================================

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email,
    'user'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS (For marketplace visibility)
CREATE POLICY "Allow public read access for categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access for locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Allow public read access for properties" ON properties FOR SELECT USING (true);
CREATE POLICY "Allow public read access for images" ON property_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access for amenities" ON amenities FOR SELECT USING (true);
CREATE POLICY "Allow public read access for property_amenities" ON property_amenities FOR SELECT USING (true);
CREATE POLICY "Allow public read access for reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Allow public read access for blogs" ON blogs FOR SELECT USING (true);

-- USER SPECIFIC ACCESS
CREATE POLICY "Users can view their own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM bookings 
    WHERE bookings.id = payments.booking_id 
    AND bookings.user_id = auth.uid()
  )
);

-- ADMIN / PARTNER ACCESS (Simplified: only authenticated admins can write to core tables)
-- In a real app, you'd check a 'role' column in a profile table
CREATE POLICY "Admins can manage categories" ON categories 
  FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage properties" ON properties 
  FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admins can manage blogs" ON blogs 
  FOR ALL USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
