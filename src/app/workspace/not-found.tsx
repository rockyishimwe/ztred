"use client";

import React, { useState } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function NotFound() {
  const router = useRouter();
  const [goingBack, setGoingBack] = useState(false);

  return (
    <div
      className="min-h-dvh flex items-center justify-center font-sans selection:bg-purple-500 selection:text-white"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="text-center max-w-lg px-8">
        {/* Illustration */}
        <div className="mb-6">
          <img
            src="/chatting-illustration.svg"
            alt=""
            className="w-48 mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* 404 */}
        <h1
          className="text-7xl font-extrabold tracking-tight mb-4"
          style={{ color: "var(--primary)" }}
        >
          404
        </h1>

        <h2
          className="text-xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Page not found
        </h2>

        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          <br />
          Let&apos;s get you back on track.
        </p>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setGoingBack(true);
              router.back();
            }}
            disabled={goingBack}
            aria-busy={goingBack || undefined}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-progress"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            {goingBack ? (
              <Spinner size="small" className="size-4" />
            ) : (
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            )}
            {goingBack ? "Going back…" : "Go back"}
          </button>
          <NavLink
            href="/workspace"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors"
            style={{ backgroundColor: "var(--primary)" }}
          >
            Workspace home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
