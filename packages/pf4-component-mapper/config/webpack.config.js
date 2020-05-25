const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;
const merge = require('webpack-merge');

const commonConfig = {
  devtool: "source-map",
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [ 'style-loader', 'css-loader', 'sass-loader', 'resolve-url-loader' ],
    }, {
      test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
      loader: 'url-loader',
    },
    ],
  },
};

const htmlPlugin = new HtmlWebPackPlugin({
  template: './demo/index.html',
  filename: './index.html',
});

const devConfig = {
  mode: 'development',
  entry: './demo/index.js',
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js',
  },
  devtool: 'source-map',
  plugins: [ htmlPlugin ],
};

const pfReactIcons = {
  commonjs: '@patternfly/react-icons',
  commonjs2: '@patternfly/react-icons',
  amd: '@patternfly/react-icons',
  root: 'PFReactIcons',
};

const pfReactCore = {
  commonjs: '@patternfly/react-core',
  commonjs2: '@patternfly/react-core',
  amd: '@patternfly/react-core',
  root: 'PFReactCore',
};

const externals = {
  '@patternfly/react-core': pfReactCore,
  '@patternfly/react-icons': pfReactIcons,
};

const prodConfig = {
  mode: 'development',
  entry: './src/index.js',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  output: {
    path: resolve('./dist'),
    library: '[name]',
    libraryTarget: 'umd',
    filename: 'index.js',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  externals,
};

module.exports = env => ({
  dev: merge(commonConfig, devConfig),
  prod: merge(commonConfig, prodConfig),
})[env];

