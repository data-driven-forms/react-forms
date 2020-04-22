import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../src/theme';
import Layout from '@docs/components/layout';
import { MDXProvider } from '@mdx-js/react';
import MdxComponents from '@docs/components/mdx/mdx-components';

import * as firebase from 'firebase/app';
import 'firebase/analytics';

import './vendor.css';

const firebaseConfig = {
  apiKey: 'AIzaSyCzgZec7zQPgVzJIxVtCnwD75Ky5y8r2sA',
  authDomain: 'data-driven-forms.firebaseapp.com',
  databaseURL: 'https://data-driven-forms.firebaseio.com',
  projectId: 'data-driven-forms',
  storageBucket: 'data-driven-forms.appspot.com',
  messagingSenderId: '640846042855',
  appId: '1:640846042855:web:9c313a3e6d5055ed'
};

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    firebase.initializeApp(firebaseConfig);
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
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MDXProvider components={MdxComponents}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MDXProvider>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}
