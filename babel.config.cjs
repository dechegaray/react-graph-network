// the babel config is for jest to parse jsx in test/spec files
const presets = [
  ["@babel/preset-env", { targets: { node: "current" } }],
  "@babel/preset-react",
  "@babel/preset-typescript",
];

// eslint-disable-next-line no-undef
module.exports = { presets };
