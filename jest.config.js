module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    'packages/suir-component-mapper/',
    '/.nx/'
  ],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest.setup.js'
  ],
  collectCoverageFrom: [
    '<rootDir>/packages/**/src/**/*.js',
    '<rootDir>/packages/**/src/**/*.ts',
    '!<rootDir>/packages/**/src/**/*.d.ts',
    '!<rootDir>/packages/react-renderer-demo/**/*.js',
    '!<rootDir>/packages/suir-component-mapper/**/*.js',
    '!<rootDir>/packages/**/dist',
    '!<rootDir>/templates/**/*.js',
    '!<rootDir>/packages/**/src/**/index.js',
    '!<rootDir>/shared/**/*.js'
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/templates/',
    '<rootDir>/.nx/'
  ],
  globalSetup: '<rootDir>/config/globalSetup.js'
};
