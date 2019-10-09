import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
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
    './src/form-renderer/helpers': [ 'composeValidators' ],
  },
};

function onwarn(warning) {
  throw Error(warning.message);
}

export default [{
  onwarn,
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: '@data-driven-forms/react-form-renderer',
    exports: 'named',
    globals,
  },
  external: Object.keys(globals),
  plugins: [
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
  ],
}];
