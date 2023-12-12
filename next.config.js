const { protocol } = require("socket.io-client");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
    SERVER_API_URL: process.env.SERVER_API_URL,
  },
};

module.exports = nextConfig;
