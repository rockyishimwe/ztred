"use client";

import React from "react";
import Link from "next/link";
import { useNavigation } from "@/components/navigation/NavigationProvider";

type AnchorProps = Omit<React.ComponentPropsWithoutRef<typeof Link>, "href" | "children">;

interface NavLinkProps extends AnchorProps {
  href: string;
  /**
   * Either normal children, or a render function that receives whether this
   * link's navigation is currently in flight (for swapping in a spinner).
   */
  children: React.ReactNode | ((pending: boolean) => React.ReactNode);
}

/**
 * Drop-in replacement for `next/link` on navigation chrome.
 *
 * It still renders a real `<a href>` — middle-click, right-click and prefetch
 * keep working — but a plain left-click is routed through `NavigationProvider`
 * so the click has immediate feedback instead of a dead moment.
 */
export function NavLink({ href, children, onClick, ...props }: NavLinkProps) {
  const { navigate, pendingHref } = useNavigation();
  const pending = pendingHref === href;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    // Let the browser own modified clicks (new tab, download, external target).
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      props.target
    ) {
      return;
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      data-pending={pending ? "true" : undefined}
      aria-busy={pending || undefined}
      {...props}
    >
      {typeof children === "function" ? children(pending) : children}
    </Link>
  );
}
