import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';
import Layout from '@docs/components/layout';
import { MDXProvider } from '@mdx-js/react';
import MdxComponents from '@docs/components/mdx/mdx-components';

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Data driven forms</title>
        </Head>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <MDXProvider components={MdxComponents}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MDXProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </React.Fragment>
    );
  }
}
