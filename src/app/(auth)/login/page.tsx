"use client"

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2, Key } from "lucide-react";
import { authService } from "@/lib/services/authService";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.signIn(formData.email, formData.password);
      router.push("/");
      router.refresh(); // Refresh to update navbar/session
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Form Section */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-4">Welcome back</h1>
            <p className="text-slate-500 font-medium">New explorer? <Link href="/signup" className="text-primary font-bold hover:underline">Create an account</Link></p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-8 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Email Address</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-muted border border-border rounded-3xl py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all font-bold text-slate-800"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                <Link href="#" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  required
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-muted border border-border rounded-3xl py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all font-bold text-slate-800"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full btn-accent py-5 rounded-3xl text-lg font-black flex items-center justify-center space-x-3 group active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-xl shadow-accent/20"
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-12 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-2 py-3 px-6 bg-muted rounded-2xl hover:bg-slate-200 transition-all font-black text-[10px] uppercase tracking-widest">
                    <span>Google</span>
                </button>
                <button className="flex items-center justify-center space-x-2 py-3 px-6 bg-muted rounded-2xl hover:bg-slate-200 transition-all font-black text-[10px] uppercase tracking-widest">
                    <span>Apple</span>
                </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Decoration */}
      <div className="hidden lg:flex bg-muted relative overflow-hidden flex-col justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        
        <div className="relative z-10 text-white">
          <div className="h-16 w-16 bg-accent rounded-3xl flex items-center justify-center mb-8 rotate-3 shadow-2xl">
            <Key className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-5xl font-black mb-6 tracking-tighter">Your Journey <br /> starts here.</h2>
          <p className="text-xl text-slate-200 font-medium max-w-sm">
            Access your bookings, reviews, and personalized adventure recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
