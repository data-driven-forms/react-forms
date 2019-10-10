import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import sass from 'rollup-plugin-sass';
import async from 'rollup-plugin-async';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@patternfly/react-core': 'PatternflyReact',
  '@patternfly/react-icons': 'PatternflyReactIcons',
  '@data-driven-forms/react-form-renderer': '@data-driven-forms/react-form-renderer',
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
  },
};

export default [{
  input: './src/index.js',
  output: {
    file: './dist/index.js',
    format: 'umd',
    name: '@data-driven-forms/pf4-component-mapper',
    exports: 'named',
    globals,
  },
  external: Object.keys(globals),
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
