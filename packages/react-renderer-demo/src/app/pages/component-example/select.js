import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/select';

const mappers = {
  mui: {
    [componentTypes.SELECT]: MuiSelect
  }
};

export default () => {
  const [component, baseStructure] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />;
};
