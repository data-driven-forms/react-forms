import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MUISlider from '@data-driven-forms/mui-component-mapper/dist/cjs/slider';

const mappers = {
  mui: {
    [componentTypes.SLIDER]: MUISlider
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
