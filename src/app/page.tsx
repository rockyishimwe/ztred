"use client";

import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  TrendingUp,
  Mail,
  Lock,
  Github,
  Rocket,
  Globe,
  Layers,
  CheckCircle2,
} from "lucide-react";

export default function ScouttsLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f6fc] text-[#111111] font-sans relative overflow-hidden flex flex-col justify-between selection:bg-[#315BFF] selection:text-white">
      {/* Soft gradient background glow matching reference */}
      <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-bl from-[#d5dcff]/60 via-[#e0d7ff]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-[#e3e8ff]/50 via-transparent to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Branding, Copy & Product Mockup */}
        <div className="lg:col-span-6 space-y-10">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#315BFF] to-[#6657F5] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-[#315BFF]/30">
              S
            </div>
            <span className="text-2xl font-bold tracking-tight text-[#111111]">Scoutts</span>
          </div>

          {/* Heading & Subtitle */}
          <div className="space-y-4 max-w-lg">
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-[#111111] leading-[1.08]">
              Launch. Share.
              <br />
              <span className="bg-gradient-to-r from-[#315BFF] to-[#6657F5] bg-clip-text text-transparent">
                Grow together.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#555555] leading-relaxed">
              Join Scouts and bring your product to the right audience. Get discovered, get feedback, and grow your impact.
            </p>
          </div>

          {/* Product Mockup Card Preview */}
          <div className="relative max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-5 border border-gray-200/80 shadow-2xl shadow-indigo-100/50 flex gap-4">
            {/* Sidebar mini icons */}
            <div className="w-10 flex flex-col items-center py-2 space-y-4 border-r border-gray-100 text-gray-400">
              <div className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 text-xs">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="w-6 h-6 rounded-lg hover:bg-gray-50 flex items-center justify-center text-xs">
                <Globe className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#315BFF]" />
                  <span className="text-xs font-bold text-gray-800">My Product</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Creative Project Card */}
                <div className="bg-[#fcfdff] border border-gray-100 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#315BFF] text-white flex items-center justify-center">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Creative Project</h4>
                      <p className="text-[10px] text-gray-500">Productivity</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-semibold">Published</span>
                    <span className="text-gray-400 font-medium">👁 2.4K</span>
                  </div>
                </div>

                {/* Views Card */}
                <div className="bg-[#fcfdff] border border-gray-100 rounded-2xl p-4 space-y-2 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-gray-500">Views</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">↑ 28%</span>
                  </div>
                  <div className="text-lg font-black text-gray-900">12.4K</div>
                  {/* Mini Chart SVG */}
                  <div className="h-6 w-full">
                    <svg className="w-full h-full text-[#315BFF]" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M0 25 Q 25 5, 50 18 T 100 2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overlapping Bottom Metric Floating Pills */}
          <div className="flex items-center gap-2 pl-14">
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-gray-200/80 shadow-md text-xs font-semibold text-gray-700">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Likes</span>
              <span className="text-gray-900 font-bold">842</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-gray-200/80 shadow-md text-xs font-semibold text-gray-700">
              <MessageCircle className="w-3.5 h-3.5 text-[#315BFF]" />
              <span>Comments</span>
              <span className="text-gray-900 font-bold">128</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white border border-gray-200/80 shadow-md text-xs font-semibold text-gray-700">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Upvotes</span>
              <span className="text-gray-900 font-bold">1.2K</span>
            </div>
          </div>
        </div>

        {/* Right Column: Log In Card */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] bg-white rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-200/40 border border-gray-100">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Welcome back!</h3>
                <p className="text-sm text-gray-500">You have successfully logged in to Scouts.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Card Header */}
                <div className="text-center space-y-1">
                  <h2 className="text-2xl font-black tracking-tight text-[#111111]">Welcome back</h2>
                  <p className="text-xs sm:text-sm text-[#555555]">Log in to your Scouts account</p>
                </div>

                {/* Social Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => alert("Google login initiated.")}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-[#111111] shadow-sm transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </button>

                  <button
                    onClick={() => alert("GitHub login initiated.")}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-sm font-semibold text-[#111111] shadow-sm transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Continue with GitHub
                  </button>
                </div>

                {/* Divider */}
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-gray-400 font-semibold">or</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-medium text-center">
                      {error}
                    </div>
                  )}

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Email address</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#315BFF] focus:ring-2 focus:ring-[#315BFF]/20 transition-all shadow-sm pr-10"
                      />
                      <Mail className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Password with Forgot password link */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-gray-700">Password</label>
                      <a href="#forgot" className="text-xs font-semibold text-[#315BFF] hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#315BFF] focus:ring-2 focus:ring-[#315BFF]/20 transition-all shadow-sm pr-10"
                      />
                      <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#315BFF] hover:bg-[#2547db] text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-[#315BFF]/30 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Log in</span>
                  </button>
                </form>

                {/* Sign up link */}
                <div className="text-center text-xs text-gray-500 pt-1">
                  Don&apos;t have an account?{" "}
                  <a href="#signup" className="text-[#315BFF] font-semibold hover:underline">
                    Sign up
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Bottom Disclaimer */}
      <footer className="py-6 text-center text-xs text-gray-400 font-medium">
        By logging in, you agree to our{" "}
        <a href="#terms" className="underline hover:text-gray-600">Terms of Service</a> and{" "}
        <a href="#privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
      </footer>
    </div>
  );
}
