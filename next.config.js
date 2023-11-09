/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.contentstack.io',
        pathname: '/v3/assets/**',
      },
      // TODO: 챔피언 이미지 등의 리소스들을 어떻게 처리할지 결정나면 변경 혹은 삭제
      {
        protocol: 'https',
        hostname: 'cdn-store.leagueoflegends.co.kr',
        pathname: '/images/v2/champion-splashes/*.jpg',
      },
      // TODO: 챔피언 이미지 등의 리소스들을 어떻게 처리할지 결정나면 변경 혹은 삭제
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        pathname: '/cdn/**',
      },
    ],
  },
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          /** @type {import('@svgr/core').Config} */
          options: {
            svgoConfig: {
              plugins: ['removeXMLNS'],
            },
          },
        },
      ],
    });
    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
};

module.exports = nextConfig;
