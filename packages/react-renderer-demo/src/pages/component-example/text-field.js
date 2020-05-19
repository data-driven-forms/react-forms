import React from 'react';
import GenericMuiComponent from '@docs/doc-components/text-field';
import ComponentText from '@docs/components/component-example-text';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import baseFieldProps from '../../helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      label: 'First name',
      name: 'first-name'
    }
  ]
};

const variants = [
  ...baseFieldProps,
  {
    name: 'placeholder',
    type: 'string'
  },
  {
    name: 'type',
    type: 'string'
  }
];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <ComponentText
      schema={schema}
      component={componentTypes.TEXT_FIELD}
      activeMapper={activeMapper}
      ContentText={GenericMuiComponent}
      variants={variants}
      linkText="Text Field"
    />
  );
};
