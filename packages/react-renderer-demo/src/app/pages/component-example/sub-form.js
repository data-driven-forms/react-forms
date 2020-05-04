import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiSubForm from '@data-driven-forms/mui-component-mapper/dist/cjs/sub-form';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const mappers = {
  mui: {
    [componentTypes.SUB_FORM]: MuiSubForm,
    [componentTypes.TEXT_FIELD]: MuiTextField
  }
};

export default () => {
  const [component, baseStructure] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />;
};
