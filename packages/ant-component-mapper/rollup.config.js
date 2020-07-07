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

const outputPaths = glob.sync(path.resolve(__dirname, './src/components/*.js'));

const antExternals = createFilter(
  [
    'react',
    'react-dom',
    'prop-types',
    '@data-driven-forms/react-form-renderer',
    'antd/**'
  ],
  null,
  { resolve: false }
);

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer',
  'antd': 'antd'
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  configFile: '../../babel.config.js'
};

const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../react-form-renderer/dist/index.js': ['composeValidators'],
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
      'node'
    ],
    '../../node_modules/react-is/index.js': ['ForwardRef', 'isLazy', 'isMemo', 'isValidElementType']
  }
};

const plugins = [
  async(),
  nodeResolve(),
  commonjs(commonjsOptions),
  babel(babelOptions),
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

export default [
  ...['cjs', 'esm'].map((env) => ({
    input: ['./src/index.js', ...outputPaths],
    output: {
      dir: `./dist/${env}`,
      format: env,
      name: '@data-driven-forms/ant-component-mapper',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external: antExternals,
    plugins
  })),
  {
    input: './src/index.js',
    output: {
      file: `./dist/umd/index.js`,
      format: 'umd',
      name: '@data-driven-forms/ant-component-mapper',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external: antExternals,
    plugins
  }
];
