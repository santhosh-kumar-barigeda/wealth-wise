import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: '*',
        protocol: 'https',
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.html$/,
      use: ['html-loader'],
    });
    return config;
  },
};

export default nextConfig;
