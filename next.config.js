/**
 * @type {import('next').NextConfig}
 */

const config = {
  output: "export",
  reactStrictMode: false,
  productionBrowserSourceMaps: false,
  assetPrefix: "./",
  compiler: {
    styledComponents: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = config;
