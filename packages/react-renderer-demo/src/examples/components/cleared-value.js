import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Typography from '@material-ui/core/Typography';

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
    <div>
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
        <Typography component="h3" variant="h5">
          Form values
        </Typography>
        <pre>{JSON.stringify(values, null, 2)}</pre>
      </div>
    </div>
  );
};

export default ClearedValueExample;
