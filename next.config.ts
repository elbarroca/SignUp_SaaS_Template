import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        port: "",
        pathname: "/**",
      },
      {
      protocol: "https",
      hostname: "tailark.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "html.tailus.io",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "images.pexels.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "www.pngplay.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "external-content.duckduckgo.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "api.dicebear.com",
      port: "",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "lh3.googleusercontent.com",
      port: "",
      pathname: "/**",
    },
    ],
  },
};

export default nextConfig;
