import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import CheckboxText from '@docs/doc-components/checkbox';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.CHECKBOX,
      label: 'Checkbox',
      name: 'checkbox',
      options: [
        { label: 'Dog', value: '1' },
        { label: 'Cats', value: '2' },
        { label: 'Hamsters', value: '3' }
      ]
    }
  ]
};
const variants = [
  ...baseFieldProps,
  {
    name: 'options',
    type: 'array',
    required: false
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.CHECKBOX}
        schema={schema}
        ContentText={CheckboxText}
        variants={variants}
        linkText="Checkbox multiple"
      />
    </Fragment>
  );
};
