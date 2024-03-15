import path from 'path'

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      '@': path.resolve(__dirname, './app/'),
    }
    return config
  },
}

export default nextConfig
