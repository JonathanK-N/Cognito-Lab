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
        canvas: false,
      };
    } else {
      // Externaliser les modules qui ne fonctionnent que côté client
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'canvas',
        'react-konva': 'react-konva',
        konva: 'konva',
        three: 'three',
        '@react-three/fiber': '@react-three/fiber',
        '@react-three/drei': '@react-three/drei',
      });
    }
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };
    // Ignorer les warnings de module
    config.ignoreWarnings = [
      { module: /node_modules\/three-mesh-bvh/ },
      { module: /node_modules\/konva/ },
    ];
    return config;
  },
};

module.exports = nextConfig;

