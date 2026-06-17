/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ativa o modo estrito do React para identificar renderizações duplicadas em desenvolvimento
  reactStrictMode: true,

  // Homologação e otimização de domínios de imagens externas
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Otimizações de compilação aplicadas no ecossistema de produção
  compiler: {
    // Remove os console.logs apenas quando o projeto estiver rodando em produção
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;