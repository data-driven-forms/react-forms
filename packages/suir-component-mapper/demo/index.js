import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import { componentMapper, FormTemplate } from '../src';
import demoSchema from '@data-driven-forms/common/src/demoschema';
import fieldArraySchema from './demo-schemas/field-array-schema';

import wizardSchema from './demo-schemas/wizard-schema';
import { Button } from 'semantic-ui-react';
import validatorTypes from '@data-driven-forms/react-form-renderer/dist/cjs/validator-types';

const compositeMapper = {
  ...componentMapper,
  [componentTypes.SWITCH]: {
    component: componentMapper[componentTypes.SWITCH]
  }
};

const dualSchema = {
  fields: [
    {
      component: componentTypes.DUAL_LIST_SELECT,
      name: 'dual-list',
      label: 'Dual list',
      isRquired: true,
      validate: [{ type: validatorTypes.REQUIRED }],
      options: [
        {
          value: 'cats',
          label: 'cats'
        },
        {
          value: 'cats_1',
          label: 'cats_1'
        },
        {
          value: 'cats_2',
          label: 'cats_2'
        },
        {
          value: 'zebras',
          label: 'zebras'
        },
        {
          value: 'pigeons',
          label: 'pigeons'
        }
      ]
    }
  ]
};

const App = () => {
  const [, setSchema] = useState(wizardSchema);

  return (
    <div>
      <div>
        <div>
          <h3>SUIR component mapper</h3>
        </div>
        <div>
          <Button onClick={() => setSchema(demoSchema)}>Demo schema</Button>
          <Button onClick={() => setSchema(fieldArraySchema)}>Field array</Button>
          <Button onClick={() => setSchema(wizardSchema)}>Wizard</Button>
        </div>
        <div style={{ padding: 32 }}>
          <FormRenderer
            onSubmit={console.log}
            componentMapper={compositeMapper}
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={true} />}
            schema={dualSchema}
            onCancel={() => console.log('canceling')}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
