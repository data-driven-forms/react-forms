import React, { useState } from 'react';
import FormRenderer, { componentTypes, dataTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';
import { Title } from '@patternfly/react-core';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'typed-number',
    label: 'Typed number',
    type: 'number',
    dataType: dataTypes.FLOAT,
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'untyped-number',
    label: 'Number withouth type',
    type: 'number',
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'string-as-number',
    label: 'String as number',
    type: 'string',
    dataType: dataTypes.INTEGER,
  }],
};

const DataTypesExample = () => {
  const [ values, setValues ] = useState({});
  return (
    <div className="pf4">
      <FormRenderer
        layoutMapper={ layoutMapper }
        formFieldsMapper={ formFieldsMapper }
        schema={ schema }
        onSubmit={ console.log }
        onStateUpdate={ ({ values }) => setValues(values) }
      />
      <div style={{ marginTop: 16 }}>
        <Title size="md">Form values</Title>
        <pre>
          { JSON.stringify(values, null, 2) }
        </pre>
      </div>
    </div>
  );};

export default DataTypesExample;
