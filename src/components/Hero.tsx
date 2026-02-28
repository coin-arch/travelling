"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Compass, ArrowDownRight } from "lucide-react";
import { Location } from "@/lib/types";
import Image from "next/image";

interface HeroProps {
  locations: Location[];
}

export default function Hero({ locations }: HeroProps) {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Cinematic Background Image Overlay with subtle slow-pan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="w-full h-full relative"
        >
          <Image
            src="/images/hero_bg_1.jpg"
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Superior gradient for text readability without dulling the image */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col items-center justify-center text-center mt-[-8vh]">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Minimalist Top Kicker */}
          <div className="mb-6 flex items-center space-x-3">
            <div className="h-[1px] w-8 bg-white/50" />
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.3em] text-white/90 drop-shadow-sm">
              Wander Often. Wonder Always.
            </span>
            <div className="h-[1px] w-8 bg-white/50" />
          </div>

          {/* Premium Breathtaking Typography */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-medium mb-6 md:mb-8 tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] mt-8 md:mt-0">
            Experience the <br className="hidden md:block" />
            <span className="font-serif italic text-white font-light text-5xl sm:text-6xl md:text-8xl lg:text-[6.5rem] drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
              extraordinary.
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/95 mb-8 md:mb-14 max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] px-4">
            Discover India's most breathtaking stays and curated adventures,
            designed exclusively for the modern explorer.
          </p>

          {/* Sleek Glassmorphic Floating Search Pill */}
          <div className="bg-white/10 backdrop-blur-xl p-3 md:p-3 rounded-[2rem] md:rounded-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 w-full max-w-3xl flex flex-col md:flex-row items-center gap-2 relative z-20 focus-within:ring-2 focus-within:ring-white/50 transition-all text-left group hover:bg-white/15">
            {/* Search Input */}
            <div className="w-full flex items-center px-4 md:px-6 py-2 md:py-2 border-b border-white/10 md:border-b-0 md:border-r">
              <input
                type="text"
                placeholder="Where to next?"
                className="w-full bg-transparent focus:outline-none text-white placeholder:text-white/60 font-medium text-base md:text-lg"
              />
            </div>

            {/* Location Selector */}
            <div className="w-full flex items-center px-4 md:px-6 py-2 md:py-2 border-b border-white/10 md:border-b-0">
              <select className="w-full bg-transparent focus:outline-none text-white font-medium text-base md:text-lg appearance-none cursor-pointer">
                <option value="" className="text-slate-900">
                  Any destination
                </option>
                {(locations || []).map((loc) => (
                  <option
                    key={loc.id}
                    value={loc.id}
                    className="text-slate-900"
                  >
                    {loc.city}
                  </option>
                ))}
              </select>
            </div>

            {/* Action Button */}
            <button className="w-full md:w-auto bg-white hover:bg-slate-100 text-slate-900 font-bold py-3 md:py-4 px-8 md:px-10 rounded-full flex items-center justify-center space-x-2 shrink-0 transition-colors shadow-lg mt-2 md:mt-0">
              <span>Search</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/60 hidden lg:flex flex-col items-center z-10 opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] font-medium mb-3">
          Explore
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
}
