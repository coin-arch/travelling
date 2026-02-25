"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface CuratedCollectionsProps {
    categories: any[]
}

export default function CuratedCollections({ categories }: CuratedCollectionsProps) {
    return (
        <section className="relative z-20 pt-16 pb-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 pb-6 border-b border-black/5">
                    <div className="max-w-xl">
                        <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-1.5 rounded-full mb-4 shadow-sm">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-800">Immersive Experiences</span>
                        </div>
                        <h2 className="heading-display">
                            Curated Collections
                        </h2>
                    </div>

                    <Link href="/search" className="hidden md:flex items-center space-x-3 group bg-white border border-slate-200 px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
                        <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">View All</span>
                        <div className="h-6 w-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                            <ArrowRight className="h-3 w-3" />
                        </div>
                    </Link>
                </div>

                {/* Shiny Premium Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {(categories || []).slice(0, 4).map((cat: any, i: number) => (
                        <motion.div
                            key={cat.id}
                            whileHover={{ y: -16, scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            className="relative group h-[520px]"
                        >
                            {/* Full Card Container - Ultra Glass & Shine */}
                            <Link
                                href={`/search?category=${cat.slug}`}
                                className="relative h-full w-full flex flex-col rounded-[3.5rem] overflow-hidden border border-white/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_60px_100px_-20px_rgba(0,0,0,0.2)] transition-all duration-700 block ring-1 ring-white/20"
                            >
                                {/* Background Image - Full Bleed */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={i === 0 ? '/villhas.jpg' : (cat.image_url || '/images/placeholder_hotel.jpg')}
                                        alt={cat.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-[4s] ease-out"
                                        sizes="(max-width: 1024px) 100vw, 25vw"
                                    />
                                    {/* Dark Gradient for Text Visibility */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                                    {/* Glass Gloss Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.15] pointer-events-none" />
                                </div>

                                {/* Top Rank Indicator - Minimalist */}
                                <div className="absolute top-6 left-6 z-20">
                                    <div className="flex items-center justify-center text-white/50 font-serif italic text-xl">
                                        0{i + 1}
                                    </div>
                                </div>

                                {/* Dynamic "Light Sweep" Shimmer on Hover */}
                                <motion.div
                                    initial={{ x: "-150%", opacity: 0 }}
                                    whileHover={{ x: "150%", opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                    className="absolute inset-y-0 w-full z-10 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-35deg] pointer-events-none filter blur-md"
                                />

                                {/* Content Area - Direct on Card */}
                                <div className="absolute bottom-0 inset-x-0 p-8 z-20">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="h-[1px] w-6 bg-white/20" />
                                        <p className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em]">
                                            {cat.name.includes('Villas') ? 22 : cat.name.includes('Water') ? 11 : cat.name.includes('Paragliding') ? 4 : cat.name.includes('Sailing') ? 1 : Math.floor(Math.random() * 15) + 5} DESTINATIONS
                                        </p>
                                    </div>

                                    <div className="flex items-end justify-between gap-4">
                                        <h3 className="text-2xl font-black text-white leading-tight tracking-tight group-hover:text-accent transition-colors drop-shadow-xl">
                                            {cat.name}
                                        </h3>
                                        <motion.div
                                            whileHover={{ rotate: -45, scale: 1.1 }}
                                            className="flex-shrink-0 h-10 w-10 rounded-full border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:bg-accent hover:border-accent"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Outer Refraction Rim */}
                                <div className="absolute inset-0 rounded-[3.5rem] border-4 border-white/5 pointer-events-none z-30" />
                            </Link>

                            {/* Luminous Hover Glow underneath */}
                            <div className="absolute inset-0 p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10">
                                <div className="w-full h-full rounded-[3.5rem] shadow-[0_0_60px_rgba(var(--accent-rgb),0.25)]" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <Link href="/search" className="md:hidden flex items-center justify-between mt-8 bg-white border border-slate-200 px-8 py-5 rounded-[2rem] shadow-sm text-slate-900 group active:scale-95 transition-transform">
                    <span className="text-sm font-black tracking-tight uppercase">View All Collections</span>
                    <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                </Link>
            </div>
        </section>
    )
}
