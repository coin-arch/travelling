"use client"

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect } from "react";

const images = [
    { src: "/ship.jpg", alt: "Ship" },
    { src: "/ground-friends.jpg", alt: "Ground Friends" },
    { src: "/tracking.jpg", alt: "Tracking" },
    { src: "/friends.jpg", alt: "Friends" },
    { src: "/road.jpg", alt: "Road" },
];

export default function DreamDestinations() {
    const radius = 280;
    const count = images.length;
    const rotation = useMotionValue(0);

    useEffect(() => {
        const controls = animate(rotation, 360, {
            duration: 25,
            ease: "linear",
            repeat: Infinity,
        });
        return controls.stop;
    }, [rotation]);

    return (
        <section className="py-32 bg-slate-50 relative overflow-hidden">
            {/* Simple Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-amber-50 rounded-[100%] blur-[120px] pointer-events-none opacity-40 mix-blend-multiply" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">

                    {/* Left Content */}
                    <div className="w-full lg:w-[45%] relative z-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center space-x-2 bg-white border border-slate-100 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                                <Sparkles className="h-4 w-4 text-accent" />
                                <span className="text-xs font-bold uppercase tracking-widest leading-none text-slate-500">Curated Exhibitions</span>
                            </div>

                            <h2 className="heading-display mb-8">
                                Discover dream destinations with ease.
                            </h2>

                            <div className="space-y-6 text-xl text-slate-500 font-medium leading-relaxed">
                                <p>
                                    Explore handpicked adventures, unique stays, and hidden gems — all curated for effortless planning and unforgettable journeys.
                                </p>
                            </div>

                            <button className="mt-12 btn-accent flex items-center space-x-2 text-lg group shadow-md hover:shadow-lg">
                                <span>Start Exploring</span>
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </div>

                    {/* Right side - 3D Cylinder (Simplified) */}
                    <div className="w-full lg:w-[55%] h-[350px] md:h-[500px] flex items-center justify-center [perspective:1200px]">
                        <motion.div
                            className="relative w-64 h-80 [transform-style:preserve-3d] scale-[0.7] md:scale-100"
                            style={{ rotateY: rotation }}
                        >
                            {images.map((img, idx) => (
                                <CylinderImage
                                    key={idx}
                                    img={img}
                                    idx={idx}
                                    count={count}
                                    radius={radius}
                                />
                            ))}
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function CylinderImage({ img, idx, count, radius }: any) {
    const baseAngle = (360 / count) * idx;

    return (
        <div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{
                transform: `rotateY(${baseAngle}deg) translateZ(${radius}px)`
            }}
        >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group border border-white/10 shadow-sm">
                <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                />

                {/* Subtle Glass Overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-brightness-110 pointer-events-none rounded-2xl" />

                {/* Subtle Specular Highlights */}
                <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/5 opacity-30 pointer-events-none" />

                {/* Professional Corner Accents */}
                <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none" />
            </div>
        </div>
    );
}
