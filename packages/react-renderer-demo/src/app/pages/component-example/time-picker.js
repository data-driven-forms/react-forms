import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiTimePicker from '@data-driven-forms/mui-component-mapper/dist/cjs/time-picker';
import TimePickerText from '@docs/components/mui-definitions/time-picker-text.md';

const mappers = {
  mui: {
    [componentTypes.TIME_PICKER]: MuiTimePicker
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers.mui} />
      {activeMapper === 'mui' && <TimePickerText />}
    </Fragment>
  );
};
