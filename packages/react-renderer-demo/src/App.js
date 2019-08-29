import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import FormRendererPage from './pages/form-renderer-page';
import LandingPage from './pages/landing-page';
import ShowCase from './pages/show-case';
import ComponentExample from './common/example-common';
import DocPage from './common/doc-page';
import renderers from './common/md-helper/mdx-components';
import Layout from './layout';
import RendererDocPage from './common/component/renderer-doc-page';

import './app.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const useStyle = makeStyles(theme => ({
  containerFix: {
    maxWidth: '100vww',
  },
}));

const App = () => {
  const classes = useStyle();
  return (
    <ThemeProvider theme={ theme }>
      <MDXProvider components={ renderers }>
        <Layout>
          <div className={ classes.containerFix }>
            <Switch>
              <Route exact path="/" component={ LandingPage } />
              <div style={{ paddingTop: 86, paddingLeft: 32, paddingRight: 32 }}>
                <CssBaseline />
                <Route exact path="/show-case" component={ ShowCase } />
                <Route exact path="/live-editor" component={ FormRendererPage } />
                <Route exact path="/component-example/:component" component={ ComponentExample } />
                <Route exact path="/renderer/:component" component={ RendererDocPage } />
                <Route exact path="/others/:component" component={ DocPage } />
              </div>
            </Switch>
          </div>
        </Layout>
      </MDXProvider>
    </ThemeProvider>
  );};

export default App;
