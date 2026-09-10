"use client";

import React, { useEffect } from "react";
import { NavLink } from "@/components/ui/NavLink";
import { useNavigation } from "@/components/navigation/NavigationProvider";
import { Spinner } from "@/components/ui/spinner";
import { ZtredLogo } from "@/components/ui/ZtredLogo";

/** How long the simulated handoff to the identity provider takes. */
const REDIRECT_DELAY_MS = 2200;

export default function SAMLPage() {
  const { navigate } = useNavigation();

  useEffect(() => {
    // Stands in for the round trip to the IdP. Cleared on unmount so leaving
    // the page early does not yank the user into the workspace afterwards.
    const timer = setTimeout(() => navigate("/workspace/control"), REDIRECT_DELAY_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center p-8 font-sans"
      style={{ backgroundColor: "var(--bg-primary)", color: "var(--text-primary)" }}
    >
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center justify-center gap-3">
          <ZtredLogo className="w-10 h-10" title="Ztred" />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Ztred
          </span>
        </div>

        <h1
          className="text-2xl font-bold text-center"
          style={{ color: "var(--text-primary)" }}
        >
          Sign in with company SSO
        </h1>

        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border-color)",
          }}
        >
          <p
            className="mb-6 text-center text-sm"
            style={{ color: "var(--text-secondary)" }}
            role="status"
            aria-live="polite"
          >
            Redirecting to your organization&apos;s SSO portal…
          </p>
          <div className="flex items-center justify-center">
            <Spinner size="large" />
          </div>
        </div>

        <div className="text-center text-xs" style={{ color: "var(--text-muted)" }}>
          Taking too long?{" "}
          <NavLink
            href="/auth/login"
            className="text-purple-400 font-semibold hover:underline"
          >
            Back to sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
}
