export type UserRole = "user" | "admin" | "partner";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password_hash?: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image_url?: string;
  created_at: string;
}

export interface Location {
  id: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  duration?: string;
  group_size_min?: number;
  group_size_max?: number;
  level?: string;
  season?: string;
  address?: string;
  category_id?: string;
  location_id?: string;
  created_by?: string;
  created_at: string;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
}

export interface PropertyAmenity {
  id: string;
  property_id: string;
  amenity_id: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  id: string;
  user_id: string;
  property_id: string;
  booking_date: string;
  slot?: string;
  quantity: number;
  total_price: number;
  status: BookingStatus;
  created_at: string;
}

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Payment {
  id: string;
  booking_id: string;
  amount: number;
  payment_method?: string;
  payment_status: PaymentStatus;
  transaction_id?: string;
  paid_at?: string;
}

export interface Review {
  id: string;
  user_id?: string;
  property_id: string;
  rating: number;
  comment?: string;
  city?: string;
  created_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content?: string;
  image_url?: string;
  author_id?: string;
  published_at?: string;
  created_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
}

// Supabase Database Type
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<User>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Category>;
      };
      locations: {
        Row: Location;
        Insert: Omit<Location, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Location>;
      };
      properties: {
        Row: Property;
        Insert: Omit<Property, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Property>;
      };
      property_images: {
        Row: PropertyImage;
        Insert: Omit<PropertyImage, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<PropertyImage>;
      };
      amenities: {
        Row: Amenity;
        Insert: Omit<Amenity, 'id'> & { id?: string };
        Update: Partial<Amenity>;
      };
      property_amenities: {
        Row: PropertyAmenity;
        Insert: Omit<PropertyAmenity, 'id'> & { id?: string };
        Update: Partial<PropertyAmenity>;
      };
      bookings: {
        Row: Booking;
        Insert: Omit<Booking, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Booking>;
      };
      payments: {
        Row: Payment;
        Insert: Omit<Payment, 'id' | 'paid_at'> & { id?: string; paid_at?: string };
        Update: Partial<Payment>;
      };
      reviews: {
        Row: Review;
        Insert: Omit<Review, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Review>;
      };
      blogs: {
        Row: Blog;
        Insert: Omit<Blog, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Blog>;
      };
      newsletter_subscribers: {
        Row: NewsletterSubscriber;
        Insert: Omit<NewsletterSubscriber, 'id' | 'subscribed_at'> & { id?: string; subscribed_at?: string };
        Update: Partial<NewsletterSubscriber>;
      };
    };
  };
}
