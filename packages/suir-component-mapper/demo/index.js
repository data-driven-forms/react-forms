import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { componentMapper, FormTemplate } from '../src';
import demoSchema from '@data-driven-forms/common/src/demoschema';
import fieldArraySchema from './demo-schemas/field-array-schema';

import wizardSchema from './demo-schemas/wizard-schema';
import { Button } from 'semantic-ui-react';

const compositeMapper = {
  ...componentMapper,
  [componentTypes.SWITCH]: {
    component: componentMapper[componentTypes.SWITCH],
    FormControlLabelProps: {
      labelPlacement: 'end'
    }
  }
};

const schema = {
  fields: [
    {
      component: componentTypes.RADIO,
      label: 'Radio component',
      name: 'text-field-sss',
      isRequired: true,
      helperText: 'Helper text',
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' }
      ],
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    },
    {
      component: componentTypes.RADIO,
      label: 'Date picker component',
      name: 'text-field',
      isRequired: true,
      helperText: 'Helper text',
      options: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' }
      ],
      validate: [
        {
          type: validatorTypes.REQUIRED
        }
      ]
    }
  ]
};

const App = () => {
  const [, setSchema] = useState(wizardSchema);

  return (
    <div>
      <div container spacing={4} justify="center" alignItems="center">
        <div item xs={12}>
          <h3 variant="h3">Material UI component mapper</h3>
        </div>
        <div item xs={12}>
          <Button onClick={() => setSchema(demoSchema)}>Demo schema</Button>
          <Button onClick={() => setSchema(fieldArraySchema)}>Field array</Button>
          <Button onClick={() => setSchema(wizardSchema)}>Wizard</Button>
        </div>
        <div style={{ padding: 32 }}>
          <FormRenderer
            onSubmit={console.log}
            componentMapper={compositeMapper}
            FormTemplate={(props) => <FormTemplate {...props} />}
            schema={schema}
            onCancel={() => console.log('canceling')}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
