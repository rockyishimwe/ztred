import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Ztred — Team chat, calls, files, and AI in one workspace',
  description: 'Bring your team together, stay organized, and get more done — all in one secure workspace.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: '512x512' },
      { url: '/ztred-logo.svg', type: 'image/svg+xml', sizes: '512x512' },
    ],
    apple: { url: '/ztred-logo.svg', sizes: '512x512', type: 'image/svg+xml' },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var root = document.documentElement;
                try {
                  var saved = localStorage.getItem('ztred-theme');
                  var pref = (saved === 'light' || saved === 'dark' || saved === 'system') ? saved : 'dark';
                  var theme = pref === 'system'
                    ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
                    : pref;
                  root.setAttribute('data-theme', theme);
                  root.style.colorScheme = theme;
                } catch(e) {
                  root.setAttribute('data-theme', 'dark');
                }
                try {
                  // Mirrors accentShades() in src/lib/accent.ts. Duplicated here
                  // on purpose: this must run before first paint, so it cannot
                  // wait for the bundle. Keep the two in sync.
                  var hex = (localStorage.getItem('ztred-accent') || '').trim().replace(/^#/, '');
                  if (/^[0-9a-fA-F]{3}$/.test(hex)) {
                    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
                  }
                  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return;
                  var n = parseInt(hex, 16);
                  var rgb = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
                  var mix = { '50': 0.95, '100': 0.89, '200': 0.77, '300': 0.6, '400': 0.36,
                              '500': 0, '600': 0, '700': -0.1, '800': -0.3, '900': -0.5, '950': -0.7 };
                  var shades = {};
                  for (var stop in mix) {
                    var m = mix[stop], target = m >= 0 ? 255 : 0, amount = Math.abs(m);
                    shades[stop] = rgb.map(function(c) {
                      return Math.round(c + (target - c) * amount);
                    }).join(' ');
                    root.style.setProperty('--accent-' + stop, shades[stop]);
                  }
                  root.style.setProperty('--primary', 'rgb(' + shades['600'] + ')');
                  root.style.setProperty('--primary-hover', 'rgb(' + shades['700'] + ')');
                  root.style.setProperty('--ring', 'rgb(' + shades['600'] + ')');
                  root.style.setProperty('--sidebar-active', 'rgb(' + shades['600'] + ')');
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen antialiased font-sans"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
            style={{ backgroundColor: 'var(--primary)', color: '#ffffff' }}
          >
            Skip to main content
          </a>
          <main id="main-content">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}