const createIconsTransformPlugin = [
  'transform-imports',
  {
    '@patternfly/react-icons': {
      transform: (importName) =>
        `@patternfly/react-icons/dist/js/icons/${importName.split(/(?=[A-Z])/).join('-').toLowerCase()}`,
      preventFullImport: true,
    },
  },
];

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'transform-runtime': {
          useESModules: false,
        },
      },
    ],
  ],
  plugins: [ createIconsTransformPlugin ],
};
