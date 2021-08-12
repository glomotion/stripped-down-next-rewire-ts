const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer, webpack }) => {
    config.module.rules.push({ test: /@imtbl/, use: "babel-loader" });
    console.log("@@@@@@@@@@", config.module.rules);

    if (!isServer) {
      // @NOTE: required to run the launchdarkly-node-client-sdk from _app.tsx
      config.resolve.fallback = {
        crypto: require.resolve("crypto-browserify"),
        fs: false,
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        net: false,
        os: false,
        path: false,
        tls: false,
        zlib: false,
        stream: require.resolve("stream-browserify"),
        constants: false,
      };
    }

    return config;
  },
});
