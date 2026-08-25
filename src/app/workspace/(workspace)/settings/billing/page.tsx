"use client";

import React from "react";
import { CreditCard, Check } from "lucide-react";

export default function BillingSettingsPage() {
  return (
    <div className="max-w-2xl space-y-6">
      {/* Current Plan */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Current Plan
        </h2>
        <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: "var(--bg-input)", border: "1px solid var(--border-color)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>Pro Plan</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>$12/user/month</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all" style={{ backgroundColor: "var(--primary)" }}>
            Upgrade
          </button>
        </div>
      </div>

      {/* Payment Method */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Payment Method
        </h2>
        <div className="p-4 rounded-xl" style={{ border: "1px solid var(--border-color)" }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Visa ending in 4242</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>Expires 12/2027</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Features */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <h2 className="text-lg font-bold mb-5" style={{ color: "var(--text-primary)" }}>
          Plan Features
        </h2>
        <div className="space-y-3">
          {["Unlimited channels", "AI assistant", "Video meetings", "File storage (100GB)", "Priority support"].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
