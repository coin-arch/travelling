import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 focus:outline-none">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-black tracking-tighter text-white italic">
                KHOJII<span className="text-accent underline">.</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              India&apos;s premier platform for discovering offbeat adventures and luxury stays. Curated experiences for curious explorers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="hover:text-accent transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" className="hover:text-accent transition-colors"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/adventures" className="hover:text-white transition-colors">All Adventures</Link></li>
              <li><Link href="/stays" className="hover:text-white transition-colors">Luxury Stays</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Top Locations</Link></li>
              <li><Link href="/why-us" className="hover:text-white transition-colors">Why Book With Us?</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Help & FAQ</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">List Your Experience</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Reach Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent shrink-0" />
                <span>support@khojii.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:row justify-between items-center text-xs">
          <p>© {new Date().getFullYear()} KHOJII. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
