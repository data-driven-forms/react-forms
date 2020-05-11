import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '@docs/hooks/use-component-example';
import DatePickerText from '@docs/components/mui-definitions/date-picker-text.md';

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return (
    <Fragment>
      <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} />
      {activeMapper === 'mui' && <DatePickerText />}
    </Fragment>
  );
};
