import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Docs from './editor-demo/App';

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Docs />
    </Fragment>
  </BrowserRouter>
);

export default App;
