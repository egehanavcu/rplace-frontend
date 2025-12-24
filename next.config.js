/** @type {import('next').NextConfig} */
const WebpackObfuscator = require("webpack-obfuscator");

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.module.rules.push({
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /\.next/],
        enforce: "post",
        use: [
          {
            loader: WebpackObfuscator.loader,
            options: {
              rotateStringArray: true,
              stringArray: true,
              stringArrayThreshold: 0.75,
              compact: true,
              identifierNamesGenerator: "hexadecimal",
              disableConsoleOutput: true,
              controlFlowFlattening: true,
              controlFlowFlatteningThreshold: 0.5,
              splitStrings: false,
              debugProtection: false,

              ignoreImports: true,

              reservedStrings: [
                "use client",
                "use server",
                "react",
                "react-dom",
                "phaser",
                "Phaser",
              ],
            },
          },
        ],
      });
    }

    return config;
  },
};

module.exports = nextConfig;
