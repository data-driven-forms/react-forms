import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceList from './multiple-choice-list';

import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { FormGroup } from '@patternfly/react-core/dist/js/components/Form/FormGroup';
import { Switch } from '@patternfly/react-core/dist/js/components/Switch/Switch';
import { TextArea } from '@patternfly/react-core/dist/js/components/TextArea/TextArea';
import { Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';
import { TextInput } from '@patternfly/react-core/dist/js/components/TextInput/TextInput';

import { componentTypes } from '@data-driven-forms/react-form-renderer';
import Select from './select/select';
import RadioGroup from './radio';
import PlainText from './plain-text';

const selectComponent = ({
  componentType,
  input,
  options,
  isReadOnly,
  isDisabled,
  FieldProvider,
  isVisible,
  onText,
  offText,
  formOptions,
  initialValue,
  ...rest
}) => ({
  [componentTypes.TEXT_FIELD]: () => (
    <TextInput
      { ...input }
      { ...rest }
      isReadOnly={ isReadOnly }
      isDisabled={ isDisabled }
    />
  ),
  [componentTypes.TEXTAREA_FIELD]: () => <TextArea disabled={ isDisabled || isReadOnly } { ...input } { ...rest } />,
  [componentTypes.SELECT_COMPONENT]: () => (
    <Select { ...input } { ...rest } options={ options } isDisabled={ isDisabled || isReadOnly } />
  ),
  [componentTypes.CHECKBOX]: () =>
    <Checkbox
      isChecked={ input.checked }
      { ...input }
      label={ rest.title || rest.label }
      aria-label={ rest.name }
      { ...rest }
      isDisabled={ isDisabled || isReadOnly }
    />,
  [componentTypes.RADIO]: () => (
    <RadioGroup
      options={ options }
      FieldProvider={ FieldProvider }
      isDisabled={ isDisabled }
      isReadOnly={ isReadOnly }
      input={ input }
      { ...rest }
    />),
  [componentTypes.SWITCH]: () => {
    const { isValid, ...newRest } = rest;
    return <Switch
      { ...newRest }
      { ...input }
      onChange={ (element, state) => input.onChange(state) }
      isChecked={ !!input.value }
      isDisabled={ isDisabled || isReadOnly }
      label={ onText || rest.label }
      labelOff={ offText || rest.label }
    />;},
})[componentType];

const FinalFormField = ({
  componentType,
  label,
  isRequired,
  helperText,
  meta,
  description,
  hideLabel,
  ...rest
}) => {
  const { error, touched } = meta;
  const showError = touched && error;
  return (
    <FormGroup
      isRequired={ isRequired }
      label={ !hideLabel && label }
      fieldId={ rest.id }
      isValid={ !showError }
      helperText={ helperText }
      helperTextInvalid={ meta.error }
    >
      { description && <TextContent><Text component={ TextVariants.small }>{ description }</Text></TextContent> }
      { selectComponent({ componentType, label, ...rest, isValid: !showError })() }
    </FormGroup>
  );
};

FinalFormField.propTypes = {
  componentType: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
};

FinalFormField.defaultProps = {
  isRequired: false,
  description: undefined,
};

const CheckboxGroupField = ({ options, ...rest }) =>
  (options ? <MultipleChoiceList { ...rest } options={ options } />
    : (
      <FinalFormField hideLabel={ !!rest.label } { ...rest }/>
    ));

const fieldMapper = type => ({
  [componentTypes.TEXT_FIELD]: FinalFormField,
  [componentTypes.SELECT_COMPONENT]: FinalFormField,
  [componentTypes.TEXTAREA_FIELD]: FinalFormField,
  [componentTypes.CHECKBOX]: CheckboxGroupField,
  [componentTypes.RADIO]: FinalFormField,
  [componentTypes.SWITCH]: FinalFormField,
})[type];

const FieldInterface = ({
  dataType,
  condition,
  componentType,
  initialKey,
  FieldArrayProvider, // catch it and don't send it to components
  FormSpyProvider, // eslint-disable-line react/prop-types
  ...props
}) => (
  fieldMapper(componentType)({
    ...props,
    componentType,
    id: props.id || props.name,
  })
);

FieldInterface.propTypes = {
  meta: PropTypes.object,
  condition: PropTypes.shape({
    when: PropTypes.string.isRequired,
    is: PropTypes.oneOfType([ PropTypes.array, PropTypes.string ]).isRequired,
  }),
  validate: PropTypes.oneOfType([ PropTypes.array, PropTypes.func ]),
  componentType: PropTypes.oneOf([
    componentTypes.RADIO,
    componentTypes.CHECKBOX,
    componentTypes.SELECT_COMPONENT,
    componentTypes.TEXTAREA_FIELD,
    componentTypes.TEXT_FIELD,
    componentTypes.DATE_PICKER,
    componentTypes.SWITCH,
  ]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  dataType: PropTypes.any,
  initialKey: PropTypes.any,
};

export const TextField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXT_FIELD } />;
export const TextAreaField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXTAREA_FIELD } />;
export const CheckboxField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.CHECKBOX } />;
export const RadioField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.RADIO } />;
export const SelectField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.SELECT_COMPONENT } />;
export const DatePickerField = props => <FieldInterface { ...props } name={ props.input.name } type="date" componentType={ componentTypes.TEXT_FIELD } />;
export const TimePickerField = props => <FieldInterface { ...props } name={ props.input.name } type="time" componentType={ componentTypes.TEXT_FIELD } />;
export const SwitchField = ({ FieldProvider, ...props }) =>
  <FieldProvider
    { ...props }
    render={ props => <FieldInterface { ...props } hideLabel={ true } name={ props.input.name } componentType={ componentTypes.SWITCH } /> }
  />;
export const PlainTextField = ({ label, name }) => <PlainText label={ label } name={ name } />;
