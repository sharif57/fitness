// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   eslint: {
//     ignoreDuringBuilds: true,
//   },

// };

// export default nextConfig;

import type { NextConfig } from "next";
const withTM = require("next-transpile-modules")(["@ant-design/icons-svg"]); // Add this line

const nextConfig: NextConfig = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Other config options
  reactStrictMode: true, // Add strict mode for React
});

export default nextConfig;
