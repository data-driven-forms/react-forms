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

const camelToSnake = (string) => {
  return string
    .replace(/[\w]([A-Z])/g, function(m) {
      return m[0] + '-' + m[1];
    })
    .toLowerCase();
};

module.exports = {
  extends: '../../babel.config.js',
  env: {
    cjs: {
      plugins: [
        [
          'transform-imports',
          {
            '@data-driven-forms/react-form-renderer': {
              transform: (importName) => `@data-driven-forms/react-form-renderer/dist/cjs/${camelToSnake(importName)}`,
              preventFullImport: true
            }
          },
          '@data-driven-forms/react-form-renderer-CJS'
        ],
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
        ]
      ]
    },
    esm: {
      plugins: [
        [
          'transform-imports',
          {
            '@data-driven-forms/react-form-renderer': {
              transform: (importName) => `@data-driven-forms/react-form-renderer/dist/esm/${camelToSnake(importName)}`,
              preventFullImport: true
            }
          },
          '@data-driven-forms/react-form-renderer-ESM'
        ],
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
        ]
      ]
    }
  }
};
