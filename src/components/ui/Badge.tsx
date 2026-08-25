"use client";
import { Dot } from 'lucide-react';

interface BadgeProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'destructive';
  text: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  text
}) => {
  const variantMap: Record<string, string> = {
    primary: 'bg-primary-600 text-primary-100',
    secondary: 'bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200',
    success: 'bg-green-500 text-green-100',
    warning: 'bg-yellow-500 text-yellow-100',
    destructive: 'bg-red-500 text-red-100'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantMap[variant]}`}>
      {text}
    </span>
  );
};