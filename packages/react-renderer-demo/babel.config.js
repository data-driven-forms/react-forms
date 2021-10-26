const muiTransformPlugin = [
  'transform-imports',
  {
    '@mui/material': {
      transform: (importName) => `@mui/material/${importName}`,
      preventFullImport: false,
      skipDefaultConversion: false
    }
  },
  'MUI-CJS'
];

module.exports = {
  presets: [['next/babel']],
  plugins: [muiTransformPlugin]
};
