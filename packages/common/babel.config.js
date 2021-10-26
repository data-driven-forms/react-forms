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
  TextArea: 'components/forms/textArea',
  Menu: 'components/menu/menu',
  ButtonGroup: 'components/button/buttonGroup',
  ControlGroup: 'components/forms/controlGroup'
};

const pascaltoCamelCase = (name) => name.charAt(0).toLowerCase() + name.slice(1);
const pascalToKebabCase = (name) =>
  name.charAt(0).toLowerCase() +
  name
    .slice(1)
    .replace(/([A-Z])/, '-$1')
    .toLowerCase();

const pascalToKebabCaseCarbonIcons = (name) =>
  name.charAt(0).toLowerCase() +
  name
    .slice(1)
    .replace(/([A-Z])/g, '--$1')
    .toLowerCase();

const createSuirCJSTransform = (env = 'commonjs') => [
  'transform-imports',
  {
    'semantic-ui-react': {
      transform: (importName) => {
        let res;
        const files = glob.sync(path.resolve(__dirname, `../{..,suir-component-mapper}/node_modules/semantic-ui-react/dist/${env}/**/${importName}.js`));

        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: false
    }
  },
  `semantic-ui-react-${env}`
];

const createMuiTransform = (env) => [
  'transform-imports',
  {
    '@mui/lab': {
      transform: (importName) => (env ? `@mui/lab/${env}/${importName}` : `@mui/lab/${importName}`),
      preventFullImport: false,
      skipDefaultConversion: false
    },
    '@mui/material': {
      transform: (importName) => (env ? `@mui/material/${env}/${importName}` : `@mui/material/${importName}`),
      preventFullImport: false,
      skipDefaultConversion: false
    }
  },
  `MUI-${env || 'commonjs'}`
];

const createPfReactTransform = (env) => [
  'transform-imports',
  {
    '@patternfly/react-core': {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../{..,pf4-component-mapper}//node_modules/@patternfly/react-core/dist/${env}/**/${mapper[importName] || importName}.js`)
        );
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: true
    },
    '@patternfly/react-icons': {
      transform: (importName) =>
        `@patternfly/react-icons/dist/${env}/icons/${importName
          .split(/(?=[A-Z])/)
          .join('-')
          .toLowerCase()}`,
      preventFullImport: true
    },
  },
  `pf-react-${env}`
];

const createBluePrintTransform = (env) => [
  'transform-imports',
  {
    '@blueprintjs/core': {
      transform: (importName) =>
        `@blueprintjs/core/lib/${env}/${blueprintMapper[importName] ||
          `components/${pascalToKebabCase(importName)}/${pascaltoCamelCase(importName)}`}.js`,
      preventFullImport: false,
      skipDefaultConversion: true
    }
  },
  `BLUEPRINT-${env}`
];

const createAntTransform = (env) => [
  'transform-imports',
  {
    antd: {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(
            __dirname,
            `../{..,ant-component-mapper}/node_modules/antd/${env === 'cjs' ? 'lib' : 'es'}/${importName
              .split(/(?=[A-Z])/)
              .join('-')
              .toLowerCase()}/index.js`
          )
        );
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      }
    }
  },
  `ant-${env}`
];

const carbonMapper = (importName) =>
  ({
    StructuredListWrapper: 'StructuredList',
    StructuredListBody: 'StructuredList',
    StructuredListRow: 'StructuredList',
    StructuredListCell: 'StructuredList',
    ProgressStep: 'ProgressIndicator'
  }[importName] || importName);

const createCarbonCJSTransform = (env) => [
  'transform-imports',
  {
    'carbon-components-react': {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../{..,carbon-component-mapper}/node_modules/carbon-components-react/${env === 'cjs' ? 'lib' : 'es'}/**/${carbonMapper(importName)}.js`)
        ).filter(path => !path.includes('/next/'));
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: false
    },
    'carbon-components-react/lib/components/StructuredList/StructuredList': {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../{..,carbon-component-mapper}/node_modules/carbon-components-react/${env === 'cjs' ? 'lib' : 'es'}/**/${carbonMapper(importName)}.js`)
        ).filter(path => !path.includes('/next/'));
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: true
    },
    'carbon-components-react/lib/components/ProgressIndicator/ProgressIndicator': {
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../{..,carbon-component-mapper}/node_modules/carbon-components-react/${env === 'cjs' ? 'lib' : 'es'}/**/${carbonMapper(importName)}.js`)
        ).filter(path => !path.includes('/next/'));
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: true
    },
    '@carbon/icons-react': {
      transform: (importName) => {
        let size = importName.match(/\d+/)[0];
        let iconName = pascalToKebabCaseCarbonIcons(importName.replace(/\d+/, ''));

        let res;
        const files = glob.sync(
          path.resolve(__dirname, `../{..,carbon-component-mapper}/node_modules/@carbon/icons-react/${env === 'cjs' ? 'lib' : 'es'}/${iconName}/${size}.js`)
        );
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(/^.*node_modules\//, '');
        res = res.replace(/^\//, '');
        return res;
      },
      preventFullImport: false,
      skipDefaultConversion: false
    }
  },
  `carbon-components-react-${env}`
];

const createReactJSSTransform = (env) => [
  'transform-imports',
  {
    'react-jss': {
      skipDefaultConversion: true,
      transform: (importName) => {
        let res;
        const files = glob.sync(
          path.resolve(
            __dirname,
            `../../node_modules/react-jss/dist/react-jss.${env}.js`
          )
        );
        if (files.length > 0) {
          res = files[0];
        } else {
          throw new Error(`File with importName ${importName} does not exist`);
        }

        res = res.replace(path.resolve(__dirname, '../../node_modules/'), '');
        res = res.replace(/^\//, '');
        return res;
      }
    }
  },
  `react-jss-${env}`
];

module.exports = {
  extends: '../../babel.config.js',
  env: {
    cjs: {
      presets: [['@babel/preset-env', { modules: 'commonjs' }]],
      plugins: [
        createSuirCJSTransform('commonjs'),
        createMuiTransform(),
        createPfReactTransform('js'),
        createBluePrintTransform('cjs'),
        createAntTransform('cjs'),
        createCarbonCJSTransform('cjs'),
        createReactJSSTransform('cjs')
      ]
    },
    esm: {
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: [
        createSuirCJSTransform('es'),
        createMuiTransform('esm'),
        createPfReactTransform('esm'),
        createBluePrintTransform('esm'),
        createAntTransform('esm'),
        createCarbonCJSTransform('esm'),
        createReactJSSTransform('esm')
      ]
    }
  }
};
