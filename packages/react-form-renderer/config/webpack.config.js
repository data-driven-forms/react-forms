const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;
const merge = require('webpack-merge');

const commonConfig = {
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
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

const prodConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: resolve('./dist'),
    library: '[name]',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
};

module.exports = env => ({
  dev: merge(commonConfig, devConfig),
  prod: merge(commonConfig, prodConfig),
})[env];

