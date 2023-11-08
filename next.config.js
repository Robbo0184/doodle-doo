/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: ['avatars.githubusercontent.com'], 
    domains: ['lh3.googleusercontent.com'],
  },
}

module.exports = nextConfig
