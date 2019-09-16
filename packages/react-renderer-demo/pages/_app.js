import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '../src/components/layout';

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
        <ThemeProvider theme={ theme }>
          { /* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */ }
          <CssBaseline />
          <Layout>
            <Component { ...pageProps } />
          </Layout>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
