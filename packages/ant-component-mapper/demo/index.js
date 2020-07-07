/* eslint-disable */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import 'antd/dist/antd.css';
import './style.css';
import demoSchema from '@data-driven-forms/common/src/demoschema';
import { componentMapper, FormTemplate } from '../src';
import wizardSchema from './demo-schemas/wizard-schema';



const style = {
  position: 'relative',
  width:'70%',
  margin:'auto'
}

const App = () => (
  <div style={style}>
    <FormRenderer
      componentMapper={componentMapper}
      FormTemplate={(props) => <FormTemplate {...props} />}
      onSubmit={console.log}
      schema={demoSchema}
    />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
