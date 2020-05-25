const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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

const externals = [{
  react: {
    root: 'React',
    commonjs2: 'react',
    commonjs: [ 'react' ],
    amd: 'react',
  },
},
/@material-ui\/core\/.*/,
];

const prodConfig = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: resolve('./dist'),
    library: '[name]',
    libraryTarget: 'umd',
    filename: 'index.js',
  },
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
  externals,
};

const vendorConfig = {
  mode: 'production',
  entry: './src/vendor.js',
  output: {
    path: resolve('./vendor'),
    filename: 'vendor.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'resolve-url-loader' ],
      },  {
        test: /\.(png|jpg|gif|svg|woff|ttf|eot)/,
        loader: 'url-loader',
      },
    ],
  },
  plugins: [ new MiniCssExtractPlugin({ filename: 'vendor.css' }) ],
};

module.exports = prodConfig;

module.exports = env => ({
  dev: merge(commonConfig, devConfig),
  prod: merge(commonConfig, prodConfig),
  vendor: vendorConfig,
})[env];

