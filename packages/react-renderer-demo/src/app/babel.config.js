require.extensions['.css'] = () => undefined;
const path = require('path');
const glob = require('glob');

const mapper = {
  TextVariants: 'Text',
  ButtonVariant: 'Button',
  DropdownPosition: 'dropdownConstants',
  TextListVariants: 'TextList',
  TextListItemVariants: 'TextListItem'
};

const createIconsTransformPlugin = [
  'transform-imports',
  {
    '@patternfly/react-icons': {
      transform: (importName) =>
        `@patternfly/react-icons/dist/js/icons/${importName
          .split(/(?=[A-Z])/)
          .join('-')
          .toLowerCase()}`,
      preventFullImport: true
    }
  }
];

const createReactCoreTransformPlugin = [
  'transform-imports',
  {
    '@patternfly/react-core': {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../../node_modules/@patternfly/react-core/dist/js/**/${mapper[importName] || importName}.js`)
        );
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(path.resolve(__dirname, '../../node_modules/'), '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: true
    }
  },
  'react-core-CJS'
];

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
]

module.exports = {
  presets: [
    [
      'next/babel',
      {
        'transform-runtime': {
          useESModules: false
        }
      }
    ]
  ],
  plugins: [createIconsTransformPlugin, createReactCoreTransformPlugin, muiTransformPlugin]
};
