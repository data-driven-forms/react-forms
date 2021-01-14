/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer, useFieldApi, componentTypes, validatorTypes } from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';

// eslint-disable-next-line react/prop-types
const TextField = (props) => {
  const { input, label, isRequired } = useFieldApi(props);
  return (
    <div>
      <label>
        {label}
        {isRequired && '*'}
      </label>
      <input {...input} />
    </div>
  );
};

let key;

const fileSchema = {
  fields: [
    {
      component: 'text-field',
      name: 'required',
      label: 'required'
    },
    {
      component: 'text-field',
      name: 'field',
      label: 'field',
      resolveProps: (y, x, formOptions) => {
        const value = formOptions.getFieldState('required')?.value;

        //console.log({ value });

        if (value) {
          key = key || Date.now();

          return {
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            key
          };
        } else {
          key = undefined;
        }
      }
    }
  ]
};

const App = () => {
  // const [values, setValues] = useState({});
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer
        componentMapper={{
          ...componentMapper,
          [componentTypes.TEXT_FIELD]: TextField
        }}
        onSubmit={(values, ...args) => console.log(values, args)}
        FormTemplate={FormTemplate}
        schema={fileSchema}
        subscription={{ values: true }}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
