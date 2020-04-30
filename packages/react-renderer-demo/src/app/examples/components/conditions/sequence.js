import React from 'react';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

import TextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';
import FormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';

const schema = {
  title: 'Sequence condition',
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-1',
      label: 'What do you like?',
      helperText: 'Write dog or cat here.'
    },
    {
      component: componentTypes.TEXT_FIELD,
      name: 'field-2',
      label: 'What I like...',
      isDisabled: true,
      condition: {
        sequence: [
          { when: 'field-1', pattern: /^cat/i, then: { set: { 'field-2': 'I love cats!' } }, else: { visible: true } },
          { when: 'field-1', pattern: /^dog/i, then: { set: { 'field-2': 'I love dogs!' } }, else: { visible: true } },
          {
            when: 'field-1',
            notMatch: 'true',
            pattern: /^(cat|dog)/i,
            then: { set: { 'field-2': 'I love something else!' } },
            else: { visible: true }
          }
        ]
      }
    }
  ]
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField
};

const SequenceCondition = () => (
  <div className="pf4">
    <FormRenderer FormTemplate={FormTemplate} componentMapper={componentMapper} schema={schema} onSubmit={console.log} />
  </div>
);

export default SequenceCondition;
