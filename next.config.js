/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Config options here */
  // Ensure we support the latest React features
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
