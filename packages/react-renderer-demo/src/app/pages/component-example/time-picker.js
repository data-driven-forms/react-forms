import React, { Fragment } from 'react';
import ComponentText from '@docs/components/component-example-text';
import TimePickerText from '@docs/doc-components/time-picker';
import useActiveMapper from '@docs/hooks/use-active-mapper';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import baseFieldProps from '../../src/helpers/base-field-props';

const schema = {
  fields: [
    {
      component: componentTypes.TIME_PICKER,
      label: 'Time Picker',
      name: 'time-picker'
    }
  ]
};
const variants = [...baseFieldProps];

export default () => {
  const activeMapper = useActiveMapper();
  return (
    <Fragment>
      <ComponentText
        activeMapper={activeMapper}
        component={componentTypes.TIME_PICKER}
        schema={schema}
        ContentText={TimePickerText}
        variants={variants}
        linkText="Time picker"
      />
      {activeMapper === 'mui' && <TimePickerText />}
    </Fragment>
  );
};
