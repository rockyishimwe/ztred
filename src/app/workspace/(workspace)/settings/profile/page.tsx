"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Camera, User } from "lucide-react";

export default function ProfileSettingsPage() {
  const [fullName, setFullName] = useState("Jordan Lee");
  const [role, setRole] = useState("Product Designer");
  const [email, setEmail] = useState("jordan@ztred.io");
  const [location, setLocation] = useState("San Francisco, CA");
  const [bio, setBio] = useState(
    "Passionate about creating intuitive user experiences. Leading the design system and component library for Ztred."
  );
  const [avatar, setAvatar] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80"
  );

  const handleAvatarChange = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setAvatar(ev.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSave = () => {
    alert("Profile saved successfully!");
  };

  return (
    <div className="max-w-2xl">
      {/* Back path */}
      <Link
        href="/workspace/control/control/settings"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 transition-colors"
        style={{ color: "var(--text-secondary)" }}
      >
        <ChevronLeft className="w-4 h-4" />
        Back to workspace settings
      </Link>

      {/* Profile header */}
      <div className="flex items-center gap-5 mb-8">
        <div className="relative group cursor-pointer" onClick={handleAvatarChange}>
          <img
            src={avatar}
            alt={fullName}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-5 h-5 text-white" />
          </div>
          <div
            className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center"
            style={{ border: "2px solid var(--bg-card)" }}
          >
            <Camera className="w-3 h-3 text-white" />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            {fullName}
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            {role}
          </p>
        </div>
      </div>

      {/* Form */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)" }}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                style={{
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Role
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                style={{
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                style={{
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                style={{
                  backgroundColor: "var(--bg-input)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-secondary)" }}>
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all resize-none"
              style={{
                backgroundColor: "var(--bg-input)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-5" style={{ borderTop: "1px solid var(--border-color)" }}>
          <Link
            href="/workspace/control/control/settings"
            className="px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: "transparent",
              border: "1px solid var(--border-color)",
              color: "var(--text-secondary)",
            }}
          >
            Cancel
          </Link>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
