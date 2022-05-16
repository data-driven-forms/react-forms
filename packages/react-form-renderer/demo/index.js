/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const asyncValidator = (val) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (!(val.length > 2 && val.length < 5)) {
        rej('Gimme more than 2 and less than 5');
      }

      res();
    }, 250);
  });

const largeSchema = {
  fields: [...Array(500)].map((_, index) => ({
    component: 'text-field',
    label: `Component No ${index}`,
    name: `text-field-${index}`,
    validate: [{ type: 'required' }, asyncValidator],
  })),
};

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
        validate={(values) => {
          if (values['text-field-0'] === 'foo') {
            return {
              'text-field-0': 'tot ne jako',
            };
          }
        }}
        onSubmit={console.log}
        FormTemplate={FormTemplate}
        schema={largeSchema}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
