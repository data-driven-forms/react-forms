const HtmlWebPackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;

const htmlPlugin = new HtmlWebPackPlugin({
  template: './demo/index.html',
  filename: './index.html'
});

const devConfig = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'dev.tsconfig.json'
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  mode: 'development',
  entry: resolve(__dirname, '../demo/index.tsx'),
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js'
  },
  plugins: [htmlPlugin],
};

module.exports = devConfig;
