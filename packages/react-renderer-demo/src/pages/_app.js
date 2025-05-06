import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '@docs/components/layout';
import { MDXProvider } from '@mdx-js/react';
import MdxComponents from '@docs/components/mdx/mdx-components';
import { AppCacheProvider } from '@mui/material-nextjs/v15-pagesRouter';

import CookieModal from '../components/cookie-modal';
import theme from '../theme';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <AppCacheProvider {...props}>
      <Head>
        <title>Data driven forms</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MDXProvider components={MdxComponents}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
        <CookieModal />
      </ThemeProvider>
    </AppCacheProvider>
  );
}
