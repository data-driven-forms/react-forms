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
import { Page, Title, Bar, Select, Option, Text } from '@ui5/webcomponents-react';

import './index.css';

const simpleSchema = {
  title: 'Registration form',
  description: 'description',
  fields: [
    {
      component: 'text-field',
      name: 'name',
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
      name: 'email',
      label: 'Email',
      type: 'Email',
      helperText: 'Put an email in correct format',
      isRequired: true,
      validate: [
        {
          type: 'required',
        },
      ],
    },
    {
      component: 'sub-form',
      name: 'sub-form',
      title: 'Password',
      fields: [
        {
          component: 'text-field',
          name: 'Password',
          label: 'Number',
          type: 'Password',
          initialValue: '134',
        },
      ],
    },
    {
      component: 'select',
      name: 'origin',
      label: 'Country of Origin',
      initialValue: 'US',
      validate: [{ type: 'required' }],
      isSearchable: true,
      isRequired: true,
      options: [
        {
          label: 'None',
          value: null,
        },
        {
          label: 'Czech Republic',
          value: 'CZ',
        },
        {
          label: 'Germany',
          value: 'GER',
        },
        {
          label: 'USA',
          value: 'US',
        },
      ],
    },
    {
      component: 'select',
      name: 'older',
      label: 'Are you older than 18 years?',
      initialValue: 'no',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
    },
    {
      component: 'select',
      name: 'hobbies',
      label: 'Hobbies',
      isMulti: true,
      initialValue: ['gaming'],
      clearedValue: [],
      options: [
        {
          label: 'Gaming',
          value: 'gaming',
        },
        {
          label: 'Movies',
          value: 'movies',
        },
        {
          label: 'Music',
          value: 'music',
        },
      ],
    },
    {
      component: 'select',
      name: 'async',
      label: 'City',
      options: [],
      isSearchable: true,
      loadOptions: () =>
        new Promise((res) =>
          setTimeout(
            () =>
              res([
                { value: 'first-option', label: 'First async option' },
                { value: 'second-option', label: 'Second async option' },
              ]),
            2500
          )
        ),
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
  const [schema, setSchema] = useState('simpleSchema');
  const [submit, setSubmit] = useState({});

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
      footer={
        <Text>
          <pre>{JSON.stringify(submit, null, 2)}</pre>
        </Text>
      }
    >
      <div style={{ paddingTop: 36 }}>
        <FormRenderer
          onSubmit={(values) => setSubmit(values)}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} />}
          onCancel={console.log}
          schema={schemas[schema]}
        />
      </div>
    </Page>
  );
};

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
