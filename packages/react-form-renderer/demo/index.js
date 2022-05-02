/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const schema = {
  title: 'Sequence condition',
  fields: [
    {
      component: 'text-field',
      name: 'field-1',
      label: 'first name',
    },
    {
      component: 'text-field',
      name: 'field-2',
      label: 'last name',
      condition: { when: 'field-1', is: 'pepa' },
    },
    {
      component: 'text-field',
      name: 'field-2',
      label: 'last name',
      condition: { when: 'field-1', is: 'pepa' },
    },
    {
      component: 'text-field',
      name: 'field-2',
      label: 'last name',
    },
  ],
};
const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        initialValues={{
          'field-1': 'steve',
          'field-2': 'jobs',
          'field-3': 'RETIRED',
        }}
        componentMapper={mapper}
        onSubmit={console.log}
        FormTemplate={FormTemplate}
        schema={schema}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
