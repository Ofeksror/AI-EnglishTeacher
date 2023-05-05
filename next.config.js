/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    OPENAI_KEY: process.env.OPENAI_KEY
  }
}

module.exports = nextConfig
