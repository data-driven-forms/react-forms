/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        componentMapper={mapper}
        onSubmit={console.log}
        FormTemplate={FormTemplate}
        schema={{ fields: [{ component: 'text-field', name: 'text' }] }}
        subscription={{ pristine: false }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
