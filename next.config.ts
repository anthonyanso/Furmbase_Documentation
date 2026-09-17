import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
      },
      {
        // Blog cover photos + in-post images, uploaded via the admin panel
        // to Supabase Storage. Wildcarded so it keeps working if the
        // project ref ever changes.
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        // Used by the seed post in project.sql; harmless to keep for any
        // future placeholder imagery.
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
