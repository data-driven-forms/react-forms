import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Datepicker from '@data-driven-forms/pf4-component-mapper/dist/cjs/date-picker';
import MuiDatepicker from '@data-driven-forms/mui-component-mapper/dist/cjs/date-picker';
import DatePickerText from '@docs/components/mui-definitions/date-picker-text.md';

import dynamic from 'next/dynamic';

const Pf3Datepicker = dynamic(import('@data-driven-forms/pf3-component-mapper/dist/cjs/date-picker'), {
  ssr: false
});

const mappers = {
  pf4: {
    [componentTypes.DATE_PICKER]: Pf4Datepicker
  },
  pf3: {
    [componentTypes.DATE_PICKER]: Pf3Datepicker
  },
  mui: {
    [componentTypes.DATE_PICKER]: MuiDatepicker
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />
      {activeMapper === 'mui' && <DatePickerText />}
    </Fragment>
  );
};
