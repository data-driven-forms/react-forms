export default {
  displayName: '@data-driven-forms/carbon-component-mapper',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/packages/carbon-component-mapper',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../config/jest.setup.js'],
  globalSetup: '<rootDir>/../../config/globalSetup.js',
};