import React from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';

import Pf4FieldArray from '@data-driven-forms/pf4-component-mapper/dist/cjs/field-array';
import MuiFieldArray from '@data-driven-forms/mui-component-mapper/dist/cjs/field-array';
import Pf4TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const mappers = {
  pf4: {
    [componentTypes.FIELD_ARRAY]: Pf4FieldArray,
    [componentTypes.TEXT_FIELD]: Pf4TextField
  },
  pf3: {
    [componentTypes.FIELD_ARRAY]: () => <h2>Not implemented</h2>,
    [componentTypes.TEXT_FIELD]: () => <h2>Not implemented</h2>
  },
  mui: {
    [componentTypes.FIELD_ARRAY]: MuiFieldArray,
    [componentTypes.TEXT_FIELD]: MuiTextField
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
