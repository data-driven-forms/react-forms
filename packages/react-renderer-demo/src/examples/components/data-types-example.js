import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import dataTypes from '@data-driven-forms/react-form-renderer/data-types';
import FormTemplate from '@data-driven-forms/mui-component-mapper/form-template';
import TextField from '@data-driven-forms/mui-component-mapper/text-field';
import Typography from '@material-ui/core/Typography';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'typed-number',
      label: 'Typed number',
      type: 'number',
      dataType: dataTypes.FLOAT
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'untyped-number',
      label: 'Number without type',
      type: 'number'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'string-as-number',
      label: 'String as number',
      type: 'string',
      dataType: dataTypes.INTEGER
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const DataTypesExample = () => {
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

export default DataTypesExample;
