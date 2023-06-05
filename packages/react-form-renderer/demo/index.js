/* eslint-disable camelcase */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const schema = {
  fields: [
    {
      name: 'formRadio',
      label: 'SelectSubForm',
      component: 'radio',
      initializeOnMount: true,
      clearOnUnmount: true,
      options: [
        { label: 'form1', value: 'form1' },
        { label: 'form2', value: 'form2' },
      ],
    },
    {
      component: 'sub-form',
      name: 'subform1',
      condition: {
        when: 'formRadio',
        is: 'form1',
      },
      fields: [
        {
          name: 'txt1',
          label: 'Enter text',
          initializeOnMount: true,
          clearOnUnmount: true,
          component: 'text-field',
        },
        {
          name: 'radioBtn',
          label: 'Select',
          component: 'radio',
          initializeOnMount: true,
          clearOnUnmount: true,
          options: [
            { label: 'abc', value: 'abc' },
            { label: 'def', value: 'def' },
          ],
        },
        {
          name: 'txtField2',
          label: 'Radio1',
          initializeOnMount: true,
          clearOnUnmount: true,
          component: 'text-field',
          condition: {
            when: 'radioBtn',
            is: 'def',
          },
        },
      ],
    },
    {
      component: 'sub-form',
      title: 'Subform2',
      description: 'This is a subform',
      name: 'subform2',
      condition: {
        when: 'formRadio',
        is: 'form2',
      },
      fields: [
        {
          name: 'radioBtn2',
          label: 'Select',
          component: 'radio',
          initializeOnMount: true,
          clearOnUnmount: true,
          options: [
            { label: 'pqr', value: 'pqr' },
            { label: 'stu', value: 'stu' },
          ],
        },
        {
          name: 'txtField3',
          label: 'Radio1',
          initializeOnMount: true,
          clearOnUnmount: true,
          component: 'text-field',
          condition: {
            and: [
              {
                when: 'radioBtn2',
                is: 'stu',
              },
              {
                when: 'formRadio',
                is: 'form2',
              },
            ],
          },
        },
      ],
    },
  ],
};

const initialValues = {
  formRadio: 'form2',
  radioBtn2: 'stu',
  txtField3: 'data',
};

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer initialValues={initialValues} componentMapper={mapper} onSubmit={console.log} FormTemplate={FormTemplate} schema={schema} />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
