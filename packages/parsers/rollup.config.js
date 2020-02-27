import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import async from 'rollup-plugin-async';
import { createFilter } from 'rollup-pluginutils';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

import glob from 'glob';
import path from 'path';

const outputPaths = glob.sync(path.resolve(__dirname, './src/parsers/*.js'));

const external = createFilter(
  [
    '@data-driven-forms/react-form-renderer',
    '@data-driven-forms/react-form-renderer/dist/cjs/**',
  ],
  null,
  { resolve: false }
);

const globals = {
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer'
};

const babelOptions = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  configFile: '../../babel.config.js'
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
  sourcemaps()
];

export default [
  ...['cjs', 'esm'].map((env) => ({
    input: ['./src/index.js', ...outputPaths],
    output: {
      dir: `./dist/${env}`,
      format: env,
      name: '@data-driven-forms/parsers',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external,
    plugins
  })),
  {
    input: './src/index.js',
    output: {
      file: `./dist/umd/index.js`,
      format: 'umd',
      name: '@data-driven-forms/parsers',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external,
    plugins
  }
];
