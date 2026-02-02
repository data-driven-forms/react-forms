const nxPreset = require('@nx/jest/preset').default;
const path = require('path');

const setupTestsPath = path.resolve(__dirname, './config/jest.setup.js');

module.exports = {
  ...nxPreset,
  testEnvironment: 'jsdom',
  verbose: true,
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/../../__mocks__/fileMock.js',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library|@data-driven-forms)/)',
    '/config/jest\\.setup\\.js$'
  ],
  setupFilesAfterEnv: [setupTestsPath, 'jest-canvas-mock'],
  testPathIgnorePatterns: ['/node_modules/', 'packages/suir-component-mapper/', 'packages/parsers/', '/templates/', '/.nx/'],
  modulePathIgnorePatterns: [
    'packages/.*/common',
    'packages/.*/component-types',
    'packages/.*/compose-validators',
    'packages/.*/condition',
    'packages/.*/data-types',
    'packages/.*/esm',
    'packages/.*/field-array',
    'packages/.*/field-provider',
    'packages/.*/form-renderer',
    'packages/.*/use-field-api',
    'packages/.*/use-form-api',
    'packages/.*/validators',
    'packages/.*/validation',
    'templates/',
    '.nx/'
  ],
  collectCoverageFrom: [
    '<rootDir>/../../packages/**/src/**/*.{js,ts,tsx}',
    '!<rootDir>/../../packages/**/src/**/*.d.ts',
    '!<rootDir>/../../packages/react-renderer-demo/**/*.js',
    '!<rootDir>/../../packages/suir-component-mapper/**/*.js',
    '!<rootDir>/../../packages/**/dist',
    '!<rootDir>/../../templates/**/*.js',
    '!<rootDir>/../../packages/**/src/**/index.{js,ts}',
    '!<rootDir>/../../shared/**/*.js',
    '!<rootDir>/../../packages/**/src/tests/**/*',
  ],
};
