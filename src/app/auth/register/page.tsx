"use client";

import React, { useState } from 'react';
import { NavLink } from "@/components/ui/NavLink";
import { useNavigation } from '@/components/navigation/NavigationProvider';
import { Spinner } from '@/components/ui/spinner';
import { Eye, EyeOff, Check, ArrowRight } from 'lucide-react';
import { ZtredLogo } from "@/components/ui/ZtredLogo";

export default function RegisterPage() {
  const { navigate } = useNavigation();
  // Which control the user pressed, so only that one shows a spinner.
  const [pending, setPending] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPending('submit');
    navigate('/workspace');
  };

  return (
    <div className="min-h-dvh bg-[#0b0f19] text-theme-primary flex flex-col lg:flex-row font-sans selection:bg-purple-500 selection:text-white">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 max-w-xl mx-auto lg:mx-0 w-full">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <ZtredLogo className="w-10 h-10" title="Ztred" />
            <span className="text-xl font-bold tracking-tight text-theme-primary">
              Ztred
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">GET STARTED FREE</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-primary">
              Create your Ztred account
            </h1>
            <p className="text-sm text-theme-muted">
              Bring your team&apos;s work into one focused, shared space.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-theme-secondary">
                Full name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jordan Lee"
                className="w-full bg-theme-card border border-theme rounded-xl px-4 py-3 text-sm text-theme-primary placeholder-theme focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

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
              <label className="block text-xs font-semibold text-theme-secondary">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            <div className="flex items-center space-x-3 pt-1">
              <input
                type="checkbox"
                required
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 rounded bg-theme-card border-theme text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="terms" className="text-xs text-theme-muted">
                I agree to the <a href="#" className="text-purple-400 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-400 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              disabled={pending !== null}
              aria-busy={pending === 'submit' || undefined}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-theme-primary font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-progress"
            >
              <span>{pending === 'submit' ? 'Creating account…' : 'Create account'}</span>
              {pending === 'submit' ? (
                <Spinner size="small" className="size-4" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-theme"></div>
            <span className="flex-shrink mx-4 text-xs text-theme-muted">or continue with</span>
            <div className="flex-grow border-t border-theme"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setPending('Google'); navigate('/workspace'); }}
              disabled={pending !== null}
              aria-busy={pending === 'Google' || undefined}
              className="bg-theme-card hover:bg-theme-secondary-hover border border-theme font-medium text-xs py-3 rounded-xl transition-colors text-center text-theme-secondary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
            >
              {pending === 'Google' ? <Spinner size="small" className="size-3.5" /> : null}
              Google
            </button>
            <button
              onClick={() => { setPending('GitHub'); navigate('/workspace'); }}
              disabled={pending !== null}
              aria-busy={pending === 'GitHub' || undefined}
              className="bg-theme-card hover:bg-theme-secondary-hover border border-theme font-medium text-xs py-3 rounded-xl transition-colors text-center text-theme-secondary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
            >
              {pending === 'GitHub' ? <Spinner size="small" className="size-3.5" /> : null}
              GitHub
            </button>
          </div>

          <div className="text-center text-xs text-theme-muted pt-2">
            Already have an account?{' '}
            <NavLink href="/auth/login" className="text-purple-400 font-semibold hover:underline">
              Sign in
            </NavLink>
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
              <div className="text-xs text-theme-muted">Growth Lead, Northstar</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-xs text-theme-muted z-10">
          <span className="flex items-center"><Check className="w-3.5 h-3.5 text-green-500 mr-1.5" /> SOC 2 ready</span>
          <span className="flex items-center"><Check className="w-3.5 h-3.5 text-green-500 mr-1.5" /> Private by default</span>
        </div>
      </div>
    </div>
  );
}
