import remarkGfm from 'remark-gfm';
import path from 'path';
import bundleAnalyzer from '@next/bundle-analyzer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer({
  crossOrigin: 'anonymous',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  distDir: '../dist',
  swcMinify: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            mdExtensions: [],
            mdxExtensions: ['.md', '.mdx'],
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkGfm],
          },
        },
      ],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      ...(process.env.DEPLOY === 'true'
        ? {
            '@emotion/react': path.resolve(__dirname, '../node_modules/@emotion/react'),
            '@emotion/server': path.resolve(__dirname, '../node_modules/@emotion/server'),
            '@emotion/styled': path.resolve(__dirname, '../node_modules/@emotion/styled'),
          }
        : {
            react: path.resolve(__dirname, '../../../node_modules/react'),
            'react-dom': path.resolve(__dirname, '../../../node_modules/react-dom'),
            '@emotion/react': path.resolve(__dirname, '../../../node_modules/@emotion/react'),
            '@emotion/server': path.resolve(__dirname, '../../../node_modules/@emotion/server'),
            '@emotion/styled': path.resolve(__dirname, '../../../node_modules/@emotion/styled'),
          }),

      '@docs/doc-components': path.resolve(__dirname, './doc-components'),
      '@docs/components': path.resolve(__dirname, './components'),
      '@docs/pages': path.resolve(__dirname, './pages'),
      '@docs/examples': path.resolve(__dirname, './examples'),
      '@docs/code-example': path.resolve(__dirname, './components/code-example'),
      '@docs/hooks': path.resolve(__dirname, './hooks'),
      '@docs/doc-page': path.resolve(__dirname, './components/doc-page'),
      '@docs/component-mapper-bar': path.resolve(__dirname, './components/component-mapper-bar'),
    };

    return config;
  },
});
