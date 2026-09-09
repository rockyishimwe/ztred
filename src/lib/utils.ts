import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, resolving conditional values with clsx and deduplicating
 * conflicting Tailwind utilities with tailwind-merge (last class wins).
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

/**
 * Whether a nav item pointing at `href` should read as the current page.
 *
 * Prefix match, so a nav entry stays lit on its own sub-routes: the DMs item
 * links `/workspace/dm` but must also be active on `/workspace/dm/sam_rivera`.
 * An exact `pathname === href` test (which every layout but the control shell
 * used to do) left the rail with nothing highlighted on most real screens.
 *
 * Index routes are the exception — `/workspace` is a prefix of every other
 * workspace route, so it only matches exactly. Pass `exact` for those.
 */
export const isRouteActive = (
  pathname: string | null,
  href: string,
  exact = false
): boolean => {
  if (!pathname) return false;
  if (exact) return pathname === href;
  // Guard the segment boundary so `/workspace/docs` does not light up for
  // `/workspace/docsomething`.
  return pathname === href || pathname.startsWith(`${href}/`);
};
