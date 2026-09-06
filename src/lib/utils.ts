import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge class names, resolving conditional values with clsx and deduplicating
 * conflicting Tailwind utilities with tailwind-merge (last class wins).
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};
