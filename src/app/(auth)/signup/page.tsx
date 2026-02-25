"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { authService } from "@/lib/services/authService";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await authService.signUp(formData.email, formData.password, formData.name);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full text-center border border-border"
        >
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h2 className="text-3xl font-black mb-4 tracking-tighter">Registration Successful!</h2>
          <p className="text-slate-500 font-medium mb-8">
            Your account has been created successfully. You can now log in to start your adventure.
          </p>
          <Link href="/login" className="btn-accent py-4 px-8 rounded-2xl inline-block w-full font-black uppercase tracking-widest text-sm">
            Go to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-white">
      {/* Left Decoration - Visible on Desktop */}
      <div className="hidden lg:flex bg-primary relative overflow-hidden flex-col justify-between p-16 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero_bg_1.jpg')] bg-cover bg-center opacity-40 grayscale" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent/20" />

        <Link href="/" className="relative z-10 flex items-center space-x-2">
          <span className="text-3xl font-black tracking-tighter italic">KHOJII.</span>
        </Link>

        <div className="relative z-10">
          <h2 className="text-5xl font-black mb-6 tracking-tighter">Start your <br /> adventure with us.</h2>
          <p className="text-xl text-slate-300 font-medium max-w-md">
            Join the community of explorers discovering offbeat India.
          </p>
        </div>

        <div className="relative z-10 mb-8">
          <div className="flex -space-x-3 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-10 rounded-full border-2 border-primary bg-slate-400 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
              </div>
            ))}
            <div className="h-10 w-10 rounded-full border-2 border-primary bg-accent flex items-center justify-center text-[10px] font-black text-primary">
              10K+
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Trusted by over 10,000 travelers</p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex items-center justify-center p-8 lg:p-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full"
        >
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-4">Create an account</h1>
            <p className="text-slate-500 font-medium">Already have one? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link></p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold mb-8 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">
                  <User className="h-5 w-5" />
                </div>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-muted border border-border rounded-3xl py-4 pl-16 pr-6 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:bg-white transition-all font-bold text-slate-800"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

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
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Password</label>
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
                  <span>Create Account</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            By signing up, you agree to our <span className="text-primary hover:underline cursor-pointer">Terms</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
