import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import GenericMuiComponent from '@docs/doc-components/checkbox';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.CHECKBOX,
      label: 'Checkbox',
      name: 'checkbox'
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
        ContentText={GenericMuiComponent}
        variants={variants}
        linkText="Checkbox"
      />
    </Fragment>
  );
};
