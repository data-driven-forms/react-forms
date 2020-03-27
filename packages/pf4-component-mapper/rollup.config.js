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

const pf4Externals = createFilter(
  [
    'react',
    'react-dom',
    'prop-types',
    '@data-driven-forms/react-form-renderer',
    '@data-driven-forms/react-form-renderer/**',
    '@patternfly/react-core',
    '@patternfly/react-core/**',
    '@patternfly/react-icons/**'
  ],
  null,
  { resolve: false }
);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@patternfly/react-core': '@patternfly/react-core',
  '@patternfly/react-icons': '@patternfly/react-icons',
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer'
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
    name: '@data-driven-forms/pf4-component-mapper',
    exports: 'named',
    globals,
    sourcemap: true
  },
  external: pf4Externals,
  plugins
};
