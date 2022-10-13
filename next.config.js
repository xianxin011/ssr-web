/** @type {import('next').NextConfig} */
const path = require('path');

const semi = require("@douyinfe/semi-next").default({});
const StylelintPlugin = require('stylelint-webpack-plugin');

const nextConfig = semi({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.plugins.push(new StylelintPlugin(
      {
        configFile: path.resolve(__dirname, './stylelint.config.js'),
        extensions: ['scss'],
        files: 'pages/**/*.module.scss',
        lintDirtyModulesOnly: true,
        threads: true,
        fix: true,
        exclude: ['node_modules']
      }
    ));
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname),
    };
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ["127.0.0.1"],
  },
  env: {
    NEXTAUTH_URL: process.env['NEXTAUTH_URL']
  }
})

module.exports = nextConfig
