/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /**
   * `next/image` is not used anywhere yet — every avatar and thumbnail is a
   * plain <img> (and `@next/next/no-img-element` is switched off in
   * .eslintrc.json accordingly). These patterns are kept, not because they do
   * anything today, but because they are the allow-list any future migration
   * to next/image needs; adding a host later is easy to forget.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
