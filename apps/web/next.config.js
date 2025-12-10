/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@cognitolab/ui",
    "@cognitolab/common",
    "@cognitolab/components-svg",
    "@cognitolab/eda-pro",
    "@cognitolab/circuit-editor",
    "@cognitolab/microcontroller-sim",
    "@cognitolab/robotics",
    "@cognitolab/lms",
    "@cognitolab/ai-assistant",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    return config;
  },
};

module.exports = nextConfig;

