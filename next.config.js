/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: false, // Disable SWC minifier for Node 16
  compiler: {
    styledComponents: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}