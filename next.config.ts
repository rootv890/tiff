import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
    /* config options here */
    devIndicators: false,
    experimental: {
        serverActions: {
            bodySizeLimit: "6mb",
        },
    },
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "res.cloudinary.com",
        }],
    },
};

export default nextConfig;
