import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Typography from '@material-ui/core/Typography';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'condition-1',
      label: 'First condition',
      helperText: 'Type John to show conditional fields'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'dependent-1',
      label: 'Depends on "First condition" field value',
      helperText: 'Change "First condition" field value to hide this field and delete this field value from state',
      clearOnUnmount: true,
      condition: {
        when: 'condition-1',
        is: 'John'
      }
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'dependent-2',
      label: 'Depends on "First condition" field value',
      helperText: 'Change "First condition" field value to hide this field. When this field appears again it will preserve its previous value.',
      condition: {
        when: 'condition-1',
        is: 'John'
      }
    }
  ]
};

const ClearOnUnmount = () => {
  const [values, setValues] = useState({});
  return (
    <div>
      <FormRenderer
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

export default ClearOnUnmount;
