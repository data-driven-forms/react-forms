/* eslint-disable camelcase */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer, componentTypes } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const SHOWER_FIELD = 'shower_FIELD';
const INITIALIZED_FIELD = 'initialized_FIELD';
const SHOW_VALUE = 'show';

const INITIAL_VALUE = 'some initial value';
const NEW_VALUE = 'something different';
const NOT_SHOW_VALUE = 'bla'; 
const SCHEMA_INITIAL_VALUE = 'schema initial value';
const SET_INITIALIZE_ON_MOUNT = true

const formFields = (initializeOnMount = false, initialValue) => ({
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: SHOWER_FIELD,
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: INITIALIZED_FIELD,
      initializeOnMount,
      ...(initialValue ? { initialValue } : {}),
      condition: {
        when: SHOWER_FIELD,
        is: SHOW_VALUE,
      },
    },
  ],
});

const schema = formFields(SET_INITIALIZE_ON_MOUNT, SCHEMA_INITIAL_VALUE)
console.log({ schema })

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        conditionMapper={{
          nameFn: (name, _surname) => {
            return (value, _conditionConfig) => {
              return value === name;
            };
          },
        }}
        // initialValues={initialValues}
        componentMapper={mapper}
        onSubmit={console.log}
        FormTemplate={FormTemplate}
        schema={schema}
        // actionMapper={customActionMapper}
      />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
