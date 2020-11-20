import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { createFilter } from 'rollup-pluginutils';
import sass from 'rollup-plugin-sass';
import async from 'rollup-plugin-async';
import sourcemaps from 'rollup-plugin-sourcemaps';

import glob from 'glob';
import path from 'path';

const outputPaths = glob.sync(path.resolve(__dirname, './src/files/*.js'));

const externals = createFilter(
  [
    'react',
    'react-dom',
    'prop-types',
    '@data-driven-forms/react-form-renderer',
    '@data-driven-forms/react-form-renderer/**',
    'carbon-components-react',
    'carbon-components-react/**',
    '@carbon/icons-react',
    '@carbon/icons-react/**'
  ],
  null,
  { resolve: false }
);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'prop-types': 'PropTypes',
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer',
  'carbon-components-react': 'carbon-components-react',
  '@carbon/icons-react': '@carbon/icons-react',
  'carbon-components-react/lib/components/StructuredList/StructuredList': 'carbon-components-react/lib/components/StructuredList/StructuredList',
  'carbon-components-react/lib/components/ProgressIndicator/ProgressIndicator':
    'carbon-components-react/lib/components/ProgressIndicator/ProgressIndicator'
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  configFile: './babel.config.js'
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
};

const plugins = [
  async(),
  nodeResolve(),
  babel(babelOptions),
  commonjs(commonjsOptions),
  nodeGlobals(),
  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  terser({
    keep_classnames: true,
    keep_fnames: true
  }),
  sass({
    insert: true
  }),
  sourcemaps()
];

export default {
  input: process.env.FORMAT === 'umd' ? './src/index.js' : ['./src/index.js', ...outputPaths],
  output: {
    ...(process.env.FORMAT === 'umd'
      ? {
          file: `./dist/umd/index.js`
        }
      : { dir: `./dist/${process.env.FORMAT}` }),
    name: '@data-driven-forms/carbon-component-mapper',
    exports: 'named',
    globals,
    sourcemap: true
  },
  external: externals,
  plugins
};
