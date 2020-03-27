import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Textarea from '@data-driven-forms/pf4-component-mapper/dist/cjs/textarea';
import Pf3Textarea from '@data-driven-forms/pf3-component-mapper/dist/cjs/textarea';
import MuiTextarea from '@data-driven-forms/mui-component-mapper/dist/cjs/textarea';

const mappers = {
  pf4: {
    [componentTypes.TEXTAREA]: Pf4Textarea
  },
  pf3: {
    [componentTypes.TEXTAREA]: Pf3Textarea
  },
  mui: {
    [componentTypes.TEXTAREA]: MuiTextarea
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
