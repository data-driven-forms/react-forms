import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import { createFilter } from 'rollup-pluginutils';
import sass from 'rollup-plugin-sass';
import async from 'rollup-plugin-async';

const muiExternals = createFilter([
  'react',
  'react-dom',
  'prop-types',
  '@data-driven-forms/react-form-renderer',
  '@material-ui/core/**',
  '@material-ui/styles/**',
  '@material-ui/icons/**',
], null, { resolve: false });

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer',
  '@material-ui/core': '@material-ui/core',
  '@material-ui/utils': '@material-ui/utils',
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  configFile: '../../babel.config.js',
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../react-form-renderer/dist/index.js': [ 'composeValidators' ],
    '../../node_modules/prop-types/index.js': [
      'elementType',
      'bool',
      'func',
      'object',
      'oneOfType',
      'element',
      'string',
      'number',
      'instanceOf',
      'oneOf',
      'arrayOf',
      'any',
      'shape',
      'node',
    ],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
      'isLazy',
      'isMemo',
      'isValidElementType',
    ],
  },
};

export default [{
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: '@data-driven-forms/mui-component-mapper',
    exports: 'named',
    globals,
  },
  external: muiExternals,
  plugins: [
    async(),
    nodeResolve(),
    babel(babelOptions),
    commonjs(commonjsOptions),
    nodeGlobals(), // Wait for https://github.com/cssinjs/jss/pull/893
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    sizeSnapshot({ snapshotPath: 'size-snapshot.json' }),
    terser({
      keep_classnames: true,
      keep_fnames: true,
    }),
    sass({
      insert: true,
    }),
  ],
}];
