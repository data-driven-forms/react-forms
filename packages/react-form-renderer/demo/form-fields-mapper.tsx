/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import React from 'react';
import { componentTypes, useFormApi, ComponentMapper } from '../src';
import FieldProvider from '../src/field-provider';
import useFieldApi, { BaseFieldProps } from '../src/use-field-api';

interface FieldProviderRenderProps {
  input: any;
  meta: any;
  isVisible: boolean;
  label?: string;
  helperText?: string;
  isRequired: boolean;
  dataType?: string;
  isDisabled: boolean;
  isReadOnly: boolean;
  [key: string]: any;
}

interface Option {
  label: string;
  value: any;
}

interface SelectFieldProps extends BaseFieldProps {
  options: Option[];
}

interface AsyncComponentProps extends BaseFieldProps {
  loadOptions?: () => Promise<any>;
}

interface SubFormProps extends BaseFieldProps {
  fields: any[];
  title?: string;
}

interface RadioOptionProps {
  name: string;
  option: Option;
}

interface RadioProps extends BaseFieldProps {
  options: Option[];
}

const TextField = (props: any) => (
  <FieldProvider
    {...props}
    render={({ input, meta, isVisible, label, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }: FieldProviderRenderProps) => {
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

const SelectField = (props: SelectFieldProps & any) => {
  const { input, meta } = useFieldApi(props);
  const { options, label, helperText, isRequired, dataType, isDisabled, isReadOnly, isVisible, ...rest } = props;
  return (
    <div>
      <label>{label} &nbsp;</label>
      <select {...input} {...rest}>
        {options.map(({ value, label }: Option) => (
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

const AsyncComponent = (props: BaseFieldProps<AsyncComponentProps>) => {
  const { input: _input, meta: _meta } = useFieldApi(props);
  const { loadOptions, label } = props;
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>({ message: 'nodata' });

  React.useEffect(() => {
    if (loadOptions) {
      loadOptions()
        .then((data: any) => setData(data))
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

const SubForm = ({ fields, title, ...props }: SubFormProps & any) => {
  const formOptions = useFormApi();
  return (
    <div>
      <h2>{title}</h2>
      <div>{formOptions.renderForm(fields)}</div>
    </div>
  );
};

const RadioOption = ({ name, option }: RadioOptionProps) => {
  const { input } = useFieldApi({
    name,
    type: 'radio',
    value: option.value,
    component: 'radio',
  });
  return (
    <div>
      <label htmlFor={option.label}>{option.label}</label>
      <input
        type="radio"
        {...input}
        id={option.label}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          input.onChange(option.value);
        }}
      />
    </div>
  );
};

const Radio = (props: BaseFieldProps<RadioProps>) => {
  const { name, label, options, input: _input, meta: _meta } = useFieldApi(props);
  return (
    <div>
      <fieldset>
        <legend>{label}</legend>
        {options.map(({ value, label }: Option) => {
          return <RadioOption key={value} option={{ value, label }} name={name} />;
        })}
      </fieldset>
    </div>
  );
};

const mapper: ComponentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: TextField,
  [componentTypes.SELECT]: SelectField,
  [componentTypes.CHECKBOX]: (props: any) => <div>checkbox</div>,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: (props: any) => <div>tabs</div>,
  [componentTypes.TAB_ITEM]: (props: any) => <div>tab item</div>,
  [componentTypes.DATE_PICKER]: (props: any) => <div>date picker</div>,
  [componentTypes.TIME_PICKER]: (props: any) => <div>time picker</div>,
  dataShower: AsyncComponent,
  'composite-mapper-field': {
    component: TextField,
    className: 'composite-component-class',
  },
};

export default mapper;
