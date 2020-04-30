import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-with-initial-value',
      label: 'Will be set to null when you delete value from input'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-withouth-initial-value',
      label: 'Value will be undefined when field is empty'
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const ClearedValueExample = () => {
  const [values, setValues] = useState({});
  return (
    <div className="pf4">
      <FormRenderer
        initialValues={{
          'field-with-initial-value': 'Delete me!'
        }}
        clearedValue={null}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={schema}
        onSubmit={console.log}
        debug={({ values }) => setValues(values)}
      />
      <div style={{ marginTop: 16 }}>
        <Title size="md">Form values</Title>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ClearedValueExample;
