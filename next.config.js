/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'ddragon.leagueoflegends.com',
          pathname: '**/*.png',
        },
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
      ignoreBuildErrors: true,
    },
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
