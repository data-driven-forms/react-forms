import React, { useState } from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { componentMapper } from '@data-driven-forms/pf4-component-mapper';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

const schema = {
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'field-with-initial-value',
    label: 'Will be set to null when you delete value from input',
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'field-withouth-initial-value',
    label: 'Value will be undefined when field is empty',
  }],
};

const DataTypesExample = () => {
  const [ values, setValues ] = useState({});
  return (
    <div className="pf4">
      <FormRenderer
        initialValues={{
          'field-with-initial-value': 'Delete me!',
        }}
        clearedValue={ null }
        formTemplate={ formTemplate }
        componentMapper={ componentMapper }
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
