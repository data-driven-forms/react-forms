import React from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceList from './multiple-choice-list';
import {
  TextInput,
  FormSelect,
  Radio,
  FormSelectOption,
  Checkbox,
  TextArea,
  FormGroup,
  TextContent,
  Text,
  TextVariants,
  Switch,
} from '@patternfly/react-core';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

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
  assignFieldProvider,
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
    <FormSelect { ...input } { ...rest } isDisabled={ isDisabled || isReadOnly }>
      { options.map(props => (<FormSelectOption key={ props.value || props.label } { ...props } label={ props.label.toString() }/>)) }
    </FormSelect>
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
  [componentTypes.RADIO]: () => options.map(option => (
    <FieldProvider
      { ...rest }
      key={ `${input.name}-${option.value}` }
      name={ input.name }
      value={ option.value }
      type="radio"
      render={ ({ input }) => (
        <Radio { ...input }
          label={ option.label }
          id={ `${input.name}-${option.value}` }
          aria-label={ option.label }
          isDisabled={ isDisabled || isReadOnly }
          onChange={ () => { input.onChange(option.value); } } />) }
    />
  )),
  [componentTypes.SWITCH]: () => {
    const { isValid, ...newRest } = rest;
    return <Switch
      { ...newRest }
      { ...input }
      onChange={ (element, state) => input.onChange(state) }
      isChecked={ !!input.value }
      isDisabled={ isDisabled || isReadOnly }
      label={ rest.label }
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
