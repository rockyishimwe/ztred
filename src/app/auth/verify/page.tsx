"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, RefreshCw, ArrowRight, Check } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (val: string, index: number) => {
    if (/^[0-9]?$/.test(val)) {
      const newCode = [...code];
      newCode[index] = val;
      setCode(newCode);

      // Auto-advance to next input
      if (val && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/workspace/channels/general');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-theme-primary flex flex-col lg:flex-row font-sans selection:bg-purple-500 selection:text-theme-primary">
      {/* Left Column - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 max-w-xl mx-auto lg:mx-0 w-full">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/ztred-logo.svg" alt="Ztred" className="w-10 h-10" />
              <span className="text-xl font-bold tracking-tight text-theme-primary">
                Ztred
              </span>
            </div>
            <Link
              href="/auth/register"
              className="text-xs font-semibold text-purple-400 hover:underline flex items-center"
            >
              ← Back to sign up
            </Link>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/50 flex items-center justify-center text-purple-400">
              <Mail className="w-6 h-6" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-primary">
              Check your inbox
            </h1>
            <p className="text-sm text-zinc-400">
              We sent a six-digit verification code to <span className="text-theme-primary font-medium">you@company.com</span>.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            {/* 6 Digit Inputs */}
            <div className="flex justify-between gap-2 sm:gap-3">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => { inputRefs.current[idx] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold bg-theme-card border border-theme rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-theme-primary font-semibold text-sm py-3.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center space-x-2 group"
            >
              <span>Verify email</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Resend box card */}
          <div className="bg-theme-card border border-theme rounded-2xl p-5 text-center space-y-2">
            <p className="text-xs text-zinc-400">Didn't receive the email?</p>
            <button
              type="button"
              onClick={() => alert('Verification code resent!')}
              className="inline-flex items-center space-x-2 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend code</span>
            </button>
          </div>

          <div className="text-center text-xs text-theme-muted">
            Need help?{' '}
            <a href="#" className="text-purple-400 hover:underline">
              Contact support
            </a>
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
