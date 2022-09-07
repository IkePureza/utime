/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "www.freepnglogos.com",
      "lh3.googleusercontent.com",
      "placeimg.com",
    ],
  },
};

module.exports = nextConfig;
