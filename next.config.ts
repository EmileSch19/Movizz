import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Autorise les affiches OMDB hébergées sur Amazon
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
  },
}

export default nextConfig