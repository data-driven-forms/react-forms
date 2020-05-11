require.extensions['.css'] = () => undefined;
const path = require('path');
const glob = require('glob');

const mapper = {
  TextVariants: 'Text',
  ButtonVariant: 'Button',
  TextListVariants: 'TextList',
  TextListItemVariants: 'TextListItem'
};

const blueprintMapper = {
  Checkbox: 'components/forms/controls',
  FormGroup: 'components/forms/formGroup',
  Intent: 'common/intent',
  Button: 'components/button/buttons',
  H1: 'components/html/html',
  H2: 'components/html/html',
  H3: 'components/html/html',
  H4: 'components/html/html',
  RadioGroup: 'components/forms/radioGroup',
  MenuItem: 'components/menu/menuItem',
  Switch: 'components/forms/controls',
  Tab: 'components/tabs/tab',
  InputGroup: 'components/forms/inputGroup',
  TextArea: 'components/forms/textArea'
}

module.exports = {
  extends: '../../babel.config.js',
  env: {
    cjs: {
      plugins: [
        [
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
        ],
        [
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
          },
          'react-icons-CJS'
        ],
        [
          'transform-imports',
          {
            'patternfly-react': {
              transform: (importName) => {
                let res;
                const files = glob.sync(path.resolve(__dirname, `../../node_modules/patternfly-react/dist/js/**/${importName}.js`));
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
              skipDefaultConversion: false
            }
          },
          'pf3-react-CJS'
        ],
        [
          'transform-imports',
          {
            '@material-ui/core': {
              transform: (importName) => `@material-ui/core/${importName}`,
              preventFullImport: false,
              skipDefaultConversion: false
            }
          },
          'MUI-CJS'
        ],
        [
          'transform-imports',
          {
            '@blueprintjs/core': {
              transform: (importName) => `@blueprintjs/core/lib/cjs/${blueprintMapper[importName] || `components/${importName}/${importName}`}.js`,
              preventFullImport: false,
              skipDefaultConversion: true
            }
          },
          'BLUEPRINT-CJS'
        ]
      ]
    },
    esm: {
      plugins: [
        [
          'transform-imports',
          {
            '@patternfly/react-core': {
              transform: (importName) => {
                let res;
                const files = glob.sync(
                  path.resolve(__dirname, `../../node_modules/@patternfly/react-core/dist/esm/**/${mapper[importName] || importName}.js`)
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
          'react-core-ESM'
        ],

        [
          'transform-imports',
          {
            '@patternfly/react-icons': {
              transform: (importName) =>
                `@patternfly/react-icons/dist/esm/icons/${importName
                  .split(/(?=[A-Z])/)
                  .join('-')
                  .toLowerCase()}`,
              preventFullImport: true
            }
          },
          'react-icons-ESM'
        ],
        [
          'transform-imports',
          {
            'patternfly-react': {
              transform: (importName) => {
                let res;
                const files = glob.sync(path.resolve(__dirname, `../../node_modules/patternfly-react/dist/esm/**/${importName}.js`));
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
              skipDefaultConversion: false
            }
          },
          'pf3-react-ESM'
        ],
        [
          'transform-imports',
          {
            '@material-ui/core': {
              transform: (importName) => `@material-ui/core/esm/${importName}`,
              preventFullImport: false,
              skipDefaultConversion: false
            }
          },
          'MUI-ESM'
        ],
        [
          'transform-imports',
          {
            '@blueprintjs/core': {
              transform: (importName) => `@blueprintjs/core/lib/esm/${blueprintMapper[importName] || `components/${importName}/${importName}`}.js`,
              preventFullImport: false,
              skipDefaultConversion: true
            }
          },
          'BLUEPRINT-CJS'
        ],
      ]
    }
  }
};
