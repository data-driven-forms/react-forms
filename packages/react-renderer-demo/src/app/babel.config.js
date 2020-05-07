const muiTransformPlugin = [
  'transform-imports',
  {
    '@material-ui/core': {
      transform: (importName) => `@material-ui/core/${importName}`,
      preventFullImport: false,
      skipDefaultConversion: false
    }
  },
  'MUI-CJS'
];

module.exports = {
  presets: [
    [
      'next/babel',
    ]
  ],
  plugins: [muiTransformPlugin]
};
