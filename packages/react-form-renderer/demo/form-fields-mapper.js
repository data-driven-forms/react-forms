/* eslint-disable no-unused-vars */
import React from 'react';
import { componentTypes } from '../src';
import FieldProvider from '../src/field-provider';
import useFieldApi from '../src/use-field-api';

const TextField = (props) => (
  <FieldProvider
    {...props}
    render={({ input, meta, isVisible, label, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }) => {
      return (
        <div>
          <label>{label} &nbsp;</label>
          <input {...input} {...rest} />
          {meta.error && (
            <div>
              <span>{meta.error}</span>
            </div>
          )}
        </div>
      );
    }}
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

const AsyncComponent = (props) => {
  const { loadOptions, label } = useFieldApi(props);
  const [loaded, setLoaded] = React.useState(false);
  const [data, setData] = React.useState({ message: 'nodata' });

  React.useEffect(() => {
    if (loadOptions) {
      loadOptions()
        .then((data) => setData(data))
        .then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [loadOptions]);

  if (!loaded) {
    return 'loading....';
  }

  return (
    <React.Fragment>
      <h1>{label}</h1>
      {JSON.stringify(data, null, 2)}
    </React.Fragment>
  );
};

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: TextField,
  [componentTypes.SELECT]: SelectField,
  [componentTypes.CHECKBOX]: (props) => <div>checkbox</div>,
  [componentTypes.SUB_FORM]: (props) => <div>sub form</div>,
  [componentTypes.RADIO]: (props) => <div>radio</div>,
  [componentTypes.TABS]: (props) => <div>tabs</div>,
  [componentTypes.TAB_ITEM]: (props) => <div>tab item</div>,
  [componentTypes.DATE_PICKER]: (props) => <div>date picker</div>,
  [componentTypes.TIME_PICKER]: (props) => <div>time picker</div>,
  dataShower: AsyncComponent,
  'composite-mapper-field': {
    component: TextField,
    className: 'composite-component-class'
  }
};

export default mapper;
