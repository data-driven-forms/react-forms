const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;
const merge = require('webpack-merge');

const commonConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
};

const htmlPlugin = new HtmlWebPackPlugin({
  template: './demo/index.html',
  filename: './index.html'
});

const devConfig = {
  mode: 'development',
  entry: resolve(__dirname, '../demo/index.tsx'),
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js'
  },
  devtool: 'source-map',
  plugins: [htmlPlugin]
};

module.exports = (env) =>
  ({
    dev: merge(commonConfig, devConfig)
  }[env]);
