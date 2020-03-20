import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4SubForm from '@data-driven-forms/pf4-component-mapper/dist/cjs/sub-form';
import Pf3SubForm from '@data-driven-forms/pf3-component-mapper/dist/cjs/sub-form';
import MuiSubForm from '@data-driven-forms/mui-component-mapper/dist/cjs/sub-form';
import Pf4TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import Pf3TextField from '@data-driven-forms/pf3-component-mapper/dist/cjs/text-field';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const mappers = {
  pf4: {
    [componentTypes.SUB_FORM]: Pf4SubForm,
    [componentTypes.TEXT_FIELD]: Pf4TextField
  },
  pf3: {
    [componentTypes.SUB_FORM]: Pf3SubForm,
    [componentTypes.TEXT_FIELD]: Pf3TextField
  },
  mui: {
    [componentTypes.SUB_FORM]: MuiSubForm,
    [componentTypes.TEXT_FIELD]: MuiTextField
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
