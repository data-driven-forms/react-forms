import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import HomePage from './pages/home-page';
import Pf3Mapper from './pages/pf3-mapper';
import Pf4Mapper from './pages/pf4-mapper';
import EditorDemo from './editor-demo/App';

const Routes = () => (
  <Fragment>
    <Route exact path="/" component={ HomePage } />
    <Route exact path="/pf3-mapper" component={ Pf3Mapper } />
    <Route exact path="/pf4-mapper" component={ Pf4Mapper } />
    <Route path="/secret" component={ EditorDemo } />
  </Fragment>
);

export default Routes;
