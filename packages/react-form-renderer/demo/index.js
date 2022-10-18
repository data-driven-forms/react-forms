/* eslint-disable camelcase */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { FormRenderer } from '../src';

import FormTemplate from './form-template';
import mapper from './form-fields-mapper';

const schema = {
  title: 'Set action',
  fields: [
    {
      component: 'text-field',
      name: 'useDefaultNickName',
      label: 'Do you want to use default nickname?',
      description: 'set: {} is used to reset the setter',
    },
    {
      component: 'text-field',
      name: 'nickname',
      label: 'Nickname',
      condition: {
        when: 'useDefaultNickName',
        is: 'a',
        then: {
          set: (formState, getFieldState) => {
            return { nickname: formState.values.useDefaultNickName };
          },
        },
        else: { visible: true, set: {} },
      },
    },
  ],
};
const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <FormRenderer componentMapper={mapper} onSubmit={console.log} FormTemplate={FormTemplate} schema={schema} />
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
