import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import glob from 'glob';
import path from 'path';
import sourcemaps from 'rollup-plugin-sourcemaps';

const outputPaths = [...glob.sync(path.resolve(__dirname, './src/files/!(*.d.ts)')), ...glob.sync(path.resolve(__dirname, './src/files/*.js'))];

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM'
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
    './src/form-renderer/helpers': ['composeValidators']
  }
};

function onwarn(warning) {
  throw Error(warning.message);
}

const plugins = [
  nodeResolve(),
  babel(babelOptions),
  commonjs(commonjsOptions),
  nodeGlobals(),
  replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  terser({
    keep_classnames: true,
    keep_fnames: true
  }),
  typescript({
    allowSyntheticDefaultImports: true
  }),
  sourcemaps()
];

export default [
  ...['cjs', 'esm'].map((env) => ({
    onwarn,
    input: ['./src/index.js', ...outputPaths],
    output: {
      dir: `./dist/${env}`,
      format: env,
      name: '@data-driven-forms/react-form-renderer',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external: Object.keys(globals),
    plugins
  })),
  {
    onwarn,
    input: './src/index.js',
    output: {
      file: `./dist/umd/index.js`,
      format: 'umd',
      name: '@data-driven-forms/react-form-renderer',
      exports: 'named',
      globals,
      sourcemap: true
    },
    external: Object.keys(globals),
    plugins
  }
];
