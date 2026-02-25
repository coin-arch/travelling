import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Compass, ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 pt-32 pb-10 border-t border-slate-100 relative overflow-hidden">
      {/* Background soft gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Massive Top CTA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-slate-100 pb-16">
          <div className="max-w-2xl">
            <h2 className="heading-display mb-6">
              Ready to Explore?
            </h2>
            <p className="text-xl text-slate-500 font-medium">Join our community of over 50,000 travelers discovering India's best hidden gems.</p>
          </div>
          <div className="mt-10 md:mt-0 w-full md:w-auto">
            <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-2 w-full md:w-[400px] shadow-sm focus-within:ring-2 focus-within:ring-accent/20 transition-all">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent border-none text-primary focus:outline-none w-full px-4 font-bold placeholder:text-slate-400"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-xl font-black hover:bg-slate-800 transition-colors flex items-center space-x-2">
                <span>Join</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-2 mb-8 group">
              <Compass className="h-8 w-8 text-accent group-hover:rotate-45 transition-transform duration-500" />
              <span className="text-3xl font-black tracking-tighter text-primary">
                KHOJII<span className="text-accent">.</span>
              </span>
            </Link>
            <p className="text-sm font-medium leading-relaxed mb-8 text-slate-500">
              India's premier platform for discovering offbeat adventures and luxury stays. Curated experiences for curious explorers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all"><Instagram className="h-4 w-4" /></Link>
              <Link href="#" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all"><Facebook className="h-4 w-4" /></Link>
              <Link href="#" className="h-10 w-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white hover:border-primary transition-all"><Twitter className="h-4 w-4" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-primary font-black mb-8 uppercase tracking-widest text-sm">Explore</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/adventures" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />All Adventures</Link></li>
              <li><Link href="/stays" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />Luxury Stays</Link></li>
              <li><Link href="/locations" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />Top Locations</Link></li>
              <li><Link href="#why-us" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />Why Book With Us?</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-primary font-black mb-8 uppercase tracking-widest text-sm">Support</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/about" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />Help & FAQ</Link></li>
              <li><Link href="/partners" className="hover:text-accent transition-colors flex items-center"><ArrowRight className="h-3 w-3 mr-2 opacity-0 -ml-5 transition-all text-accent" />List Your Experience</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-primary font-black mb-8 uppercase tracking-widest text-sm">Reach Us</h4>
            <ul className="space-y-6 text-sm font-medium">
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Office</span>
                  <span className="text-primary font-bold">Mumbai, Maharashtra, India</span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Email</span>
                  <span className="text-primary font-bold">support@khojii.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-bold tracking-widest uppercase text-slate-400">
          <p>© {new Date().getFullYear()} KHOJII. All rights reserved.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
