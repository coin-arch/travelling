"use client"

import { motion } from 'framer-motion'
import { Search, MapPin, Compass } from 'lucide-react'
import { Location } from '@/lib/types'
import Image from 'next/image'

interface HeroProps {
  locations: Location[]
}

export default function Hero({ locations }: HeroProps) {
  return (
    <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0">
        <Image 
          src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2670&auto=format&fit=crop"
          alt="Adventure Background"
          fill
          priority
          className="object-cover"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* ... existing content ... */}
          <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/30 text-accent px-4 py-1.5 rounded-full mb-6">
            <Compass className="h-4 w-4 animate-spin-slow" />
            <span className="text-xs font-bold uppercase tracking-widest leading-none">Discover Offbeat India</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
            Your Next Great <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">Adventure</span> Awaits.
          </h1>
          
          <p className="text-xl text-slate-200 mb-10 max-w-2xl mx-auto font-medium">
            Discover India&apos;s most unique stays, thrilling adventures, and hidden gems — all curated for the explorer in you.
          </p>

          {/* Search Interface */}
          <div className="bg-white p-2 rounded-2xl md:rounded-full shadow-2xl shadow-black/50 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 border border-white/20">
            <div className="flex-1 w-full flex items-center px-6 py-3 border-b md:border-b-0 md:border-r border-slate-100">
              <Compass className="h-5 w-5 text-accent mr-3" />
              <input 
                type="text" 
                placeholder="What adventure are you looking for?" 
                className="w-full bg-transparent focus:outline-none text-slate-800 font-semibold"
              />
            </div>
            
            <div className="flex-1 w-full flex items-center px-6 py-3">
              <MapPin className="h-5 w-5 text-accent mr-3" />
              <select className="w-full bg-transparent focus:outline-none text-slate-800 font-bold appearance-none">
                <option>All Locations</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.city} ({loc.state})
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full md:w-auto btn-accent py-4 px-10 flex items-center justify-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Explore</span>
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <div className="text-white/40 text-sm font-black tracking-widest vertical-text uppercase">Adventure • Curiosity • Discovery</div>
      </div>
    </section>
  )
}
