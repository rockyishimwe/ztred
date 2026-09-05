"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from "react";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={ref} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
};

export const DropdownMenuTrigger: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      className={`relative ${className || ""}`}
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
};

export const DropdownMenuContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) return null;

  return (
    <div
      className={`absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-theme-card border border-theme py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20 animate-slide-up ${className || ""}`}
    >
      {children}
    </div>
  );
};

export const DropdownMenuItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className, onClick }) => {
  const { setIsOpen } = useContext(DropdownContext);

  return (
    <button
      type="button"
      className={`w-full px-4 py-2 text-sm text-theme-primary hover:bg-theme-secondary cursor-pointer text-left ${className || ""}`}
      onClick={() => {
        onClick?.();
        setIsOpen(false);
      }}
    >
      {children}
    </button>
  );
};
