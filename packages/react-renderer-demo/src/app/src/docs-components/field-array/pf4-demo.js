import React, { useState } from 'react';
import FormRender, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'PF4 FieldArray',
  fields: [
    {
      component: componentTypes.FIELD_ARRAY,
      name: 'nicePeople',
      fieldKey: 'field_array',
      label: 'Nice people',
      description: 'This allow you to add nice people to the list dynamically',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        name: 'name',
        label: 'Name',
        placeholder: 'Borek',
        isRequired: true,
        validate: [{
          type: validatorTypes.REQUIRED,
        }],
      }, {
        component: componentTypes.TEXT_FIELD,
        name: 'lastName',
        label: 'Last Name',
        placeholder: 'Stavitel',
      }],
    },
    {
      component: componentTypes.FIELD_ARRAY,
      name: 'minItems',
      label: 'A list with a minimal number of items',
      validate: [{ type: validatorTypes.MIN_ITEMS_VALIDATOR, threshold: 3 }],
      fields: [{
        component: componentTypes.TEXT_FIELD,
        label: 'Item',
      }],
    },
    {
      component: componentTypes.FIELD_ARRAY,
      name: 'number',
      defaultItem: 5,
      label: 'Default value with initialValues set',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        label: 'Item',
        type: 'number',
      }],
    },
    {
      component: componentTypes.FIELD_ARRAY,
      name: 'minMax',
      minItems: 4,
      maxItems: 6,
      label: 'Min 4 item, max 6 items without validators',
      fields: [{
        component: componentTypes.TEXT_FIELD,
        isRequired: true,
        validate: [{
          type: validatorTypes.REQUIRED,
        }],
      }],
    },
  ],
};

const initialValues =  {
  number: [ 1, 2, 3, 4 ],
  minMax: [ null, null, null, null ],
};

const onSubmit = (values) => console.log(values);

const PF4FieldArray = () => {
  const [ values, setValues ] = useState(undefined);

  return (
    <div className="pf4">
      <FormRender
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        schema={ schema }
        onSubmit={ onSubmit }
        onStateUpdate={ ({ values }) => setValues(values) }
        initialValues={ initialValues }
      />
      <div style={{ marginTop: 16 }}>
        <h3>Form values</h3>
        <pre>
          { JSON.stringify(values, null, 2) }
        </pre>
      </div>
    </div>
  );
};

export default PF4FieldArray;
