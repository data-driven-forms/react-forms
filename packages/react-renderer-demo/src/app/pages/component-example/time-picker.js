import React from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4TimePicker from '@data-driven-forms/pf4-component-mapper/dist/cjs/time-picker';
import MuiTimePicker from '@data-driven-forms/mui-component-mapper/dist/cjs/time-picker';

const mappers = {
  pf4: {
    [componentTypes.TIME_PICKER]: Pf4TimePicker
  },
  pf3: {
    [componentTypes.TIME_PICKER]: () => <h2>Not implemented</h2>
  },
  mui: {
    [componentTypes.TIME_PICKER]: MuiTimePicker
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
