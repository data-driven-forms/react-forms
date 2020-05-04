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
      name: 'file-upload',
      type: 'file',
      label: 'file upload'
    }
  ]
};

const App = () => {
  // const [values, setValues] = useState({});
  return (
    <div style={{ padding: 20 }}>
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
