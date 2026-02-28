"use client"

import Link from 'next/link'
import { Search, MapPin, User, Menu, LogOut, Compass, ChevronDown } from 'lucide-react'
import { useState, useEffect } from 'react'
import { authService } from '@/lib/services/authService'
import { useRouter, usePathname } from 'next/navigation'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const isHome = pathname === '/'
  const { scrollY } = useScroll()

  // Dynamic transforms based on scroll
  // For home, we wait until the Hero section is scrolled (700-800px)
  // For other pages (like search), we want it to turn dark immediately or stay dark if background is light
  const navBg = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.4)"] : ["rgba(255, 255, 255, 0.4)", "rgba(255, 255, 255, 0.4)"])
  const navShadow = useTransform(scrollY, isHome ? [0, 800] : [0, 50], isHome ? ["none", "0 10px 40px -10px rgba(0,0,0,0.1)"] : ["0 10px 40px -10px rgba(0,0,0,0.1)", "0 10px 40px -10px rgba(0,0,0,0.1)"])
  const navBorder = useTransform(scrollY, isHome ? [0, 800] : [0, 50], isHome ? ["1px solid rgba(255, 255, 255, 0)", "1px solid rgba(226, 232, 240, 1)"] : ["1px solid rgba(226, 232, 240, 1)", "1px solid rgba(226, 232, 240, 1)"])
  const textColor = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["#ffffff", "#ffffff", "#0f172a"] : ["#0f172a", "#0f172a"])
  const iconColor = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["#ffffff", "#ffffff", "#64748b"] : ["#64748b", "#64748b"])
  const btnBg = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 1)"] : ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"])
  const btnBorder = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.2)", "rgba(226, 232, 240, 1)"] : ["rgba(226, 232, 240, 1)", "rgba(226, 232, 240, 1)"])
  const btnText = useTransform(scrollY, isHome ? [0, 700, 800] : [0, 50], isHome ? ["#ffffff", "#ffffff", "#0f172a"] : ["#0f172a", "#0f172a"])

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authService.getCurrentUser()
      if (currentUser) {
        const profile = await authService.getProfile()
        setUser(profile || currentUser)
      } else {
        setUser(null)
      }
      setLoading(false)
    }
    checkUser()

    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await authService.getProfile()
        setUser(profile || session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await authService.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <motion.nav
      style={{
        backgroundColor: navBg,
        boxShadow: navShadow,
        borderBottom: navBorder
      }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-colors duration-300"
    >
      <div className="w-full px-6 xl:px-12">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Compass className="h-8 w-8 text-accent group-hover:rotate-45 transition-transform duration-500" />
            <motion.span
              style={{ color: textColor }}
              className="text-3xl font-black tracking-tighter drop-shadow-sm"
            >
              KHOJII<span className="text-accent">.</span>
            </motion.span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            {[
              { name: 'Home', href: '/' },
              { name: 'Experiences', href: '/search' },
              { name: 'Top Categories', href: '/search?filter=top', hasDropdown: true },
              { name: 'Popular Locations', href: '/search?filter=locations', hasDropdown: true },
              { name: 'Blogs', href: '/blogs' },
              { name: 'Partner with us', href: '/partner' },
              { name: 'Corporate Travel', href: '/corporate' },
              { name: 'About Us', href: '/about' },
              { name: 'Contact Us', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group flex items-center space-x-1 text-[14px] font-semibold transition-all whitespace-nowrap"
              >
                <motion.span style={{ color: textColor }} className="flex items-center space-x-1 group-hover:text-primary transition-colors">
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <motion.div style={{ color: iconColor }}>
                      <ChevronDown className="h-4 w-4 opacity-70" />
                    </motion.div>
                  )}
                </motion.span>
              </Link>
            ))}
          </div>

          {/* User Auth */}
          <div className="hidden xl:flex items-center space-x-6">
            {!loading && (
              user ? (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 group cursor-pointer border border-slate-200 pr-4 rounded-full hover:bg-slate-50 transition-colors bg-white">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white border-2 border-white shadow-sm">
                      <User className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-primary tracking-wide">
                      {user.name || user.email?.split('@')[0]}
                    </span>
                  </div>
                  <button onClick={handleSignOut} className="text-slate-400 hover:text-rose-500 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-6">
                  <Link href="/login" className="transition-colors">
                    <motion.span style={{ color: textColor }} className="text-[14px] font-bold hover:text-primary">Log in</motion.span>
                  </Link>
                  <Link
                    href="/signup"
                    className="transition-all"
                  >
                    <motion.div
                      style={{
                        backgroundColor: btnBg,
                        borderColor: btnBorder,
                        color: btnText
                      }}
                      className="h-11 px-6 rounded-full border backdrop-blur-md flex items-center justify-center text-[15px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
                    >
                      Join Now
                    </motion.div>
                  </Link>
                </div>
              )
            )}

            {/* Search Trigger */}
            <motion.button
              style={{
                backgroundColor: btnBg,
                borderColor: btnBorder,
                color: btnText
              }}
              className="h-10 w-10 rounded-full backdrop-blur-md border flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white transition-all shadow-sm"
            >
              <Search className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 transition-colors">
              <motion.div style={{ color: iconColor }}>
                <Menu className="h-6 w-6" />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="xl:hidden bg-white border-t border-slate-100 p-6 space-y-4 shadow-2xl animate-in slide-in-from-top-4 relative z-50 max-h-[80vh] overflow-y-auto">
          {[
            { name: 'Home', href: '/' },
            { name: 'Experiences', href: '/search' },
            { name: 'Top Categories', href: '/search?filter=top' },
            { name: 'Popular Locations', href: '/search?filter=locations' },
            { name: 'Blogs', href: '/blogs' },
            { name: 'Partner with us', href: '/partner' },
            { name: 'Corporate Travel', href: '/corporate' },
            { name: 'About Us', href: '/about' },
            { name: 'Contact Us', href: '/contact' },
          ].map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-lg font-bold text-slate-900 border-b border-slate-50 pb-2 hover:text-accent transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 space-y-4">
            {user ? (
              <div className="space-y-4">
                <div className="font-bold text-accent">Hello, {user.name}</div>
                <button onClick={handleSignOut} className="block w-full text-left font-bold text-rose-500 hover:text-rose-600">Sign Out</button>
              </div>
            ) : (
              <div className="space-y-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-600">Log In</Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="block w-full text-center rounded-full border border-slate-200 bg-white py-4 font-bold text-slate-900 shadow-sm">Join Now</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  )
}
