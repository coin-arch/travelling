-- Add image_url to categories if it doesn't exist
ALTER TABLE categories ADD COLUMN IF NOT EXISTS image_url TEXT;

DO $$
DECLARE
    v_user_id UUID;
    v_adventure_cat UUID;
    v_stay_cat UUID;
    v_camping_cat UUID;
    v_rishikesh_loc UUID;
    v_lonavala_loc UUID;
    v_munnar_loc UUID;
    v_prop_id UUID;
BEGIN
    -- 1. Get Admin User ID
    SELECT id INTO v_user_id FROM users WHERE email = 'admin@khoji.com' LIMIT 1;

    -- 2. Insert Exactly 8 Premium Categories with Specific Pinterest Images
    INSERT INTO categories (name, slug, icon, image_url) VALUES 
        ('Bungee Jumping', 'bungee-jumping', '🤸', 'https://i.pinimg.com/736x/ca/8c/ea/ca8cea85723a23722cb39cf120f1c6e8.jpg'),
        ('Luxury Villas', 'luxury-villas', '🏡', 'https://i.pinimg.com/1200x/07/13/02/0713024b2e11515519909d718cc558a7.jpg'),
        ('Paragliding', 'paragliding', '🪂', 'https://i.pinimg.com/736x/4b/01/9a/4b019af37db2c59b7c7b71beec683db0.jpg'),
        ('Luxury Sailing', 'luxury-sailing', '⛵', 'https://i.pinimg.com/736x/df/39/d4/df39d4e8f03d63b91206899cbc8a4c90.jpg'),
        ('Water Sports', 'water-sports', '🛶', 'https://i.pinimg.com/736x/a5/e7/1a/a5e71a9a6a3617f7160adc59a045629b.jpg'),
        ('Trekking', 'trekking', '⛰️', 'https://i.pinimg.com/736x/0a/7f/1d/0a7f1db37c3dfa52ce24f077f61a8de6.jpg'),
        ('Camping', 'camping', '⛺', 'https://i.pinimg.com/736x/a0/ed/56/a0ed56bf0a77f6b41722f1a061b7164e.jpg'),
        ('Aero Sports', 'aero-sports', '✈️', 'https://i.pinimg.com/736x/bb/43/04/bb4304b9bcc779c3e7b9a326cfdf614e.jpg')
    ON CONFLICT (slug) DO UPDATE SET 
        image_url = EXCLUDED.image_url,
        name = EXCLUDED.name,
        icon = EXCLUDED.icon;

    -- Fetch some IDs for properties
    SELECT id INTO v_adventure_cat FROM categories WHERE slug = 'bungee-jumping' LIMIT 1;
    SELECT id INTO v_stay_cat FROM categories WHERE slug = 'luxury-villas' LIMIT 1;
    SELECT id INTO v_camping_cat FROM categories WHERE slug = 'camping' LIMIT 1;

    -- 3. Insert More Locations
    INSERT INTO locations (city, state, country) VALUES 
        ('Rishikesh', 'Uttarakhand', 'India'),
        ('Lonavala', 'Maharashtra', 'India'),
        ('Munnar', 'Kerala', 'India')
    ON CONFLICT DO NOTHING;

    -- Fetch Location IDs
    SELECT id INTO v_rishikesh_loc FROM locations WHERE city = 'Rishikesh' LIMIT 1;
    SELECT id INTO v_lonavala_loc FROM locations WHERE city = 'Lonavala' LIMIT 1;
    SELECT id INTO v_munnar_loc FROM locations WHERE city = 'Munnar' LIMIT 1;

    -- 4. Property updates and new inserts...
    -- (Keeping the logic simplified for this update)
    
    -- Property 2: Paragliding in Rishikesh
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('Shivpuri Paragliding Experience', 'rishikesh-paragliding', 'Soar high above the Ganges.', 3500, '1 Hour', 
           (SELECT id FROM categories WHERE slug = 'paragliding'), v_rishikesh_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING
    RETURNING id INTO v_prop_id;

    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary)
        VALUES (v_prop_id, 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1', TRUE);
    END IF;

    -- 5. More Luxury Villas in Lonavala
    -- Villa 1: HashTag Villa
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('HashTag Villa | 2-BHK Villa | With Pvt Pool In Lonavala', 'hashtag-villa-lonavala', 'Escape to Hashtag Villa, a cozy 2BHK retreat in Lonavala offering the perfect blend of luxury and comfort.', 7000, '24 HRS', v_stay_cat, v_lonavala_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
            (v_prop_id, 'https://www.saffronstays.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2F5tgxhsqev%2Fsaffronstays-media%2Fimage%2Fupload%2F1770025937983780987%3Ftr%3Dq-60&w=1080&q=75', TRUE),
            (v_prop_id, 'https://www.saffronstays.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2F5tgxhsqev%2Fsaffronstays-media%2Fimage%2Fupload%2F1770025219574466955%3Ftr%3Dq-60&w=1080&q=75', FALSE),
            (v_prop_id, 'https://www.saffronstays.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2F5tgxhsqev%2Fsaffronstays-media%2Fimage%2Fupload%2F1770025954030259768%3Ftr%3Dq-60&w=1080&q=75', FALSE),
            (v_prop_id, 'https://www.saffronstays.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2F5tgxhsqev%2Fsaffronstays-media%2Fimage%2Fupload%2F1770025968019506911%3Ftr%3Dq-60&w=640&q=75', FALSE),
            (v_prop_id, 'https://www.saffronstays.com/_next/image?url=https%3A%2F%2Fik.imagekit.io%2F5tgxhsqev%2Fsaffronstays-media%2Fimage%2Fupload%2F1770025937068357305%3Ftr%3Dq-60&w=640&q=75', FALSE);
    END IF;

    -- Villa 2: Maase Villa 3
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('Maase Villa 3 | 3-BHK Luxury Villa | With Pvt Pool In Lonavala', 'maase-villa-3', 'A stunning 3-BHK luxury villa with a private infinity pool overlooking the hills.', 11000, '24 HRS', v_stay_cat, v_lonavala_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
            (v_prop_id, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', TRUE),
            (v_prop_id, 'https://images.unsplash.com/photo-1580587767376-04258e7ce293', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', FALSE);
    END IF;

    -- Villa 3: S4 Villa
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('S4 Villa | 3-BHK Villa | With Pvt Pool In Lonavala', 's4-villa-lonavala', 'Spacious 3-BHK villa perfect for families and large groups.', 10000, '24 HRS', v_stay_cat, v_lonavala_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
            (v_prop_id, 'https://i.pinimg.com/1200x/37/f0/26/37f026e54371416c5f0c5a4cbaea7e5b.jpg', TRUE),
            (v_prop_id, 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', FALSE);
    END IF;

    -- Villa 4: Grey Stone Villa
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('Grey Stone Villa | 4-BHK Villa | With Pvt Pool In Lonavala', 'grey-stone-villa', 'Experience royalty in this 4-BHK stone-clad villa with premium amenities.', 15000, '24 HRS', v_stay_cat, v_lonavala_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
            (v_prop_id, 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd', TRUE),
            (v_prop_id, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1534850336045-c6c6d287f89e', FALSE);
    END IF;

    -- Villa 5: Karhan Villa
    INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
    VALUES ('Karhan Villa | 3-BHK Luxury Villa | With Pvt Pool In Lonavala', 'karhan-villa', 'Modern luxury meets nature. A quiet retreat for your weekend getaway.', 30000, '24 HRS', v_stay_cat, v_lonavala_loc, v_user_id)
    ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
    IF v_prop_id IS NOT NULL THEN
        INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
            (v_prop_id, 'https://images.unsplash.com/photo-1613977257363-707ba9348227', TRUE),
            (v_prop_id, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1615874959474-d609969a20ed', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1590490360182-c33d59735288', FALSE),
            (v_prop_id, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', FALSE);
    END IF;

    -- NEW: Goa Villas
    DECLARE
        v_goa_loc UUID;
    BEGIN
        INSERT INTO locations (city, state, country)
        VALUES ('Goa', 'Goa', 'India')
        ON CONFLICT (city) DO NOTHING RETURNING id INTO v_goa_loc;

        IF v_goa_loc IS NULL THEN
            SELECT id INTO v_goa_loc FROM locations WHERE city = 'Goa';
        END IF;

        -- Goa Villa 1: Casa de Sol
        INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
        VALUES ('Casa de Sol | 4-BHK Luxury Villa | Vagator, Goa', 'casa-de-sol-goa', 'A sun-drenched 4-BHK luxury villa in the heart of Vagator, featuring a private pool and Mediterranean architecture.', 25000, '24 HRS', v_stay_cat, v_goa_loc, v_user_id)
        ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
        IF v_prop_id IS NOT NULL THEN
            INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
                (v_prop_id, 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', TRUE),
                (v_prop_id, 'https://images.unsplash.com/photo-1512914890251-2f96a9b0bbe2', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1613977257363-707ba9348227', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1523217582562-09d0def993a6', FALSE);
        END IF;

        -- Goa Villa 2: Villa Azure
        INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
        VALUES ('Villa Azure | 5-BHK Premium Stay | Anjuna, Goa', 'villa-azure-anjuna', 'Experience the ultimate coastal living in this 5-BHK premium villa with breathtaking views of the Arabian Sea.', 35000, '24 HRS', v_stay_cat, v_goa_loc, v_user_id)
        ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
        IF v_prop_id IS NOT NULL THEN
            INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
                (v_prop_id, 'https://images.unsplash.com/photo-1580587767376-04258e7ce293', TRUE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9', FALSE);
        END IF;

        -- Goa Villa 3: The Palms
        INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
        VALUES ('The Palms | 3-BHK Boutique Villa | Candolim, Goa', 'the-palms-candolim', 'A boutique 3-BHK escape surrounded by lush tropical gardens, just minutes away from Candolim beach.', 18000, '24 HRS', v_stay_cat, v_goa_loc, v_user_id)
        ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
        IF v_prop_id IS NOT NULL THEN
            INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
                (v_prop_id, 'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b', TRUE),
                (v_prop_id, 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1582719478250-c89cae4df85b', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', FALSE);
        END IF;

        -- Goa Villa 4: Villa Ocean View
        INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
        VALUES ('Villa Ocean View | 6-BHK Mansion | Sinquerim, Goa', 'villa-ocean-view-sinquerim', 'A grand 6-BHK mansion offering unparalleled luxury, infinity pool, and direct access to the beach.', 55000, '24 HRS', v_stay_cat, v_goa_loc, v_user_id)
        ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
        IF v_prop_id IS NOT NULL THEN
            INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
                (v_prop_id, 'https://images.unsplash.com/photo-1613490493576-7fde63acd811', TRUE),
                (v_prop_id, 'https://images.unsplash.com/photo-1615874959474-d609969a20ed', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1590490360182-c33d59735288', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1449156001437-3a1441df473b', FALSE);
        END IF;

        -- Goa Villa 5: Casa Blanca
        INSERT INTO properties (title, slug, description, price, duration, category_id, location_id, created_by)
        VALUES ('Casa Blanca | 4-BHK Designer Villa | Siolim, Goa', 'casa-blanca-siolim', 'Art meets luxury in this 4-BHK designer villa, featuring white-washed walls and contemporary interiors.', 22000, '24 HRS', v_stay_cat, v_goa_loc, v_user_id)
        ON CONFLICT (slug) DO NOTHING RETURNING id INTO v_prop_id;
        IF v_prop_id IS NOT NULL THEN
            INSERT INTO property_images (property_id, image_url, is_primary) VALUES 
                (v_prop_id, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688', TRUE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600585154542-63ef0371a539', FALSE),
                (v_prop_id, 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e', FALSE);
        END IF;
    END;

END $$;
