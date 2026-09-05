"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/workspace/channels/general');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-theme-primary flex flex-col lg:flex-row font-sans selection:bg-purple-500 selection:text-theme-primary">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 max-w-xl mx-auto lg:mx-0 w-full">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/ztred-logo.svg" alt="Ztred" className="w-10 h-10" />
            <span className="text-xl font-bold tracking-tight text-theme-primary">
              Ztred
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">WELCOME BACK</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-primary">
              Sign in to Ztred
            </h1>
            <p className="text-sm text-zinc-400">
              Pick up exactly where your team left off.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-theme-secondary">
                Work email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-theme-secondary">
                  Password
                </label>
                <a href="#" className="text-xs text-purple-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-muted hover:text-theme-secondary"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-theme-primary font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center space-x-2 group mt-2"
            >
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-theme"></div>
            <span className="flex-shrink mx-4 text-xs text-theme-muted">or continue with</span>
            <div className="flex-grow border-t border-theme"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => router.push('/workspace/channels/general')}
              className="bg-theme-card hover:bg-theme-secondary-hover border border-theme font-medium text-xs py-3 rounded-xl transition-colors text-center text-zinc-200"
            >
              Google
            </button>
            <button
              onClick={() => router.push('/workspace/channels/general')}
              className="bg-theme-card hover:bg-theme-secondary-hover border border-theme font-medium text-xs py-3 rounded-xl transition-colors text-center text-zinc-200"
            >
              GitHub
            </button>
          </div>

          <div className="text-center text-xs text-zinc-400 pt-2">
            New to Ztred?{' '}
            <Link href="/auth/register" className="text-purple-400 font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right Column - Testimonial / Graphic Panel */}
      <div className="hidden lg:flex flex-1 bg-theme-surface border-l border-theme/80 p-16 flex-col justify-between relative overflow-hidden">
        {/* Background Geometric Circles */}
        <div className="absolute top-12 right-12 w-96 h-96 rounded-full border border-purple-900/30 pointer-events-none"></div>
        <div className="absolute top-24 right-24 w-64 h-64 rounded-full border border-indigo-900/40 pointer-events-none"></div>

        <div className="flex items-center space-x-2 text-xs font-medium text-purple-400">
          <span>✦</span>
          <span>One calm place for work</span>
        </div>

        <div className="space-y-8 max-w-lg z-10">
          <blockquote className="text-2xl sm:text-3xl font-medium text-theme-primary leading-relaxed">
            “Ztred gave our team a shared rhythm without adding another layer of busywork.”
          </blockquote>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-purple-900/50 border border-purple-700/50 flex items-center justify-center font-bold text-sm text-purple-300">
              MC
            </div>
            <div>
              <div className="font-semibold text-sm text-theme-primary">Maya Chen</div>
              <div className="text-xs text-zinc-400">Growth Lead, Northstar</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-zinc-400 z-10">
          <span className="flex items-center"><Check className="w-3.5 h-3.5 text-green-500 mr-1.5" /> SOC 2 ready</span>
          <span className="flex items-center"><Check className="w-3.5 h-3.5 text-green-500 mr-1.5" /> Private by default</span>
        </div>
      </div>
    </div>
  );
}
