/* eslint-disable no-unused-vars */
import React from 'react';
import { componentTypes } from '../src';
import FieldProvider from '../src/components/field-provider';
import useFieldApi from '../src/components/useFieldApi';

const TextField = (props) => (
  <FieldProvider
    {...props}
    render={({ input, meta, isVisible, label, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }) => (
      <div>
        <label>{label} &nbsp;</label>
        <input {...input} {...rest} />
        {meta.error && (
          <div>
            <span>{meta.error}</span>
          </div>
        )}
      </div>
    )}
  />
);

const SelectField = (props) => {
  const { isVisible, input, meta, label, helperText, isRequired, dataType, isDisabled, isReadOnly, options, ...rest } = useFieldApi(props);
  return (
    <div>
      <label>{label} &nbsp;</label>
      <select {...input} {...rest}>
        {options.map(({ value, label }) => (
          <option key={value || label} value={value}>
            {label}
          </option>
        ))}
      </select>
      {meta.error && (
        <div>
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextField,
  [componentTypes.SELECT_COMPONENT]: SelectField,
  [componentTypes.CHECKBOX]: (props) => <div>checkbox</div>,
  [componentTypes.SUB_FORM]: (props) => <div>sub form</div>,
  [componentTypes.RADIO]: (props) => <div>radio</div>,
  [componentTypes.TABS]: (props) => <div>tabs</div>,
  [componentTypes.TAB_ITEM]: (props) => <div>tab item</div>,
  [componentTypes.DATE_PICKER]: (props) => <div>date picker</div>,
  [componentTypes.TIME_PICKER]: (props) => <div>time picker</div>
};

export default mapper;
