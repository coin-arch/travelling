"use client"

import { ShieldCheck, BadgeCheck, Users, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Ironclad Security",
        description: "Military-grade encryption securing every transaction. Your peace of mind is our baseline.",
        accent: "text-emerald-500",
        bgIcon: "bg-emerald-50",
        borderFocus: "focus-within:border-emerald-500/30 hover:border-emerald-500/30 hover:ring-4 hover:ring-emerald-500/10",
        glow: "hover:shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]"
    },
    {
        icon: BadgeCheck,
        title: "Absolute Transparency",
        description: "Unbeatable pricing. Zero hidden fees. What you see is exactly what you pay.",
        accent: "text-rose-500",
        bgIcon: "bg-rose-50",
        borderFocus: "focus-within:border-rose-500/30 hover:border-rose-500/30 hover:ring-4 hover:ring-rose-500/10",
        glow: "hover:shadow-[0_10px_40px_-10px_rgba(244,63,94,0.15)]"
    },
    {
        icon: Users,
        title: "Elite Partners",
        description: "Only the top 1% of hosts and guides make the cut. Authentic stays, verified safety.",
        accent: "text-blue-500",
        bgIcon: "bg-blue-50",
        borderFocus: "focus-within:border-blue-500/30 hover:border-blue-500/30 hover:ring-4 hover:ring-blue-500/10",
        glow: "hover:shadow-[0_10px_40px_-10px_rgba(59,130,246,0.15)]"
    },
    {
        icon: Zap,
        title: "Instant Verification",
        description: "Frictionless, lightning-fast reservations. Book your escape in under 60 seconds.",
        accent: "text-amber-500",
        bgIcon: "bg-amber-50",
        borderFocus: "focus-within:border-amber-500/30 hover:border-amber-500/30 hover:ring-4 hover:ring-amber-500/10",
        glow: "hover:shadow-[0_10px_40px_-10px_rgba(245,158,11,0.15)]"
    },
];

const partners = ["VISA", "MASTERCARD", "RUPAY", "AMEX", "UPI"];

export default function WhyBookWithUs() {
    return (
        <section className="py-32 bg-white relative z-20 overflow-hidden" id="why-us">
            {/* Soft Background Blob */}
            <div className="absolute top-1/2 -right-[20%] w-[800px] h-[800px] bg-slate-50 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left Sticky Content */}
                    <div className="w-full lg:w-1/3 lg:sticky lg:top-40 self-start">
                        <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-100 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">The Khojii Standard</span>
                        </div>

                        {/* EXACT REQUESTED HEADING */}
                        <h2 className="heading-display mb-6">
                            Why Book with Khoojii?
                        </h2>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                            We don't just facilitate travel; we engineer flawless experiences. Security, transparency, and speed are built into our core.
                        </p>

                        {/* Partners */}
                        <div className="pt-10 border-t border-slate-100">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Secured By</p>
                            <div className="flex flex-wrap gap-4">
                                {partners.map((partner) => (
                                    <span key={partner} className="text-sm font-black text-slate-500 tracking-widest border border-slate-200 px-3 py-1 rounded bg-slate-50 shadow-sm">
                                        {partner}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Scrolling Features */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-4">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    key={idx}
                                    className={`group relative bg-white border border-slate-100 p-5 md:p-6 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden shadow-sm ${feature.borderFocus} ${feature.glow}`}
                                >
                                    <div className="flex flex-col sm:flex-row gap-5 items-start relative z-10">
                                        <div className={`h-12 w-12 shrink-0 rounded-2xl ${feature.bgIcon} border border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                            <Icon className={`h-6 w-6 ${feature.accent}`} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-primary mb-2 tracking-tight flex items-center">
                                                {feature.title}
                                                <ArrowRight className="h-4 w-4 ml-3 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                            </h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
