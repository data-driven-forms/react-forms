import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import MuiDualListSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/dual-list-select';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import useComponentExample from '@docs/hooks/use-component-example';

const mappers = {
  mui: {
    [componentTypes.DUAL_LIST_SELECT]: MuiDualListSelect
  }
};

export default () => {
  const [component, baseStructure] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />;
};
