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
    component: componentMapper[componentTypes.SWITCH]
  }
};

const options = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'three' },
  { value: '4', label: 'Four' },
  { value: '5', label: 'Five' },
  { value: '6', label: 'Six' },
  { value: '7', label: 'Seven' },
  { value: '8', label: 'Eight' },
  { value: '9', label: 'Nine' },
  { value: '10', label: 'Ten' }
];

const loadOptions = (filter) =>
  new Promise((res) =>
    setTimeout(() => {
      if (!filter) {
        return res(options.slice(0, 2));
      }

      const result = options.filter(({ label }) => {
        return label.toLowerCase().includes(filter.toLowerCase());
      });
      return res(result);
    }, 1500)
  );

const schema = {
  fields: [
    {
      component: componentTypes.TABS,
      title: 'Sub form title',
      name: 'sub-form',
      description: 'Sub form description',
      fields: [
        {
          component: componentTypes.TAB_ITEM,
          name: 'tab-1',
          title: 'Tab 1',
          fields: [
            {
              component: componentTypes.TIME_PICKER,
              label: 'Select component',
              name: 'text-field-sss',
              isRequired: true,
              helperText: 'Helper text',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
        },
        {
          component: componentTypes.TAB_ITEM,
          name: 'tab-2',
          title: 'Tab 2',
          fields: [
            {
              component: componentTypes.SWITCH,
              label: 'Select component',
              name: 'text-field',
              isRequired: true,
              onText: 'On text',
              offText: 'Off text',
              helperText: 'Helper text',
              validate: [
                {
                  type: validatorTypes.REQUIRED
                }
              ]
            }
          ]
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
            FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
            schema={wizardSchema}
            onCancel={() => console.log('canceling')}
          />
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
