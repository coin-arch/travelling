"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        title: "An Ultimate Adventure Trip",
        text: "We planned a full adventure day in Rishikesh — rafting and a riverside stay. Everything was smooth and safe. It's rare to find a platform that handles the grit and comfort so well.",
        author: "Rohit S. & Team",
        location: "Mumbai",
        rating: 5,
        avatar: "/friends_camping.jpg",
    },
    {
        id: 2,
        title: "Smooth Booking Process",
        text: "I loved how simple and transparent the booking process was. No hidden charges, no confusion — just clear information and quick confirmation. Khojii is my absolute go-to.",
        author: "Amit P.",
        location: "Pune",
        rating: 5,
        avatar: "/pune.jpg",
    },
    {
        id: 3,
        title: "Incredible Family Getaway",
        text: "We booked a luxury villa in Goa for our family, and it was perfect. The host was verified and responsive. A truly premium experience from start to finish.",
        author: "Neha M.",
        location: "Mumbai",
        rating: 5,
        avatar: "/mumbai.jpg",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const next = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, []);

    const prev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(next, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, next]);

    return (
        <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden flex items-center min-h-[800px]">
            {/* Dark Premium Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-transparent via-sky-500/5 to-transparent blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Typography & Controls */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md border border-white/10 text-white px-5 py-2 rounded-full"
                        >
                            <span className="text-sm font-bold uppercase tracking-widest text-accent">Testimonials</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="heading-display text-white"
                        >
                            What our travelers say
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-slate-400 max-w-md"
                        >
                            Discover the genuine stories of our adventurers who have explored the world with unwavering trust in our platform.
                        </motion.p>

                        {/* Controls */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="flex items-center space-x-4 pt-4"
                        >
                            <button
                                onClick={() => { prev(); setIsAutoPlaying(false); }}
                                className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                            >
                                <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => { next(); setIsAutoPlaying(false); }}
                                className="h-14 w-14 rounded-full bg-accent flex items-center justify-center text-white hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] transition-all duration-300 group"
                            >
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>

                        {/* Dots */}
                        <div className="flex space-x-2 pt-4">
                            {testimonials.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setCurrentIndex(idx); setIsAutoPlaying(false); }}
                                    className={`h-2 rounded-full transition-all duration-500 max-w-24 ${idx === currentIndex ? 'w-10 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Slider Cards */}
                    <div className="lg:col-span-7 relative h-[500px] sm:h-[450px] lg:h-[550px] perspective-[1000px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl flex flex-col justify-center"
                                onMouseEnter={() => setIsAutoPlaying(false)}
                                onMouseLeave={() => setIsAutoPlaying(true)}
                            >
                                <Quote className="absolute top-8 right-8 w-24 h-24 text-white/5 rotate-180" />

                                <div className="relative z-10">
                                    <div className="flex space-x-1 mb-8">
                                        {[...Array(testimonials[currentIndex].rating)].map((_, j) => (
                                            <Star key={j} className="h-5 w-5 text-amber-400 fill-amber-400" />
                                        ))}
                                    </div>

                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight font-serif italic tracking-wide">
                                        &quot;{testimonials[currentIndex].title}&quot;
                                    </h3>

                                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light mb-10">
                                        {testimonials[currentIndex].text}
                                    </p>

                                    <div className="flex items-center space-x-5 mt-auto">
                                        <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white/20 ring-4 ring-white/5">
                                            <Image
                                                src={testimonials[currentIndex].avatar}
                                                alt={testimonials[currentIndex].author}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{testimonials[currentIndex].author}</h4>
                                            <p className="text-sm font-medium text-accent uppercase tracking-wider mt-0.5">{testimonials[currentIndex].location}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Faded Background Cards for Depth Effect */}
                        <div className="absolute top-6 bottom-6 inset-x-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] -z-10 transform translate-x-4 translate-y-4" />
                        <div className="absolute top-12 bottom-12 inset-x-12 bg-white/[0.01] border border-white/[0.02] rounded-[2.5rem] -z-20 transform translate-x-8 translate-y-8 hidden md:block" />
                    </div>
                </div>
            </div>
        </section>
    );
}
