"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter } from "next/navigation";

interface NavigationContextValue {
  /** Push a route inside a transition so the pending state is observable. */
  navigate: (href: string) => void;
  /** The href the user last clicked, while that navigation is still in flight. */
  pendingHref: string | null;
  /** True from the click until the new route commits. */
  isNavigating: boolean;
}

const NavigationContext = createContext<NavigationContextValue>({
  navigate: () => {},
  pendingHref: null,
  isNavigating: false,
});

/**
 * How long a pending navigation is allowed to stay on screen before the bar is
 * force-cleared. A same-path push commits without changing `pathname`, so the
 * effect below would otherwise never fire.
 */
const PENDING_TIMEOUT_MS = 8000;

export function useNavigation(): NavigationContextValue {
  return useContext(NavigationContext);
}

/**
 * Tracks route pushes so every navigation has a visible pending state: a top
 * progress bar here, and per-link affordances via `NavLink`.
 *
 * `startTransition` is what makes this work — in the App Router the transition
 * stays pending until the destination segment has rendered, which is the same
 * window `loading.tsx` covers but is also observable for instant navigations.
 */
export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearPending = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPendingHref(null);
  }, []);

  const navigate = useCallback(
    (href: string) => {
      // Re-clicking the current route would leave a spinner with nothing to wait for.
      if (href === pathname) return;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPendingHref(href);
      timeoutRef.current = setTimeout(() => setPendingHref(null), PENDING_TIMEOUT_MS);
      startTransition(() => {
        router.push(href);
      });
    },
    [pathname, router]
  );

  // The new segment is on screen — drop the pending marker.
  useEffect(() => {
    clearPending();
  }, [pathname, clearPending]);

  // focus-on-route-change (WCAG): a client-side route change leaves focus on
  // the link that was just unmounted, so screen reader and keyboard users are
  // dropped back at the top of the tab order with no announcement of where
  // they landed. Move focus to the main region instead — but only after a real
  // navigation, never on the first paint, which would steal focus from the
  // browser's own initial position.
  //
  // Compare against the path last acted on rather than counting renders: under
  // StrictMode the mount effect runs twice, and a render counter treats the
  // replay as a navigation and steals focus on load.
  const lastFocusedPath = useRef(pathname);
  useEffect(() => {
    if (lastFocusedPath.current === pathname) return;
    lastFocusedPath.current = pathname;
    const main = document.getElementById("main-content");
    if (!main) return;
    // tabindex="-1" makes the region programmatically focusable without
    // inserting it into the tab order; preventScroll keeps the new page at the
    // top rather than jumping to wherever the element happens to sit.
    main.setAttribute("tabindex", "-1");
    main.focus({ preventScroll: true });
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isNavigating = isPending || pendingHref !== null;

  return (
    <NavigationContext.Provider value={{ navigate, pendingHref, isNavigating }}>
      {isNavigating ? <NavigationProgressBar /> : null}
      {children}
    </NavigationContext.Provider>
  );
}

/** Indeterminate top-of-viewport progress bar, tinted with the chosen accent. */
function NavigationProgressBar() {
  return (
    <div
      className="nav-progress"
      role="progressbar"
      aria-label="Loading page"
      aria-busy="true"
    >
      <div className="nav-progress-bar" />
    </div>
  );
}
