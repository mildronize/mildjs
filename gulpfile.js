const { series, parallel } = require('gulp');
const { run } = require('./build-utils');

const scope = 'cd ' + (process.env.DIR || 'packages/core');

const before = async () => await run(scope, 'npm install reflect-metadata @types/node');
const build = async () => await run(scope, 'npm run build');
const test = async () => await run(scope, 'npm test');
const testCoverage = async () => await run(scope, 'npm run test:coverage');
const uploadCoverage = async () => await run(scope, 'bash -c "bash <(curl -s https://codecov.io/bash)"');

// function buildCI() {
//   return series(before, build, test, testCoverage, uploadCoverage);
// }
// const buildCI =  () =>  series(before, build, test, testCoverage, uploadCoverage);

const start = async () => await run(scope, 'npm start');
const install = async () => await run(scope, 'npm install');

const npmRun = async (cmd) => await run(scope, 'npm run ' + cmd);
const npm = async (cmd) => await run(scope, 'npm ' + cmd);

const main = (exit) => {
  const args = process.argv;
  const cmd = args[3];
  switch(args[2]){
    case '--run': 
      npmRun(cmd);
      exit();
    case '--npm':
      npm(cmd);
      exit();
  }  
  exit();
}

exports.install = install;
exports.start = start;
exports.build = build;
exports.default = series(main);
exports.buildCI = series(before, build, test, testCoverage, uploadCoverage);
