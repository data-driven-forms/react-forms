/* eslint-disable camelcase */
import React from 'react';
import ReactDOM from 'react-dom';
import FormRenderer from '../src';
import componentMapper from './form-fields-mapper';
import FormTemplate from './form-template';

const fileSchema = {
  fields: [
    {
      component: 'text-field',
      name: 'field1',
      label: 'Field1 (try "abc")',
    },
    {
      component: 'text-field',
      name: 'field2',
      label: 'Field2  (try "xyz")',
      hideField: true,
    },
    {
      component: 'text-field',
      name: 'field3',
      label: 'Field3 (try "123")',
    },
    {
      component: 'text-field',
      name: 'field4',
      label: 'Field4',
    },

    {
      component: 'text-field',
      name: 'field5',
      label: 'Field5',
      condition: {
        when: 'field1',
        is: 'cba',
      },
    },
  ],
  conditions: {
    cond1: {
      when: 'fieldx',
      is: 'abc',
      then: {
        field4: {
          disabled: true,
          set: 'New value for field4',
        },
        field3: {
          disabled: true,
        },
        field2: {
          visible: true,
        },
      },
    },
    cond2: {
      when: 'field3',
      is: '123',
      then: {
        field3: {
          visible: false,
        },
      },
    },
    cond3: {
      when: 'field2',
      is: 'xyz',
      then: {
        field3: {
          visible: false,
        },
      },
    },
  },
};

const App = () => {
  // const [values, setValues] = useState({});
  return (
    <div style={{padding: 20}}>
      <FormRenderer
        componentMapper={componentMapper}
        onSubmit={(values, ...args) => console.log(values, args)}
        FormTemplate={FormTemplate}
        schema={fileSchema}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
