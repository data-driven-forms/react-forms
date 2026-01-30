export default {
  displayName: '@data-driven-forms/react-form-renderer',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library|@data-driven-forms)/)',
    '<rootDir>/common/',
    '<rootDir>/component-types/',
    '<rootDir>/compose-validators/',
    '<rootDir>/condition/',
    '<rootDir>/data-types/',
    '<rootDir>/esm/',
    '<rootDir>/field-array/',
    '<rootDir>/field-provider/',
    '<rootDir>/form-renderer/',
    '<rootDir>/use-field-api/',
    '<rootDir>/use-form-api/',
    '<rootDir>/validators/',
    '<rootDir>/validation/',
    '<rootDir>/index.js'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: '../../coverage/packages/react-form-renderer',
};