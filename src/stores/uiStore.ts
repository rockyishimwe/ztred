import { create } from 'zustand';

interface UIState {
  isSidebarCollapsed: boolean;
  activeRightPanel: 'thread' | 'ai' | null;
  theme: 'dark' | 'light';
  setIsSidebarCollapsed: (collapsed: boolean) => void;
  setActiveRightPanel: (panel: 'thread' | 'ai' | null) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSidebarCollapsed: false,
  activeRightPanel: null,
  theme: 'dark',
  setIsSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  setActiveRightPanel: (panel) => set({ activeRightPanel: panel }),
  setTheme: (theme) => {
    set({ theme });
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ztred-theme', theme);
    }
  },
  toggleTheme: () => {
    const next = get().theme === 'dark' ? 'light' : 'dark';
    get().setTheme(next);
  },
}));