"use client";
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className = '' }) => {
  const variants: Record<string, string> = {
    primary: 'bg-theme-primary-subtle text-theme-on-primary',
    secondary: 'bg-theme-secondary text-theme-secondary',
    success: 'bg-theme-success/10 text-theme-success',
    warning: 'bg-theme-warning/10 text-theme-warning',
    danger: 'bg-theme-danger/10 text-theme-danger',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
