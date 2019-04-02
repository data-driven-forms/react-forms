import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LandingPage from './pages/landing-page';
import FormRendererPage from './pages/form-renderer-page';
import Navigation from './common/examples-nav';
import ComponentExample from './common/example-common';
import DocPage from './common/doc-page';
import ContributionPage from './pages/contribution';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import Link from '@material-ui/core/Link';
import GhIcon from './common/gh-svg-icon';

import './styles.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const App = () => (
  <MuiThemeProvider theme={ theme }>
    <div>
      <AppBar position="fixed" style={{ marginBottom: 64, zIndex: 2000 }}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            This documentation is still work in progress. Please report any bugs, mistakes, suggestions etc. to the demo GitHub repository.
          </Typography>
          <Link color="inherit" target="_blank" rel="noopener" href="https://github.com/data-driven-forms/react-renderer-demo">
            <IconButton color="inherit">
              <SvgIcon>
                <GhIcon />
              </SvgIcon>
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
    <div className="app-container">
      <div>
        <Navigation />
      </div>
      <div className="grow-1" style={{ margin: 16 }}>
        <Grid container spacing={ 16 }>
          <Grid item xs={ 12 }>
            <Switch>
              <Route exact path="/" component={ LandingPage } />
              <Route exact path="/live-editor" component={ FormRendererPage } />
              <Route exact path="/component-example/:component" component={ ComponentExample } />
              <Route exact path="/renderer/:component" component={ DocPage } />
              <Route exact path="/others/:component" component={ DocPage } />
              <Route exact path="/contribution" component={ ContributionPage } />
            </Switch>
          </Grid>
        </Grid>
      </div>
    </div>
  </MuiThemeProvider>
);

export default App;
