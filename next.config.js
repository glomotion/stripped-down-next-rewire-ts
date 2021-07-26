const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer, webpack }) => {
    if (!isServer) {
      // @NOTE: get babel to parse the DS, so that the tests can rewire it
      // config.module.rules[1] === babel loader rule
      config.module.rules[1].include.push(
        `${process.cwd()}/node_modules/@imtbl/design-system/dist/minified/index.es.js`
      );
      config.module.rules[1].include.push(
        `${process.cwd()}/node_modules/@imtbl/design-system`
      );

      console.log("@@@@@@@", config.module.rules);

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
