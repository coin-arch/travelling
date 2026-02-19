import { supabase } from "../supabase";
import { Property, Category, Location } from "../types";

export const dataService = {
  // --- PROPERTIES ---
  async getProperties() {
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        categories(name, slug),
        locations(city, state),
        property_images(*)
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPropertyBySlug(slug: string) {
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        categories(*),
        locations(*),
        property_images(*),
        property_amenities(
          amenities(*)
        ),
        reviews(
          *,
          users(name)
        )
      `)
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  },

  // --- CATEGORIES ---
  async getCategories() {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) throw error;
    return data;
  },

  // --- LOCATIONS ---
  async getLocations() {
    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .order("city");

    if (error) throw error;
    return data;
  },

  // --- REVIEWS ---
  async getPropertyReviews(propertyId: string) {
    const { data, error } = await supabase
      .from("reviews")
      .select(`
        *,
        users(name)
      `)
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // --- SEARCH & FILTERING ---
  async getPropertiesByCategory(categorySlug: string) {
    const { data, error } = await supabase
      .from("properties")
      .select(`
        *,
        categories!inner(name, slug),
        locations(city, state),
        property_images(*)
      `)
      .eq("categories.slug", categorySlug)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  async getPropertiesSearch(categorySlug?: string, city?: string, minPrice?: number, maxPrice?: number, amenityIds?: string[]) {
    let query = supabase
      .from("properties")
      .select(`
        *,
        categories!inner(name, slug),
        locations!inner(city, state),
        property_images(*),
        reviews(rating),
        amenities:property_amenities(amenity_id)
      `);

    if (categorySlug) {
      query = query.eq("categories.slug", categorySlug);
    }

    if (city) {
      query = query.eq("locations.city", city);
    }

    if (minPrice !== undefined) {
      query = query.gte("price", minPrice);
    }

    if (maxPrice !== undefined) {
      query = query.lte("price", maxPrice);
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    // Client-side filtering for amenities (simplified for multi-select)
    let filteredData = data;
    if (amenityIds && amenityIds.length > 0) {
      filteredData = data.filter(prop => {
        const propAmenityIds = prop.amenities?.map((a: any) => a.amenity_id) || [];
        return amenityIds.every(id => propAmenityIds.includes(id));
      });
    }

    // Add average rating to each property
    return filteredData.map(prop => ({
      ...prop,
      averageRating: prop.reviews?.length > 0 
        ? prop.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / prop.reviews.length 
        : 0,
      reviewCount: prop.reviews?.length || 0
    }));
  },

  async getAmenities() {
    const { data, error } = await supabase
      .from("amenities")
      .select("*")
      .order("name");
    
    // Fallback in case table doesn't exist yet but we want the UI elements
    if (error) return [];
    return data;
  },

  async getLocationsWithCounts() {
    const { data, error } = await supabase
      .from("locations")
      .select(`
        *,
        properties(count)
      `);

    if (error) throw error;
    return data;
  },

  // --- BOOKINGS ---
  async createBooking(bookingData: {
    property_id: string;
    booking_date: string;
    slot: string;
    quantity: number;
    total_price: number;
    status?: string;
  }) {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          ...bookingData,
          status: bookingData.status || "pending",
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
