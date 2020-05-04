import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiDatepicker from '@data-driven-forms/mui-component-mapper/dist/cjs/date-picker';
import DatePickerText from '@docs/components/mui-definitions/date-picker-text.md';

const mappers = {
  mui: {
    [componentTypes.DATE_PICKER]: MuiDatepicker
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />
      {activeMapper === 'mui' && <DatePickerText />}
    </Fragment>
  );
};
