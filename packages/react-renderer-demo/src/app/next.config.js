const TerserPlugin = require('terser-webpack-plugin');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
});
const path = require('path');
const withOffline = require('next-offline');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

module.exports = withBundleAnalyzer(
  withOffline(
    withMDX({
      crossOrigin: 'anonymous',
      pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      distDir: '../../dist/functions/next',
      webpack: (config, options) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          react: path.resolve(__dirname, '../../../../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../../../../node_modules/react-dom'),
          '@docs/doc-components': path.resolve(__dirname, './src/doc-components'),
          '@docs/components': path.resolve(__dirname, './src/components'),
          '@docs/pages': path.resolve(__dirname, './pages'),
          '@docs/examples': path.resolve(__dirname, './examples'),
          '@docs/list-of-contents': path.resolve(__dirname, './src/helpers/list-of-contents'),
          '@docs/code-example': path.resolve(__dirname, './src/components/code-example'),
          '@docs/hooks': path.resolve(__dirname, './src/hooks')
        };

        config.optimization.minimizer = [
          new TerserPlugin({
            cache: true,
            parallel: false,
            terserOptions: {
              keep_classnames: true, // eslint-disable-line camelcase
              keep_fnames: true // eslint-disable-line camelcase
            }
          })
        ];
        return config;
      }
    })
  )
);
