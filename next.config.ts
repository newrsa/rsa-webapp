// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
  /* config options here */
// };

// export default nextConfig;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
};

export default nextConfig;

