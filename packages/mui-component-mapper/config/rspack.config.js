//@ts-check

const { defineConfig } = require('@rspack/cli');
const { HtmlRspackPlugin, DefinePlugin, ProvidePlugin } = require('@rspack/core');
const resolve = require('path').resolve;

module.exports = defineConfig({
  mode: 'development',
  entry: { app: resolve('./demo/index.tsx') },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js'
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './demo/index.html',
      filename: './index.html'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new ProvidePlugin({
      process: 'process/browser.js'
    })
  ],
  devServer: {
    port: 8003, // Keep original MUI demo port
    hot: true,
    open: true,
  },
  module: {
    rules: [
      // TypeScript files with ts-loader for proper config support
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.demo.json'
          }
        },
      },
      // JavaScript files (if any remain)
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            sourceMap: true,
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
      // CSS/SCSS - using RSpack built-in support
      {
        test: /\.css$/,
        type: 'css'
      },
      {
        test: /\.(sa|sc)ss$/,
        use: ['sass-loader'],
        type: 'css'
      },
      // Assets
      {
        test: /\.(png|jpg|gif|svg|woff|ttf|eot)$/,
        type: 'asset/resource'
      },
    ]
  },
  experiments: {
    css: true,
  }
});