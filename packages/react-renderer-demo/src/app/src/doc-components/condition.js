import React from 'react';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';
import { layoutMapper, formFieldsMapper } from '@data-driven-forms/pf4-component-mapper';

const schema = {
  title: 'Example of conditions',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'field-1',
    label: 'Field 1',
    helperText: 'To show field 2 type a cat',
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'field-2',
    label: 'Field 2',
    helperText: 'To show field 3 type a cat as the second word',
    condition: {
      when: 'field-1',
      is: 'cat',
    },
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'field-3',
    label: 'Field 3',
    condition: {
      when: 'field-2',
      pattern: /^\w+ cat/,
    },
    initialValue: 'We all love cats!',
  }, {
    component: componentTypes.CHECKBOX,
    name: 'check-1',
    label: 'I want to be a true',
    condition: { when: 'field-3', isNotEmpty: true },
  }, {
    component: componentTypes.CHECKBOX,
    name: 'check-2',
    label: 'I also want to be true',
    condition: { when: 'field-3', isNotEmpty: true },
  }, {
    component: componentTypes.CHECKBOX,
    name: 'check-3',
    label: 'Hmmm, please, uncheck me.',
    condition: {
      and: [
        { when: 'check-1', is: true },
        { when: 'check-2', is: true },
      ],
    },
    initialValue: true,
  }, {
    component: componentTypes.PLAIN_TEXT,
    name: 'congrats!',
    label: 'You made it!',
    condition: {
      and: [
        { and: [
          { when: 'check-1', is: true },
          { when: 'check-2', is: true },
        ]},
        { not: { when: 'check-3', isNotEmpty: true }},
      ],
    },
  }],
};

const Condition = () => (
  <div className="pf4">
    <FormRenderer
      layoutMapper={ layoutMapper }
      formFieldsMapper={ formFieldsMapper }
      schema={ schema }
      onSubmit={ console.log }
      showFormControls={ false }
    />
  </div>
);

export default Condition;
