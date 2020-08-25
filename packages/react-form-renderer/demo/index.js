/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer, { useFieldApi, validatorTypes, componentTypes } from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';

// eslint-disable-next-line react/prop-types
const TextField = ({ name, label }) => {
  const { input } = useFieldApi({ name, validate: [{ type: validatorTypes.REQUIRED }] });
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};

const fileSchema = {
  fields: [
    {
      component: 'text-field',
      name: 'foo',
      label: 'Foo'
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
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
