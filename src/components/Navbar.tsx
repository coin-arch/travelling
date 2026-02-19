"use client"

import Link from 'next/link'
import { Search, MapPin, User, Menu, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { authService } from '@/lib/services/authService'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Initial check
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

    // Listen for changes
    const { data: { subscription } } = authService.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await authService.getProfile()
        setUser(profile || session.user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await authService.signOut()
    setUser(null)
    router.push('/')
    router.refresh()
  }

  return (
    <nav className="fixed w-full z-50 glass border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl font-black tracking-tighter text-primary italic">
              LOGO<span className="text-accent underline">.</span>
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
            <Link href="/" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">Explore</Link>

            {!loading && (
              user ? (
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3 group">
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-primary font-black border-2 border-primary overflow-hidden">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase text-slate-400 leading-none">Hello,</span>
                      <span className="text-sm font-black text-primary leading-tight">{user.name || user.email?.split('@')[0]}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full transition-all group"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">Log In</Link>
                  <Link href="/signup" className="flex items-center space-x-2 btn-primary py-2.5 px-6">
                    <User className="h-4 w-4" />
                    <span>Join Now</span>
                  </Link>
                </div>
              )
            )}
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
          <Link href="/" className="block text-lg font-bold">Explore</Link>
          {user ? (
            <>
              <div className="font-bold text-primary">Signed in as {user.name}</div>
              <button onClick={handleSignOut} className="block w-full text-left font-bold text-red-600">Sign Out</button>
            </>
          ) : (
            <>
              <Link href="/login" className="block text-lg font-bold">Log In</Link>
              <Link href="/signup" className="block w-full text-center btn-primary">Join Now</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
