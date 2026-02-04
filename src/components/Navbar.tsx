"use client"

import Link from 'next/link'
import { Search, MapPin, User, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-tighter text-primary italic">
              KHOJII<span className="text-accent underline">.</span>
            </span>
          </Link>

          {/* Desktop Search Bar (Mini) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full flex items-center bg-muted rounded-full px-4 py-2 border border-border group focus-within:ring-2 ring-accent/20 transition-all">
              <Search className="h-4 w-4 text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search adventures in India..." 
                className="bg-transparent border-none focus:outline-none w-full text-sm font-medium"
              />
              <div className="h-4 w-[1px] bg-slate-200 mx-2" />
              <MapPin className="h-4 w-4 text-accent mr-2" />
              <span className="text-sm font-semibold text-slate-500 whitespace-nowrap">India</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/stays" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">Stays</Link>
            <Link href="/adventures" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">Adventures</Link>
            <Link href="/auth" className="flex items-center space-x-2 btn-primary">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-primary"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Basic) */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-border p-4 space-y-4 animate-in fade-in slide-in-from-top-4">
          <Link href="/stays" className="block text-lg font-bold">Stays</Link>
          <Link href="/adventures" className="block text-lg font-bold">Adventures</Link>
          <Link href="/auth" className="block w-full text-center btn-primary">Sign In</Link>
        </div>
      )}
    </nav>
  )
}
