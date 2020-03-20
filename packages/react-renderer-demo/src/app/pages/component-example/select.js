import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Select from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';
import Pf3Select from '@data-driven-forms/pf3-component-mapper/dist/cjs/select';
import MuiSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/select';

const mappers = {
  pf4: {
    [componentTypes.SELECT]: Pf4Select
  },
  pf3: {
    [componentTypes.SELECT]: Pf3Select
  },
  mui: {
    [componentTypes.SELECT]: MuiSelect
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
