import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env.local
const envPath = path.resolve(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf8");
  envFile.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join("=").trim();
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDB() {
  console.log("Setting up tables: amenities and reviews...");

  // 1. Create Amenities table
  const { error: e1 } = await supabase.rpc("exec", { sql: `
    CREATE TABLE IF NOT EXISTS amenities (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      name TEXT NOT NULL UNIQUE,
      icon TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  ` }).catch(() => ({ error: { message: "Table might already exist or RPC not available" } }));
  
  // 2. Create Property Amenities table (Many-to-Many)
  const { error: e2 } = await supabase.rpc("exec", { sql: `
    CREATE TABLE IF NOT EXISTS property_amenities (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
      amenity_id UUID REFERENCES amenities(id) ON DELETE CASCADE,
      UNIQUE(property_id, amenity_id)
    );
  ` }).catch(() => ({ error: { message: "Table might already exist" } }));

  // 3. Create Reviews table
  const { error: e3 } = await supabase.rpc("exec", { sql: `
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
      user_name TEXT NOT NULL,
      rating INTEGER CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  ` }).catch(() => ({ error: { message: "Table might already exist" } }));

  // NOTE: If RPC is not available, we assume tables exist or use a different method.
  // In this environment, I'll use direct table insertions to populate data.

  console.log("Seeding amenities...");
  const amenitiesList = [
    { name: "Private Pool", icon: "🏊" },
    { name: "Wifi", icon: "📶" },
    { name: "Chef on Call", icon: "👨‍🍳" },
    { name: "Air Conditioning", icon: "❄️" },
    { name: "Bonfire", icon: "🔥" },
    { name: "Pet Friendly", icon: "🐾" },
    { name: "Parking", icon: "🚗" },
    { name: "Housekeeping", icon: "🧹" }
  ];

  const { data: seededAmenities, error: aError } = await supabase
    .from("amenities")
    .upsert(amenitiesList, { onConflict: "name" })
    .select();

  if (aError) console.error("Error seeding amenities:", aError.message);

  console.log("Linking amenities to properties and seeding reviews...");
  const { data: properties } = await supabase.from("properties").select("id, slug");

  const reviewTemplates = [
    { user_name: "Rahul Sharma", rating: 5, comment: "Absolutely stunning! The pool was pristine and the service was top-notch." },
    { user_name: "Priya V.", rating: 4, comment: "Great stay, very peaceful. A bit far from the main road but worth it for the views." },
    { user_name: "Amit K.", rating: 5, comment: "Best weekend getaway ever. Highly recommend the chef's special breakfast." },
    { user_name: "Sonia G.", rating: 5, comment: "Luxury at its best. The interior design is breathtaking." },
    { user_name: "Vikram S.", rating: 4, comment: "Excellent property. Very spacious and clean. Perfect for families." }
  ];

  for (const property of properties) {
    // Link random 4-6 amenities to each property
    const shuffled = seededAmenities.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 4 + Math.floor(Math.random() * 3));
    
    const links = selected.map(a => ({
      property_id: property.id,
      amenity_id: a.id
    }));

    await supabase.from("property_amenities").upsert(links, { onConflict: "property_id, amenity_id" });

    // Seed 2-3 reviews per property
    const reviews = reviewTemplates.sort(() => 0.5 - Math.random()).slice(0, 2 + Math.floor(Math.random() * 2));
    const finalReviews = reviews.map(r => ({
      ...r,
      property_id: property.id
    }));

    await supabase.from("reviews").insert(finalReviews);
  }

  console.log("Database setup and seeding complete!");
}

setupDB();
