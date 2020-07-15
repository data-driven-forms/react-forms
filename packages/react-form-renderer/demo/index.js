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
      label: 'Field1',
      initialValue: '"abc" to trigger condition "cond1"',
      type: 'search',
    },
    {
      component: 'text-field',
      name: 'field2',
      label: 'Field2',
      initialValue: '"xyz" to trigger condition "cond1"',
      type: 'search',
      condition: {when: 'field2', is: 'aaa'},
    },
    {
      component: 'text-field',
      name: 'field3',
      label: 'Field3',
      initialValue: '"123" to trigger condition "cond2"',
      type: 'search',
    },
    {
      component: 'text-field',
      name: 'field4',
      label: 'Field4',
      initialValue: 'Visible when field3="aa" (old style condition)',
    },
  ],
  conditions: {
    cond1: {
      when: 'field1',
      is: 'abc',
      then: {
        field3: {
          disabled: true,
          set: 'New value for field3',
        },
        field4: {
          visible: false,
        },
      },
    },
    cond2: {
      when: 'field3',
      is: '123',
      then: {
        field1: {
          hidden: true,
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
