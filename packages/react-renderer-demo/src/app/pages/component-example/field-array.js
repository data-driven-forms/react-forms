import React from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import MuiFieldArray from '@data-driven-forms/mui-component-mapper/dist/cjs/field-array';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const mappers = {
  mui: {
    [componentTypes.FIELD_ARRAY]: MuiFieldArray,
    [componentTypes.TEXT_FIELD]: MuiTextField
  }
};

export default () => {
  const [component, baseStructure] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />;
};
