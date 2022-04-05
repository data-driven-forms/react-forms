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
    },
    {
      component: 'text-field',
      name: 'field-3',
      label: 'occupation',
      condition: {
        sequence: [
          {
            and: [
              { when: 'field-1', is: 'james' },
              { when: 'field-2', is: 'bond' },
            ],
            then: { set: { 'field-3': 'SPY' } },
            else: { visible: true },
          },
          {
            and: [
              { when: 'field-1', is: 'steve' },
              { when: 'field-2', is: 'jobs' },
            ],
            then: { set: { 'field-3': 'CEO' } },
            else: { visible: true },
          },
        ],
      },
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
