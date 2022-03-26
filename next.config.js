/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    GRAPHQL_URL: process.env.GRAPHQL_URL
  }
}

module.exports = nextConfig
