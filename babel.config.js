// See Next.js plugins already included here:
// https: //github.com/vercel/next.js/blob/canary/packages/next/build/babel/preset.ts
module.exports = (api) => {
  let plugins = ["@emotion", "lodash"];

  // babel-jest already adds the istanbul plugin,
  // don't add it again as that breaks babel.
  if (api.env() === "test" && !isJest()) {
    plugins = [...plugins, "istanbul", "rewire-exports"];
  }

  return {
    presets: ["next/babel"],
    plugins,
  };
};

const isJest = () => {
  return process.argv.length > 1 && process.argv[1].includes("jest");
};
