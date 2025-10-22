/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',          // since you are testing Node.js code
  testMatch: ['<rootDir>/tests/**/*.js'], // explicitly match your test files
  verbose: true,                     // shows individual test results
};