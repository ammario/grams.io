/** @type {import('next').NextConfig} */

const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (config, _) => {
    config.module.rules.push({
      test: /\.yaml$/,
      use: {
        loader: 'yaml-loader',
        options: {
          // loader options
        }
      }
    });

    return config
  }
};

module.exports = nextConfig;
