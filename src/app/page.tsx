"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Users,
  ArrowLeft,
  Send,
} from "lucide-react";
import TypewriterText from "@/components/ui/TypewriterText";
import { useUIStore } from "@/stores/uiStore";

export default function LandingPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeForm, setActiveForm] = useState<"signin" | "signup" | "forgot">("signin");
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  const handleGetStarted = () => {
    router.push("/workspace/control");
  };

  const switchForm = (to: "signin" | "signup" | "forgot") => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveForm(to);
      setIsAnimating(false);
    }, 250);
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans selection:bg-purple-500 selection:text-white"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* Top Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{ backgroundColor: "var(--bg-primary)", opacity: 0.95 }}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/ztred-logo.svg" alt="" className="w-10 h-10" aria-hidden="true" />
            <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>Ztred</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleTheme()}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{
                backgroundColor: theme === "dark" ? "var(--bg-card)" : "var(--bg-secondary)",
                color: theme === "dark" ? "var(--text-primary)" : "var(--text-muted)",
              }}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 relative z-10 flex flex-col justify-center">
            {/* Illustration */}
            <div className="hidden lg:block">
              <img
                src="/chatting-illustration.svg"
                alt="Team collaboration illustration"
                className="w-64 sm:w-72 lg:w-80"
                aria-hidden="true"
              />
            </div>

            {/* Heading */}
            <h1 className="responsive-text-h1 text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]" style={{ color: "var(--text-primary)" }}>
              Team chat, calls,
              <br />
              files, and AI in one
              <br />
              <span className="text-purple-500">
                <TypewriterText
                  phrases={["workspace.", "platform.", "app.", "tool."]}
                  typingSpeed={90}
                  deletingSpeed={50}
                  pauseAfterType={2200}
                  pauseAfterDelete={400}
                />
              </span>
            </h1>

          </div>

          {/* Right Content - Auth Card */}
          <div className="relative z-10 flex justify-center lg:justify-end">
            <div
              className="w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
              }}
              role="region"
              aria-label={activeForm === "signup" ? "Sign up" : activeForm === "forgot" ? "Reset password" : "Sign in"}
            >
              <div
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "translateY(8px)" : "translateY(0)",
                }}
              >
                {activeForm === "signin" ? (
                  /* ═══ Sign In Form ═══ */
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        Welcome back
                      </span>
                      <h2 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Sign in to Ztred</h2>
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Pick up exactly where your team left off.
                      </p>
                    </div>

                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Work email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <label htmlFor="password" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Your password"
                          autoComplete="current-password"
                          className="w-full rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center transition-colors rounded-r-xl"
                          style={{ color: "var(--text-muted)" }}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                        </button>
                      </div>
                      <div className="text-right">
                        <button
                          onClick={() => switchForm("forgot")}
                          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                      onClick={handleGetStarted}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Sign in</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="relative py-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full" style={{ borderTop: "1px solid var(--border-color)" }} />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}>
                          or continue with
                        </span>
                      </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign in">
                      <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }} aria-label="Sign in with Google">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }} aria-label="Sign in with GitHub">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </button>
                    </div>

                    {/* Create Account */}
                    <div className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      New to Ztred?{" "}
                      <button
                        onClick={() => switchForm("signup")}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        Create an account
                      </button>
                    </div>
                  </div>
                ) : activeForm === "signup" ? (
                  /* ═══ Sign Up Form ═══ */
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        Get started
                      </span>
                      <h2 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Create your account</h2>
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Start collaborating with your team today.
                      </p>
                    </div>

                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="signup-name" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Full name
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="signup-name"
                          type="text"
                          placeholder="Alex Johnson"
                          autoComplete="name"
                          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    {/* Work Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="signup-email" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Work email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="signup-email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <label htmlFor="signup-password" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a strong password"
                          autoComplete="new-password"
                          className="w-full rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 h-full w-10 flex items-center justify-center transition-colors rounded-r-xl"
                          style={{ color: "var(--text-muted)" }}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                        </button>
                      </div>
                    </div>

                    {/* Sign Up Button */}
                    <button
                      onClick={handleGetStarted}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Create account</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="relative py-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full" style={{ borderTop: "1px solid var(--border-color)" }} />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="px-3" style={{ backgroundColor: "var(--bg-card)", color: "var(--text-muted)" }}>
                          or sign up with
                        </span>
                      </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign up">
                      <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }} aria-label="Sign up with Google">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }} aria-label="Sign up with GitHub">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </button>
                    </div>

                    {/* Already have account */}
                    <div className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      Already have an account?{" "}
                      <button
                        onClick={() => switchForm("signin")}
                        className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ═══ Forgot Password Form ═══ */
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">
                        Reset password
                      </span>
                      <h2 className="text-2xl font-bold mt-2" style={{ color: "var(--text-primary)" }}>Forgot your password?</h2>
                      <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                        Enter your email and we&apos;ll send you a reset link.
                      </p>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="forgot-email" className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                        Work email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--text-muted)" }} aria-hidden="true" />
                        <input
                          id="forgot-email"
                          type="email"
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="w-full rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none transition-colors"
                          style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)", color: "var(--text-primary)" }}
                        />
                      </div>
                    </div>

                    {/* Send Reset Link Button */}
                    <button
                      onClick={handleGetStarted}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-purple-600/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send reset link</span>
                    </button>

                    {/* Back to sign in */}
                    <div className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                      <button
                        onClick={() => switchForm("signin")}
                        className="inline-flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to sign in
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
