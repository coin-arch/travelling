"use client"

import {
  MapPin, Clock, Users, Zap, Calendar,
  ChevronRight, ChevronLeft, Star, Share2, Heart,
  Wifi, Car, Utensils, Wind, ShieldAlert,
  Minus, Plus, Info, Check
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Property } from '@/lib/types'
import Image from 'next/image'
import { dataService } from '@/lib/services/dataService'

interface ActivityDetailClientProps {
  property: Property & {
    categories: { name: string; slug: string } | null;
    locations: { city: string; state: string } | null;
    property_images: any[];
    amenities: any[];
    reviews: any[];
  }
}

export default function ActivityDetailClient({ property }: ActivityDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedSlot, setSelectedSlot] = useState("Full Day (24 hrs)")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [booked, setBooked] = useState(false)

  const handleNext = () => {
    setActiveImage((prev) => (prev + 1) % images.length)
  }

  const handlePrev = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const images = property.property_images?.length > 0
    ? property.property_images.map(img => img.image_url)
    : ["/images/placeholder_hotel.jpg"];

  const stats = [
    { icon: <Clock className="h-5 w-5" />, label: "Duration", value: property.duration || "24 HRS" },
    { icon: <Users className="h-5 w-5" />, label: "Group Size", value: `${property.group_size_min || 4} - ${property.group_size_max || 6} Pax` },
    { icon: <Zap className="h-5 w-5" />, label: "Level", value: property.level || "Easy" },
    { icon: <Calendar className="h-5 w-5" />, label: "Season", value: property.season || "All Seasons" },
  ]

  return (
    <div className="bg-white min-h-screen pb-20 pt-28">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span>Adventure Activities</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-primary truncate">{property.title}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Title & Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-primary mb-4 leading-none">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-slate-500">
              <div className="flex items-center text-[11px] font-black uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full border border-slate-100">
                <MapPin className="h-3 w-3 text-accent mr-1.5" />
                <span>{property.address || property.locations?.city}</span>
              </div>
              <div className="flex items-center text-[11px] font-black uppercase tracking-widest bg-muted px-3 py-1.5 rounded-full border border-slate-100">
                <Star className="h-3 w-3 text-accent mr-1.5 fill-accent" />
                <span>4.9 (22 Reviews)</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all">
              <Share2 className="h-5 w-5 text-slate-600" />
            </button>
            <button className="h-12 w-12 flex items-center justify-center bg-white border border-slate-100 rounded-full shadow-sm hover:shadow-md hover:bg-slate-50 transition-all">
              <Heart className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Gallery & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Main Content & Gallery */}
          <div className="lg:col-span-8 space-y-12">
            {/* Main Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] md:h-[550px] w-full rounded-[3rem] overflow-hidden group shadow-2xl shadow-primary/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[activeImage]}
                      alt={`Gallery ${activeImage}`}
                      fill
                      priority
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={handlePrev}
                    className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-accent hover:text-primary transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-12 w-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-accent hover:text-primary transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>

                {/* Thumbnails Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`relative h-20 w-28 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === idx ? 'border-accent shadow-lg scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                    >
                      <Image src={img} alt={`Thumb ${idx}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-muted rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Info className="h-20 w-20" />
              </div>
              {stats.map((stat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center text-center p-4 ${i > 0 ? 'md:border-l border-slate-200' : ''}`}>
                  <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-accent mb-3 shadow-sm">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</span>
                  <span className="text-sm font-black text-primary uppercase">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Overview / Description Sections */}
            <div className="space-y-12 pr-4">
              <section>
                <div className="flex items-center space-x-3 mb-8">
                  <div className="h-8 w-1 bg-accent rounded-full" />
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic">Overview</h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {property.description}
                  </p>
                </div>
              </section>

              {/* Highlights List (Mocked if missing in DB) */}
              <section>
                <h3 className="text-lg font-black mb-6 flex items-center tracking-tighter hover:text-primary transition-colors cursor-default">
                  <span className="h-2 w-2 bg-accent rounded-full mr-3" />
                  Villa Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Private swimming pool (9x20 ft, 4.5 ft deep)",
                    "Fully air-conditioned bedrooms and hall",
                    "Smart TVs in all bedrooms and hall",
                    "Free high-speed WiFi",
                    "Hand towels, bath towels, & shampoo provided",
                    "Inverter backup (3-4 hours)"
                  ].map((h, i) => (
                    <div key={i} className="flex items-start space-x-3 group">
                      <div className="mt-1 h-5 w-5 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-100 transition-colors">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm font-bold text-slate-600">{h}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Amenities with proper Icons */}
              <section>
                <h3 className="text-lg font-black mb-8 flex items-center tracking-tighter">
                  <span className="h-2 w-2 bg-accent rounded-full mr-3" />
                  Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {(property.amenities || []).length > 0 ? (
                    (property.amenities || []).map((item: any, i: number) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                        <div className="text-2xl mb-3 transition-colors grayscale group-hover:grayscale-0">
                          {item.amenity?.icon || "✨"}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-center">{item.amenity?.name}</span>
                      </div>
                    ))
                  ) : (
                    // Fallback to defaults if no amenities linked
                    [
                      { icon: "🚗", label: "Car Parking" },
                      { icon: "📶", label: "Wifi" },
                      { icon: "👨‍🍳", label: "Chef on Call" },
                      { icon: "❄️", label: "AC" },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                        <div className="text-2xl mb-3">
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                    ))
                  )}
                </div>
              </section>

              {/* Guest Reviews Section */}
              <section>
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-1 bg-accent rounded-full" />
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">Guest Reviews</h2>
                  </div>
                  {(property.reviews || []).length > 0 && (
                    <div className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-black italic tracking-tighter">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span>{((property.reviews || []).reduce((acc: number, r: any) => acc + r.rating, 0) / (property.reviews || []).length).toFixed(1)}</span>
                      <span className="text-white/50 px-1">/</span>
                      <span>{(property.reviews || []).length} reviews</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {(property.reviews || []).length > 0 ? (
                    (property.reviews || []).map((review: any, i: number) => (
                      <div key={i} className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-black text-primary text-sm tracking-tight">{review.user_name || "Khojii Traveler"}</h4>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</p>
                          </div>
                          <div className="flex space-x-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "text-accent fill-accent" : "text-slate-200"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                          "{review.comment}"
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center border-2 border-dashed border-slate-100 rounded-[2.5rem]">
                      <p className="text-slate-400 font-bold tracking-tight">No reviews yet. Be the first to stay!</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Rules Section */}
              <section className="bg-primary p-12 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/5 rounded-full blur-3xl" />
                <h2 className="text-2xl font-black tracking-tighter mb-10 border-b border-white/10 pb-6">Must Read Rules</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {[
                    { label: "Guest Profile", text: "Primary Guest should be at least 18 years of age. Unmarried couples allowed." },
                    { label: "ID Proof", text: "Passport is accepted as ID proof. Local IDs not allowed." },
                    { label: "Pets", text: "Pets are not allowed on the property." },
                    { label: "Smoking/Alcohol", text: "Smoking within premises allowed. No restrictions on alcohol consumption." }
                  ].map((rule, i) => (
                    <div key={i}>
                      <h4 className="text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-3">{rule.label}</h4>
                      <p className="text-sm text-slate-300 font-medium leading-relaxed">{rule.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right: Booking Sidebar */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-primary/5">
                {/* Date & Slot Pickers */}
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-muted rounded-2xl border border-slate-100 group hover:border-accent transition-colors">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Preferred Date</label>
                    <div className="flex justify-between items-center relative">
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                      />
                      <span className={`text-sm font-black ${selectedDate ? 'text-primary' : 'text-slate-400'}`}>
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Select Date'}
                      </span>
                      <Calendar className={`h-4 w-4 ${selectedDate ? 'text-accent' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1 px-4">Available Slots</span>
                    <div className="grid grid-cols-1 gap-2">
                      {["Full Day (24 hrs)", "Day Use (9 AM - 6 PM)", "Night Stay"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${selectedSlot === slot ? 'border-accent bg-accent/5' : 'border-slate-50 bg-muted hover:border-slate-200'}`}
                        >
                          <span className={`text-xs font-black tracking-tight ${selectedSlot === slot ? 'text-primary' : 'text-slate-500'}`}>{slot}</span>
                          <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedSlot === slot ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                            {selectedSlot === slot && <div className="h-1.5 w-1.5 bg-white rounded-full" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Package Info */}
                <div className="mb-10">
                  <h4 className="text-sm font-black mb-1">{property.title} Stay</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed">
                    Includes: 2-BHK | Swimming Pool | Terrace | Wifi
                  </p>

                  <div className="flex items-end justify-between">
                    <div className="text-primary">
                      <span className="text-3xl font-black">₹{(Number(property.price) * Math.max(1, quantity)).toLocaleString()}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase block tracking-widest mt-1">
                        {quantity > 1 ? `${quantity}x Capacity` : 'Total Price'}
                      </span>
                    </div>

                    {/* Quantity Counter */}
                    <div className="flex items-center bg-muted rounded-xl p-2 border border-slate-100">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-400"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center text-sm font-black text-primary">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-white transition-all text-slate-400"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={async () => {
                    if (selectedDate && !isBooking && !booked) {
                      setIsBooking(true);
                      try {
                        await dataService.createBooking({
                          property_id: property.id,
                          booking_date: selectedDate,
                          slot: selectedSlot,
                          quantity: quantity,
                          total_price: Number(property.price) * quantity
                        });
                        setBooked(true);
                        setShowConfirmation(true);
                      } catch (error) {
                        console.error("Booking failed:", error);
                      } finally {
                        setIsBooking(false);
                        setTimeout(() => setShowConfirmation(false), 3000);
                      }
                    }
                  }}
                  disabled={!selectedDate || isBooking || booked}
                  className={`w-full py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all transform active:scale-95 shadow-xl ${booked
                    ? 'bg-green-500 text-white shadow-green-100 cursor-default'
                    : selectedDate && !isBooking
                      ? 'bg-accent text-primary shadow-accent/20 hover:scale-[1.02]'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                    }`}
                >
                  {booked ? "Booking Confirmed!" : isBooking ? "Processing..." : "Book Now"}
                </button>

                {selectedDate && (
                  <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-100 flex items-center space-x-3">
                    <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <p className="text-[10px] font-black text-green-700 uppercase tracking-widest">Available for {new Date(selectedDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>

              {/* Support Info */}
              <div className="p-8 bg-muted rounded-[2.5rem] border border-slate-100 text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Need help with booking?</p>
                <Link href="tel:+910000000000" className="text-sm font-black text-primary hover:text-accent transition-colors">+91 99999 00000</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Keep Link import safe
import Link from 'next/link'
