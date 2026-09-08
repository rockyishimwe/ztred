"use client";

import React, { useState } from "react";
import { useNavigation } from "@/components/navigation/NavigationProvider";
import { Spinner } from "@/components/ui/spinner";
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
  CheckCircle2,
  Play,
  FileText,
  MessageSquare,
  Video,
  ListChecks,
  ShieldCheck,
  Compass,
  Diamond,
  Rocket,
  Target,
} from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { ZtredLogo } from "@/components/ui/ZtredLogo";

/**
 * The hero photograph behind the whole page — one file per resolved theme, so
 * flipping the toggle swaps the daylight office for the night skyline.
 */
const HERO_IMAGE = {
  light: "/images/light.png",
  dark: "/images/dark.png",
} as const;

/** Floating product icons, positioned inside a 260×420 box between the columns. */
const FLOW_NODES = [
  { icon: FileText, x: 160, y: 45 },
  { icon: MessageSquare, x: 55, y: 150 },
  { icon: Video, x: 170, y: 215 },
  { icon: ListChecks, x: 200, y: 300 },
  { icon: Users, x: 120, y: 375 },
] as const;

const TRUST_LOGOS = [
  { icon: Compass, name: "Northstar" },
  { icon: Diamond, name: "Nebula Labs" },
  { icon: Rocket, name: "Slythe Ventures" },
  { icon: Target, name: "Titan Core" },
] as const;

const HIGHLIGHTS = [
  "Real-time messaging",
  "AI-powered summaries",
  "Secure by design",
] as const;

export default function LandingPage() {
  const { navigate } = useNavigation();
  const [entering, setEntering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeForm, setActiveForm] = useState<"signin" | "signup" | "forgot">("signin");
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);
  const isDark = theme === "dark";

  const handleGetStarted = () => {
    setEntering(true);
    navigate("/workspace");
  };

  const switchForm = (to: "signin" | "signup" | "forgot") => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveForm(to);
      setIsAnimating(false);
    }, 250);
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: "var(--bg-input)",
    border: "1px solid var(--border-color)",
    color: "var(--text-primary)",
  };

  const eyebrow =
    activeForm === "signup" ? "Get started" : activeForm === "forgot" ? "Reset access" : "Welcome back";

  return (
    <div
      className="relative h-dvh w-full overflow-hidden font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      {/* ── Background photograph ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${isDark ? HERO_IMAGE.dark : HERO_IMAGE.light}')` }}
        aria-hidden="true"
      />
      {/* Scrim: keeps the copy readable and pushes the photo to the lower-left. */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "linear-gradient(105deg, rgba(6,8,16,0.94) 0%, rgba(6,8,16,0.88) 38%, rgba(6,8,16,0.72) 62%, rgba(6,8,16,0.86) 100%)"
            : "linear-gradient(105deg, rgba(248,250,252,0.95) 0%, rgba(248,250,252,0.90) 38%, rgba(248,250,252,0.74) 62%, rgba(248,250,252,0.88) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? "radial-gradient(60% 55% at 78% 42%, rgb(var(--accent-600) / 0.16) 0%, transparent 70%)"
            : "radial-gradient(60% 55% at 78% 42%, rgb(var(--accent-600) / 0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Page ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <header className="shrink-0" role="banner">
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: "var(--primary)",
                  boxShadow: "0 8px 20px -8px rgb(var(--accent-600) / 0.7)",
                  // Repaint the vector mark white so it reads on the accent tile.
                  ["--accent-600" as string]: "255 255 255",
                  ["--accent-800" as string]: "255 255 255",
                } as React.CSSProperties}
              >
                <ZtredLogo className="w-6 h-6" />
              </span>
              <span className="text-xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Ztred
              </span>
            </div>

            {/* Theme switch */}
            <button
              onClick={() => toggleTheme()}
              className="relative h-11 w-[76px] rounded-full transition-colors"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.85)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(14px)",
              }}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDark}
            >
              {/* Track icons — the knob slides over whichever mode is active. */}
              <Sun
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
                aria-hidden="true"
              />
              <Moon
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "var(--text-muted)" }}
                aria-hidden="true"
              />
              {/* Knob: always carries the icon for the mode currently in use. */}
              <span
                className="absolute top-1/2 left-1 -translate-y-1/2 h-8 w-8 rounded-full flex items-center justify-center transition-transform duration-300 ease-out"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--on-primary)",
                  transform: `translateY(-50%) translateX(${isDark ? "34px" : "0px"})`,
                  boxShadow: "0 6px 16px -6px rgb(var(--accent-600) / 0.8)",
                }}
              >
                {isDark ? <Moon className="w-4 h-4" aria-hidden="true" /> : <Sun className="w-4 h-4" aria-hidden="true" />}
              </span>
            </button>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1 min-h-0 w-full">
          <div className="relative max-w-[1400px] mx-auto w-full h-full px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* ── Left: pitch ───────────────────────────────────────── */}
            <div className="hidden lg:flex flex-col justify-center gap-6 max-w-xl">
              <span
                className="inline-flex items-center gap-2 self-start rounded-full px-3.5 py-1.5 text-sm font-medium"
                style={{
                  backgroundColor: "rgb(var(--accent-600) / 0.14)",
                  color: "var(--text-primary)",
                  border: "1px solid rgb(var(--accent-600) / 0.28)",
                }}
              >
                <Users className="w-4 h-4" style={{ color: "var(--primary)" }} aria-hidden="true" />
                One workspace. Every team.
              </span>

              <h1
                className="text-4xl xl:text-[56px] font-extrabold tracking-tight leading-[1.05]"
                style={{ color: "var(--text-primary)" }}
              >
                Team chat, calls, files, and AI in one{" "}
                <span style={{ color: "var(--primary)" }}>workspace.</span>
              </h1>

              <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Bring your team together, stay organized,
                <br />
                and get more done — all in one secure workspace.
              </p>

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <CheckCircle2 className="w-4 h-4" style={{ color: "var(--primary)" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleGetStarted}
                  disabled={entering}
                  aria-busy={entering || undefined}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all disabled:opacity-70 disabled:cursor-progress"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--on-primary)",
                    boxShadow: "0 14px 30px -12px rgb(var(--accent-600) / 0.85)",
                  }}
                >
                  <span>{entering ? "Opening…" : "Start collaborating"}</span>
                  {entering ? <Spinner size="small" className="size-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors"
                  style={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <Play className="w-4 h-4" aria-hidden="true" />
                  Watch demo
                </button>
              </div>
            </div>

            {/* ── Middle: floating product flow ─────────────────────── */}
            <div
              className="hidden xl:block absolute left-1/2 top-1/2 -translate-x-[55%] -translate-y-1/2 w-[260px] h-[420px] pointer-events-none"
              aria-hidden="true"
            >
              <svg viewBox="0 0 260 420" className="absolute inset-0 w-full h-full" fill="none">
                <path
                  d="M160 45 C 120 80, 60 100, 55 150 C 50 195, 150 180, 170 215 C 190 250, 195 275, 200 300 C 205 335, 150 350, 120 375"
                  stroke="rgb(var(--accent-500))"
                  strokeOpacity="0.55"
                  strokeWidth="1.5"
                  strokeDasharray="4 6"
                  strokeLinecap="round"
                />
              </svg>
              {FLOW_NODES.map(({ icon: Icon, x, y }, i) => (
                <span
                  key={i}
                  className="absolute w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    left: x - 24,
                    top: y - 24,
                    backgroundColor: "var(--primary)",
                    color: "var(--on-primary)",
                    boxShadow: isDark
                      ? "0 16px 30px -14px rgb(var(--accent-600) / 0.9)"
                      : "0 16px 30px -14px rgba(15,23,42,0.35)",
                  }}
                >
                  <Icon className="w-5 h-5" />
                </span>
              ))}
            </div>

            {/* ── Right: auth card ──────────────────────────────────── */}
            <div className="relative z-10 flex justify-center lg:justify-end w-full max-h-full">
              <div
                className="w-full max-w-md rounded-3xl p-6 sm:p-7 overflow-y-auto max-h-full"
                style={{
                  backgroundColor: isDark ? "rgba(20,24,36,0.88)" : "rgba(255,255,255,0.92)",
                  border: "1px solid var(--border-color)",
                  backdropFilter: "blur(18px)",
                  boxShadow: isDark
                    ? "0 30px 70px -30px rgba(0,0,0,0.9)"
                    : "0 30px 70px -30px rgba(15,23,42,0.35)",
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
                  <p
                    className="text-[11px] font-semibold uppercase tracking-[0.12em] mb-2"
                    style={{ color: "var(--primary)" }}
                  >
                    {eyebrow}
                  </p>

                  {activeForm === "signin" ? (
                    /* ═══ Sign In Form ═══ */
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Sign in to Ztred</h2>
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            className="text-xs font-medium transition-colors"
                            style={{ color: "var(--primary)" }}
                          >
                            Forgot password?
                          </button>
                        </div>
                      </div>

                      {/* Sign In Button */}
                      <button
                        onClick={handleGetStarted}
                        disabled={entering}
                        aria-busy={entering || undefined}
                        className="w-full font-semibold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--on-primary)",
                          boxShadow: "0 14px 30px -14px rgb(var(--accent-600) / 0.85)",
                        }}
                      >
                        <span>{entering ? "Signing in…" : "Sign in"}</span>
                        {entering ? <Spinner size="small" className="size-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>

                      {/* Divider */}
                      <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full" style={{ borderTop: "1px solid var(--border-color)" }} />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-3" style={{ backgroundColor: isDark ? "#161a26" : "#ffffff", color: "var(--text-muted)" }}>
                            or continue with
                          </span>
                        </div>
                      </div>

                      {/* Social Logins */}
                      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign in">
                        <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={inputStyle} aria-label="Sign in with Google">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                          Google
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={inputStyle} aria-label="Sign in with GitHub">
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
                          className="font-medium transition-colors"
                          style={{ color: "var(--primary)" }}
                        >
                          Create an account
                        </button>
                      </div>
                    </div>
                  ) : activeForm === "signup" ? (
                    /* ═══ Sign Up Form ═══ */
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Create your account</h2>
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                            style={inputStyle}
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
                        disabled={entering}
                        aria-busy={entering || undefined}
                        className="w-full font-semibold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--on-primary)",
                          boxShadow: "0 14px 30px -14px rgb(var(--accent-600) / 0.85)",
                        }}
                      >
                        <span>{entering ? "Creating account…" : "Create account"}</span>
                        {entering ? <Spinner size="small" className="size-4" /> : <ArrowRight className="w-4 h-4" />}
                      </button>

                      {/* Divider */}
                      <div className="relative py-1">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full" style={{ borderTop: "1px solid var(--border-color)" }} />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="px-3" style={{ backgroundColor: isDark ? "#161a26" : "#ffffff", color: "var(--text-muted)" }}>
                            or sign up with
                          </span>
                        </div>
                      </div>

                      {/* Social Logins */}
                      <div className="grid grid-cols-2 gap-3" role="group" aria-label="Social sign up">
                        <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={inputStyle} aria-label="Sign up with Google">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                          </svg>
                          Google
                        </button>
                        <button className="flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-colors" style={inputStyle} aria-label="Sign up with GitHub">
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
                          className="font-medium transition-colors"
                          style={{ color: "var(--primary)" }}
                        >
                          Sign in
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* ═══ Forgot Password Form ═══ */
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Forgot your password?</h2>
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
                            style={inputStyle}
                          />
                        </div>
                      </div>

                      {/* Send Reset Link Button */}
                      <button
                        onClick={handleGetStarted}
                        disabled={entering}
                        aria-busy={entering || undefined}
                        className="w-full font-semibold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-progress"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--on-primary)",
                          boxShadow: "0 14px 30px -14px rgb(var(--accent-600) / 0.85)",
                        }}
                      >
                        {entering ? <Spinner size="small" className="size-4" /> : <Send className="w-4 h-4" />}
                        <span>{entering ? "Sending…" : "Send reset link"}</span>
                      </button>

                      {/* Back to sign in */}
                      <div className="text-center text-sm" style={{ color: "var(--text-secondary)" }}>
                        <button
                          onClick={() => switchForm("signin")}
                          className="inline-flex items-center gap-1.5 font-medium transition-colors"
                          style={{ color: "var(--primary)" }}
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
        </main>

        {/* Footer: social proof + trust badges */}
        <footer className="shrink-0 hidden lg:block">
          <div className="max-w-[1400px] mx-auto w-full px-4 sm:px-8 pb-6 flex items-end justify-between gap-6">
            <div className="space-y-3">
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Trusted by teams worldwide</p>
              <ul className="flex items-center gap-7">
                {TRUST_LOGOS.map(({ icon: Icon, name }) => (
                  <li key={name} className="flex items-center gap-2 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="flex items-center rounded-2xl px-5 py-3"
              style={{
                backgroundColor: isDark ? "rgba(20,24,36,0.8)" : "rgba(255,255,255,0.9)",
                border: "1px solid var(--border-color)",
                backdropFilter: "blur(14px)",
              }}
            >
              <span className="flex items-center gap-2 text-sm pr-5" style={{ color: "var(--text-secondary)" }}>
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                SOC 2 ready
              </span>
              <span className="h-5 w-px" style={{ backgroundColor: "var(--border-color)" }} aria-hidden="true" />
              <span className="flex items-center gap-2 text-sm pl-5" style={{ color: "var(--text-secondary)" }}>
                <Lock className="w-4 h-4" aria-hidden="true" />
                Private by default
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
