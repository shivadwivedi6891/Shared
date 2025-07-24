/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Removed: output: 'export',
  compiler: {
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

export default nextConfig;