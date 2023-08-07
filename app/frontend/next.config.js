/** @type {import('next').NextConfig} */

const libs = require('glob')
  .sync('../../package/*/package.json')
  .map((x) => require(x).name);

/** @type  {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: libs,
};
