import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import Pf4DualListSelect from '@data-driven-forms/pf4-component-mapper/dist/cjs/dual-list-select';
import MuiDualListSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/dual-list-select';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';

const mappers = {
  pf4: {
    [componentTypes.DUAL_LIST_SELECT]: Pf4DualListSelect
  },
  pf3: {
    [componentTypes.DUAL_LIST_SELECT]: () => <h2>Not implemented</h2>
  },
  mui: {
    [componentTypes.DUAL_LIST_SELECT]: MuiDualListSelect
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
