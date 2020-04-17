/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer, { validatorTypes } from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';
// import sandboxSchema from './sandbox';
import DefaultSchemaError from '../src/files/schema-errors';

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

// eslint-disable-next-line no-unused-vars
const asyncValidatorSchema = {
  fields: [
    {
      component: 'composite-mapper-field',
      name: 'composite-field',
      label: 'Componsite field'
    },
    {
      component: 'text-field',
      name: 'async-validation-field',
      label: 'Async validation field',
      validate: [
        { type: 'asyncValidator' },
        { type: 'required' },
        {
          type: validatorTypes.PATTERN,
          pattern: '^Foo$',
          flags: 'i'
        }
      ]
    }
  ]
};

const conditionLogicDemo = {
  title: 'Testing Conditions',
  description: 'Write X in both',
  fields: [
    {
      name: 'text_box_1',
      label: 'Text Box 1',
      title: 'Text Box',
      component: 'text-field',
      clearOnUnmount: true,
      condition: {
        sequence: [
          { when: 'a', is: 'x', then: { visible: true, set: { password: 'defaultPassword' } }, else: { set: { password: 'no password' } } },
          { when: 'b', is: 'x', then: { visible: true, set: { text_box_1: 'defaultText' } } }
        ]
      }
    },
    {
      name: 'a',
      label: 'a',
      title: 'a',
      component: 'text-field'
    },
    {
      name: 'b',
      label: 'b',
      title: 'b',
      component: 'text-field'
    },
    {
      name: 'password',
      label: 'password',
      title: 'password',
      component: 'text-field'
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
        schema={conditionLogicDemo}
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
