import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { formTemplate, componentMapper } from '@data-driven-forms/pf4-component-mapper';
const schema = {
  title: 'Start typing',
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'regexp-pattern',
    label: 'Regepx',
    helperText: 'Value must be equal to Foo',
    validate: [{
      type: validatorTypes.PATTERN_VALIDATOR,
      pattern: /^Foo$/i,
    }],
  }, {
    component: componentTypes.TEXT_FIELD,
    name: 'string-pattern',
    label: 'String pattern',
    helperText: 'Value must be equal to Foo',
    validate: [{
      type: validatorTypes.PATTERN_VALIDATOR,
      pattern: '^Foo$',
      flags: 'i',
    }],
  }],
};

const PatternValidators = () => (
  <div className="pf4">
    <FormRenderer
      formTemplate={ formTemplate }
      componentMapper={ componentMapper }
      schema={ schema }
      onSubmit={ console.log }
    />
  </div>
);

export default PatternValidators;

