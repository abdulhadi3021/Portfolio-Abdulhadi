module.exports = {
  reactStrictMode: true,
  swcMinify: false,
  compiler: {
    styledComponents: true
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}
