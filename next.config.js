const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const readPkgUp = require('read-pkg-up');
const logging = require('webpack/lib/logging/runtime');

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer, webpack }) => {
    // @NOTE: required to run the launchdarkly-node-client-sdk from _app.tsx
    if (!isServer) {
      config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        fs: false,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        net: false,
        os: false,
        path: false,
        tls: false,
        zlib: false,
        stream: require.resolve('stream-browserify'),
        constants: false,
      };
    }

    return config;
  },
});
