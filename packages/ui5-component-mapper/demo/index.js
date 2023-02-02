import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import { arraySchemaDDF } from './demo-schemas/widget-schema';
import FormTemplate from '../src/form-template';
import componentMapper from '../src/component-mapper';
import { wizardSchema } from './demo-schemas/wizard-schema';
import sandboxSchema from './demo-schemas/sandbox';
import demoSchema from '../../../shared/demoschema';

import { ThemeProvider } from '@ui5/webcomponents-react';
import { Page, Title, Bar, Select, Option } from '@ui5/webcomponents-react';

import './index.css';

const simpleSchema = {
  title: 'title',
  description: 'description',
  fields: [
    {
      component: 'text-field',
      name: 'text-field-1674810975713',
      label: 'Name',
      helperText: 'Insert a name here',
      isRequired: true,
      validate: [
        {
          type: 'required',
        },
      ],
    },
    {
      component: 'text-field',
      name: 'text-field-1674810976903',
      label: 'Nickname',
    },
    {
      component: 'sub-form',
      name: 'sub-form-1674811011231',
      title: 'Sub form',
      fields: [
        {
          component: 'text-field',
          name: 'text-field-1674811014424',
          label: 'Number',
          type: 'Number',
          initialValue: '134',
        },
      ],
    },
  ],
};

const schemas = {
  simpleSchema,
  demoSchema,
  sandboxSchema,
  wizardSchema,
  arraySchemaDDF,
};

const App = () => {
  const [schema, setSchema] = useState('demoSchema');

  return (
    <Page
      backgroundDesign="Transparent"
      className="page"
      header={
        <Bar
          startContent={
            <Select name="schema" value={schema} onChange={(e) => setSchema(e.detail.selectedOption.value)} selectedOption={schema}>
              {Object.keys(schemas).map((key) => (
                <Option value={key} key={key}>
                  {key}
                </Option>
              ))}
            </Select>
          }
        >
          <Title>UI5-COMPONENT-MAPPER</Title>
        </Bar>
      }
    >
      <FormRenderer
        onSubmit={console.log}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} />}
        onCancel={console.log}
        schema={schemas[schema]}
      />
    </Page>
  );
};

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
