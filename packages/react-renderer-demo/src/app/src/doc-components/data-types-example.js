import React, { useState } from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import dataTypes from '@data-driven-forms/react-form-renderer/dist/cjs/data-types';
import FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

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
    <div className="pf4">
      <FormRenderer
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

export default DataTypesExample;
