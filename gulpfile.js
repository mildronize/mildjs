const { series, parallel } = require('gulp');
const { run } = require('./build-utils');

const scope = 'cd ' + (process.env.SCOPE || 'packages/core');

const before = async () => await run(scope, 'npm install reflect-metadata @types/node');
const build = async () => await run(scope, 'npm run build');
const test = async () => await run(scope, 'npm test');
const testCoverage = async () => await run(scope, 'npm run test:coverage');
const uploadCoverage = async () => await run(scope, 'bash -c "bash <(curl -s https://codecov.io/bash)"');

// exports.build = build;
exports.default = series(
  before,
//   build,
//   test,
//   testCoverage,
//   uploadCoverage
);
