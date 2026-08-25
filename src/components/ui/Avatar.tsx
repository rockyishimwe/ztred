"use client";
import { Image } from 'lucide-react';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  ring?: boolean;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  size = 'md',
  ring = false
}) => {
  const sizeMap: Record<string, string> = {
    xs: 'h-6 w-6',
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-14 w-14'
  };

  return (
    <div className="relative">
      <img
        src={src}
        alt={alt}
        className={`${sizeMap[size]} rounded-full ring-2 ring-white dark:ring-zinc-900 ${ring ? 'ring-primary-500' : ''} object-cover`}
      />
      {alt && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-xs text-center text-white p-1">
          {alt}
        </div>
      )}
    </div>
  );
};