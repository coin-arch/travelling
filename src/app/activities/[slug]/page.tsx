"use client"

import { useParams } from 'next/navigation'
import { 
  MapPin, Clock, Users, Zap, CheckCircle2, 
  Wifi, Car, Utensils, Wind, ShieldAlert,
  ChevronRight, Star, Heart, Share2, Info,
  Camera, Calendar, ShieldCheck
} from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ActivityDetail() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for "HashTag Villa"
  const villaData = {
    title: "HashTag Villa | 2-BHK Villa | With Pvt Pool In Lonavala",
    location: "House no.76, Florista society, Kunegaon, Lonavala",
    price: 7000,
    rating: 4.8,
    reviews: 124,
    duration: "24 HRS",
    groupSize: "4 - 6 Pax",
    level: "Easy",
    season: "All Seasons",
    description: "Escape to Hashtag Villa, a cozy 2BHK retreat in Lonavala offering the perfect blend of luxury and comfort. Ideal for weekend getaways with family or fun trips with friends, the villa promises a relaxing stay with stunning mountain views and a private swimming pool.",
    highlights: [
      "Private swimming pool (9x20 ft, 4.5 ft deep)",
      "Fully air-conditioned bedrooms and hall",
      "Attached bathrooms in both bedrooms",
      "Bathtub in the master bedroom",
      "Smart TVs in all bedrooms and hall",
      "Free high-speed WiFi",
      "Music system"
    ],
    layout: [
      { floor: "Ground floor", content: "Spacious hall with common washroom, AC, smart TV and pool view" },
      { floor: "First floor", content: "Master bedroom with attached bathroom, bathtub and private balcony" },
      { floor: "Second floor", content: "Bedroom with attached washroom, balcony and terrace access with mountain view" }
    ],
    amenities: [
      { name: "Car Parking", icon: <Car className="h-5 w-5" /> },
      { name: "Wifi", icon: <Wifi className="h-5 w-5" /> },
      { name: "Food", icon: <Utensils className="h-5 w-5" /> },
      { name: "AC", icon: <Wind className="h-5 w-5" /> }
    ],
    rules: [
      { title: "Primary Guest", info: "Should be atleast 18 years of age." },
      { title: "ID Proof", info: "Passport is accepted as ID proof(s). Local ids not allowed." },
      { title: "Pets", info: "Pets are not allowed." },
      { title: "Guest Profile", info: "Unmarried couples allowed." }
    ],
    images: [
        "https://images.unsplash.com/photo-1613977252367-a8fe77a1707d?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=2670&auto=format&fit=crop"
    ]
  }

  return (
    <div className="bg-white min-h-screen pb-20 pt-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
        <span>Home</span>
        <ChevronRight className="h-3 w-3" />
        <span>Adventure Activities</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-primary truncate">HashTag Villa | 2-BHK Villa</span>
      </div>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px]">
          <div className="md:col-span-2 h-full rounded-[2rem] overflow-hidden group cursor-pointer relative">
            <img src={villaData.images[0]} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>
          <div className="grid grid-rows-2 gap-4 md:col-span-2 h-full">
            <div className="rounded-[2rem] overflow-hidden group cursor-pointer relative">
                <img src={villaData.images[1]} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="rounded-[2rem] overflow-hidden group cursor-pointer relative">
                <img src={villaData.images[2]} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="bg-white text-primary px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-accent transition-colors">
                        <Camera className="h-4 w-4" />
                        <span>View All Photos</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Content */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-primary mb-4 leading-tight">
                {villaData.title}
              </h1>
              <div className="flex items-center space-x-4 text-slate-500 font-medium">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-accent mr-1" />
                  <span className="text-sm">{villaData.location}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-3 bg-muted rounded-full hover:bg-slate-200 transition-colors"><Share2 className="h-5 w-5" /></button>
              <button className="p-3 bg-muted rounded-full hover:bg-slate-200 transition-colors"><Heart className="h-5 w-5" /></button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-8 bg-muted rounded-[2.5rem] border border-border">
            <div className="flex flex-col items-center text-center">
              <Clock className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-400">Duration</span>
              <span className="font-black text-primary">{villaData.duration}</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-200">
              <Users className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-400">Group Size</span>
              <span className="font-black text-primary">{villaData.groupSize}</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-200">
              <Zap className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-400">Level</span>
              <span className="font-black text-primary">{villaData.level}</span>
            </div>
            <div className="flex flex-col items-center text-center border-l border-slate-200">
              <Calendar className="h-6 w-6 text-accent mb-2" />
              <span className="text-[10px] font-black uppercase text-slate-400">Season</span>
              <span className="font-black text-primary">{villaData.season}</span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-slate max-w-none mb-12">
            <h2 className="text-2xl font-black tracking-tighter mb-6 uppercase italic">About this Villa</h2>
            <p className="text-lg text-slate-600 leading-relaxed italic mb-8">
              {villaData.description}
            </p>
            
            <h3 className="text-xl font-black mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 text-accent mr-2" />
                Villa Highlights
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
              {villaData.highlights.map((h, i) => (
                <li key={i} className="flex items-start space-x-2 text-slate-600 font-medium">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="h-px bg-slate-100 my-12" />

          {/* Amenities Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-black tracking-tighter mb-8 uppercase italic">Top Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {villaData.amenities.map((a, i) => (
                <div key={i} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-border group hover:bg-primary hover:text-white transition-all cursor-default">
                  <div className="text-accent group-hover:text-amber-300">{a.icon}</div>
                  <span className="font-bold text-sm tracking-wide">{a.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rules Section */}
          <div className="bg-primary p-12 rounded-[3.5rem] text-white">
            <h2 className="text-3xl font-black tracking-tighter mb-10 flex items-center">
                <ShieldAlert className="h-8 w-8 text-accent mr-4" />
                Must Read Rules
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {villaData.rules.map((rule, i) => (
                <div key={i}>
                  <h4 className="text-accent font-black text-xs uppercase tracking-widest mb-3">{rule.title}</h4>
                  <p className="text-slate-300 font-medium leading-relaxed">{rule.info}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               className="bg-white rounded-[3rem] p-10 border border-border shadow-2xl shadow-primary/5"
            >
              <h3 className="text-xl font-black mb-6 tracking-tighter">HashTag Villa Stay Package</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Includes: 2-BHK | Swimming Pool | Terrace | Wifi</p>
              
              <div className="flex items-end space-x-2 mb-10">
                <span className="text-4xl font-black text-primary">₹{villaData.price.toLocaleString()}</span>
                <span className="text-slate-400 font-bold text-sm uppercase mb-1 tracking-widest">/ Night</span>
              </div>

              <button className="w-full btn-accent py-5 rounded-3xl text-lg flex items-center justify-center space-x-3 group active:scale-95 transition-all">
                <span>Book Experience</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6">
                <ShieldCheck className="h-3 w-3 inline mr-1 text-green-500" />
                Best Price Guarantee & Secure Payment
              </p>
            </motion.div>

            {/* Support Card */}
            <div className="bg-muted p-8 rounded-[2.5rem] border border-border">
              <h4 className="font-black text-xs uppercase tracking-widest mb-4">Need Help?</h4>
              <p className="text-xs text-slate-500 font-medium mb-6">Our travel experts are available 24/7 to assist you with your booking.</p>
              <button className="w-full border-2 border-primary text-primary py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
