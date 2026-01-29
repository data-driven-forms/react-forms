const { getJestProjectsAsync } = require('@nx/jest');
const path = require('path');

module.exports = async () => ({
  projects: [
    ...(await getJestProjectsAsync()),
  ],
  setupFilesAfterEnv: [path.resolve(__dirname, './config/jest.setup.js')],
  globalSetup: '<rootDir>/config/globalSetup.js',
});
