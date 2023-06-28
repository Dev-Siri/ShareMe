/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["cdn.sanity.io", "lh3.googleusercontent.com"],
  },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
