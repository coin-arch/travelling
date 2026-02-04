-- Enable Row Level Security
-- Create tables for Adventure Marketplace

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    icon_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Locations table
CREATE TABLE locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities/Stays table
CREATE TABLE activities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    duration TEXT,
    category_id UUID REFERENCES categories(id),
    location_id UUID REFERENCES locations(id),
    images JSONB DEFAULT '[]',
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL, -- Link to auth.users if needed
    user_name TEXT,
    user_location TEXT,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample categories
INSERT INTO categories (name, slug) VALUES 
('Luxury Villas', 'luxury-villas'),
('Water Sports', 'water-sports'),
('Paragliding', 'paragliding'),
('Trekking', 'trekking'),
('Camping', 'camping');

-- Insert sample locations
INSERT INTO locations (name, slug) VALUES 
('Mumbai', 'mumbai'),
('Pune', 'pune'),
('Goa', 'goa'),
('Rishikesh', 'rishikesh'),
('Bangalore', 'bangalore');
