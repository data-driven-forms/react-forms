/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer, { validatorTypes } from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';
// import sandboxSchema from './sandbox';
import DefaultSchemaError from '../src/parsers/schema-errors';

const intl = (name) => `translated ${name}`;

const actionMapper = {
  loadData: (data) => (...args) =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ custom: 'ererewr', ...data }), 1700);
    }),
  loadLabel: intl
};

const validatorMapper = {
  asyncValidator: (url, attributes) => (value, allValues) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (value === 'error') {
          reject('Async validation failed');
        }

        resolve('hola');
      }, 1700)
    )
};

const asyncValidatorSchema = {
  fields: [
    {
      component: 'text-field',
      name: 'async-validation-field',
      label: 'Async validation field',
      validate: [
        { type: 'asyncValidator' },
        { type: 'required-validator' },
        {
          type: validatorTypes.PATTERN_VALIDATOR,
          pattern: '^Foo$',
          flags: 'i'
        }
      ]
    }
  ]
};

const App = () => {
  // const [values, setValues] = useState({});
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        validatorMapper={validatorMapper}
        componentMapper={componentMapper}
        onSubmit={(values) => console.log(values)}
        schema={asyncValidatorSchema}
        FormTemplate={FormTemplate}
        actionMapper={actionMapper}
        schemaValidatorMapper={{
          actions: {
            loadLabel: (action, fieldName) => {
              if (typeof action[1] !== 'string') {
                throw new DefaultSchemaError(
                  `Second argument of loadLabel action has to be a string: ID of the text from the translated database. Error found in ${fieldName}`
                );
              }
            }
          }
        }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
