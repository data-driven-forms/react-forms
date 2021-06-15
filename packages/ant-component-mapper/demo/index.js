/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import { componentMapper, FormTemplate } from '../src';

import Playground from '../../../shared/playground';

const style = {
  position: 'relative',
  width:'70%',
  margin:'auto'
}

/* TODO:
  - pass all the related props to Playground
  - do the same for all other mappers
  */
const App = () => (
  <div style={style}>
    <Playground
      componentMapper={componentMapper}
      FormTemplate={(props) => <FormTemplate layout='vertical' {...props} />}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
