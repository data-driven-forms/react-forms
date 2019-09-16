import React, { lazy, Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

import Layout from './layout';
import renderers from './common/md-helper/mdx-components';
import NotFoundPage from './pages/not-found-page';
import './app.scss';
import MenuContext from './common/menu-renderer/menu-context';
import navSchema from './common/menu-renderer/schema-demo';
import findConnectedLinks from './common/menu-renderer/find-connected-links';

const FormRendererPage = lazy(() => import('./pages/form-renderer-page'));
const LandingPage = lazy(() => import('./pages/landing-page'));
const ShowCase = lazy(() => import('./pages/show-case'));
const ComponentExample = lazy(() => import('./common/example-common'));
const DocPage = lazy(() => import('./common/doc-page'));

const RendererDocPage = lazy(() => import('./common/component/renderer-doc-page'));

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

const PageLoadingIndicator = () => (
  <div style={{ height: 'calc(100vh - 96px)', display: 'flex', justifyContent: 'center' }}>
    <CircularProgress/>
  </div>
);

const App = ({ location: { pathname }}) => {
  const [ links, setLinks ] = useState({});
  const classes = useStyle();
  useEffect(() => {
    setLinks(findConnectedLinks(pathname, navSchema));
  }, [ pathname ]);
  return (
    <ThemeProvider theme={ theme }>
      <MDXProvider components={ renderers }>
        <MenuContext.Provider value={ links }>
          <Layout>
            <div className={ classes.containerFix }>
              <Suspense fallback={ <PageLoadingIndicator /> }>
                <Switch>
                  <Route exact path="/" component={ LandingPage } />
                  <div style={{ paddingTop: 86, paddingLeft: 32, paddingRight: 32 }}>
                    <CssBaseline />
                    <Switch>
                      <Route exact path="/show-case" component={ ShowCase } />
                      <Route exact path="/live-editor" component={ FormRendererPage } />
                      <Route exact path={ [ '/component-example/:component', '/component-example' ] } component={ ComponentExample } />
                      <Route exact path={ [ '/renderer/:component', '/renderer' ] } component={ RendererDocPage } />
                      <Route exact path="/others/:component" component={ DocPage } />
                      <Route component={ NotFoundPage } />
                    </Switch>
                  </div>
                </Switch>
              </Suspense>
            </div>
          </Layout>
        </MenuContext.Provider>
      </MDXProvider>
    </ThemeProvider>
  );
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(App);
