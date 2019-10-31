const withCSS = require('@zeit/next-css');
const resolve = require('resolve');
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});
const path = require('path');

module.exports = withMDX(withCSS({
  pageExtensions: [ 'js', 'jsx', 'md', 'mdx' ],
  distDir: '../../dist/functions/next',
  webpack: (config, options) => {
    const { dir, isServer } = options;
    config.externals = [];

    if (isServer) {
      config.externals.push((context, request, callback) => {
        resolve(
          request,
          { basedir: dir, preserveSymlinks: true },
          (err, res) => {
            if (err) {
              return callback();
            }

            // Next.js by default adds every module from node_modules to
            // externals on the server build. This brings some undesirable
            // behaviors because we can't use modules that require CSS files like
            // `former-kit-skin-pagarme`.
            //
            // The lines below blacklist webpack itself (that cannot be put on)
            if (
              res.match(/node_modules[/\\].*\.js/) &&
              !res.match(/node_modules[/\\]webpack/) &&
              !res.match(/node_modules[/\\]@patternfly\/react-core/) &&
              !res.match(/node_modules[/\\]@patternfly\/react-styles/) &&
              !res.match(/node_modules[/\\]@data-driven-forms/)
            ) {
              return callback(null, `commonjs ${request}`);
            }

            callback();
          }
        );
      });
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      '@docs/raw-component': path.resolve(__dirname, './src/components/common/raw-component'),
      '@docs/doc-components': path.resolve(__dirname, './src/doc-components'),
      '@docs/components': path.resolve(__dirname, './src/components'),
      '@docs/pages': path.resolve(__dirname, './pages'),
    };

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    return config;
  },
}));
