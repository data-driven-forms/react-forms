const TerserPlugin = require('terser-webpack-plugin');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const path = require('path');
const withOffline = require('next-offline');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withOffline(
    withMDX({
      workboxOpts: {
        swDest: path.resolve(__dirname, '../public/service-worker.js'),
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'offlineCache',
              expiration: {
                maxEntries: 200,
              },
            },
          },
          {
            urlPattern: /\.(png|svg)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'imageCache',
              expiration: {
                maxEntries: 200,
              },
            },
          },
          {
            urlPattern: /data-driven-forms.firebaseio.com/,
            handler: 'NetworkFirst',
            options: {
              cacheableResponse: {
                statuses: [0, 200],
                headers: {
                  'x-test': 'true',
                },
              },
            },
          },
        ],
      },
      crossOrigin: 'anonymous',
      pageExtensions: ['js', 'jsx', 'md', 'mdx'],
      distDir: '../dist',
      webpack: (config, options) => {
        config.resolve.alias = {
          ...config.resolve.alias,
          react: path.resolve(__dirname, '../../../node_modules/react'),
          'react-dom': path.resolve(__dirname, '../../../node_modules/react-dom'),
          '@docs/doc-components': path.resolve(__dirname, './doc-components'),
          '@docs/components': path.resolve(__dirname, './components'),
          '@docs/pages': path.resolve(__dirname, './pages'),
          '@docs/examples': path.resolve(__dirname, './examples'),
          '@docs/code-example': path.resolve(__dirname, './components/code-example'),
          '@docs/hooks': path.resolve(__dirname, './hooks'),
          '@docs/doc-page': path.resolve(__dirname, './components/doc-page'),
          '@docs/component-mapper-bar': path.resolve(__dirname, './components/component-mapper-bar'),
        };

        config.optimization.minimizer = [
          new TerserPlugin({
            parallel: false,
            terserOptions: {
              keep_classnames: true, // eslint-disable-line camelcase
              keep_fnames: true, // eslint-disable-line camelcase
            },
          }),
        ];
        return config;
      },
    })
  )
);
