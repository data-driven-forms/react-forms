import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import 'antd/dist/antd.css';
import './style.css';
import { componentMapper, FormTemplate } from '../src';
import wizardSchema from './demo-schemas/wizard-schema';

const style = {
  position: 'relative',
  width: '70%',
  margin: 'auto',
};

const App = () => (
  <div style={style}>
    <FormRenderer
      componentMapper={componentMapper}
      FormTemplate={(props) => <FormTemplate layout="vertical" {...props} />}
      onSubmit={console.log}
      schema={wizardSchema}
    />
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
