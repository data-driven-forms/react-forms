import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, HelpBlock, Checkbox, FormGroup, ControlLabel, InputGroup, FieldLevelHelp } from 'patternfly-react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { validationError } from './helpers';
import MultipleChoiceList from './multiple-choice-list';
import RequiredLabel from './required-label';
import Switch from './switch-field';
import { DateTimePicker } from './date-time-picker/date-time-picker';

import RagioGroup from './radio';
import Select from './select';

const selectComponent = ({
  componentType,
  input,
  options,
  isReadOnly,
  isDisabled,
  invalid,
  placeholder,
  isRequired,
  label,
  isSearchable,
  FieldProvider,
  labelText,
  formOptions,
  noCheckboxLabel,
  initialValue,
  loadOptions,
  meta,
  helperText,
  ...rest
}) => ({
  [componentTypes.TEXT_FIELD]: () =>
    <FormControl { ...input } placeholder={ placeholder } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } />,
  [componentTypes.TEXTAREA_FIELD]: () =>
    <FormControl { ...input } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } componentClass="textarea" placeholder={ placeholder }/>,
  [componentTypes.CHECKBOX]: () =>(<Checkbox { ...input } disabled={ isDisabled || isReadOnly }>
    { label }
    { helperText && <FieldLevelHelp content={ helperText } /> }
  </Checkbox>),
  [componentTypes.RADIO]: () => (
    <RagioGroup
      options={ options }
      FieldProvider={ FieldProvider }
      isDisabled={ isDisabled }
      isReadOnly={ isReadOnly }
      input={ input }
    />
  ),
  [componentTypes.SELECT_COMPONENT]: () => <div>
    <Select
      classNamePrefix="ddorg__pf3-component-mapper__select"
      loadOptions={ loadOptions }
      options={ options }
      invalid={ !!invalid }
      input={ input }
      placeholder={ placeholder }
      isSearchable={ isSearchable }
      isDisabled={ isDisabled }
      isReadOnly={ isReadOnly }
      { ...rest }
    />
  </div>,
  [componentTypes.SWITCH]: () =>
    <Switch
      { ...rest }
      { ...input }
      isReadOnly={ isReadOnly }
      disabled={ isDisabled }
      checked={ input.value }
      onChange={ ({ target: { checked }}) => input.onChange(checked) }
      formOptions={ formOptions }
    />,
  [componentTypes.DATE_PICKER]: () => <DateTimePicker pristine={ meta.pristine } onChange={ input.onChange } value={ input.value } isDisabled={ isDisabled } { ...rest } />,
})[componentType];

export const renderHelperText = (error, description) => (error // eslint-disable-line no-nested-ternary
  ? <HelpBlock>{ error }</HelpBlock>
  : description ? <HelpBlock>{ description }</HelpBlock> : null);

const renderInputGroup = (inputAddon, params, formOptions, { ...rest }) => {
  if (inputAddon) {
    return (
      <InputGroup>
        { inputAddon.before && inputAddon.before.fields && formOptions.renderForm(inputAddon.before.fields, rest) }
        { selectComponent({ ...rest, ...params })() }
        { inputAddon.after && inputAddon.after.fields && formOptions.renderForm(inputAddon.after.fields, rest) }
      </InputGroup>
    );
  }

  return (selectComponent({ ...rest, ...params })());
};

const FinalFormField = ({
  meta,
  validateOnMount,
  label,
  helperText,
  description,
  hideLabel,
  isVisible,
  inputAddon,
  noCheckboxLabel,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={ invalid ? 'error' : null }>
      { label && !hideLabel && !noCheckboxLabel &&
          <ControlLabel>
            { rest.isRequired ? <RequiredLabel label={ label } /> : label }
            { helperText && <FieldLevelHelp content={ helperText } /> }
          </ControlLabel> }
      { renderInputGroup(inputAddon, { invalid, label, meta, helperText }, rest.formOptions, rest) }
      { renderHelperText(invalid && meta.error, description) }
    </FormGroup>
  );
};

FinalFormField.propTypes = {
  meta: PropTypes.object,
  validateOnMount: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.string,
  description: PropTypes.string,
  hideLabel: PropTypes.bool,
  isVisible: PropTypes.bool,
  inputAddon: PropTypes.shape({ fields: PropTypes.array }),
  noCheckboxLabel: PropTypes.bool,
};

const CheckboxGroupField = ({ options, ...rest }) =>
  (options ? <MultipleChoiceList options={ options } { ...rest } />
    : (
      <FinalFormField { ...rest } noCheckboxLabel/>
    ));

const fieldMapper = type => ({
  [componentTypes.RADIO]: FinalFormField,
  [componentTypes.CHECKBOX]: CheckboxGroupField,
  [componentTypes.SELECT_COMPONENT]: FinalFormField,
  [componentTypes.TEXTAREA_FIELD]: FinalFormField,
  [componentTypes.TEXT_FIELD]: FinalFormField,
  [componentTypes.SWITCH]: FinalFormField,
  [componentTypes.DATE_PICKER]: FinalFormField,
})[type];

const FieldInterface = ({
  dataType,
  condition,
  componentType,
  initialKey,
  FieldArrayProvider, // eslint-disable-line
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
    componentTypes.SWITCH,
    componentTypes.DATE_PICKER,
  ]).isRequired,
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  dataType: PropTypes.any,
  initialKey: PropTypes.any,
};

export const TextField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXT_FIELD } />;
export const TextareaField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.TEXTAREA_FIELD } />;
export const SelectField = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.SELECT_COMPONENT } />;
export const Radio = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.RADIO } />;
export const CheckboxGroup = props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.CHECKBOX } />;
export const SwitchField = ({ FieldProvider, ...props }) =>
  <FieldProvider { ...props } render={ props => <FieldInterface { ...props } name={ props.input.name } componentType={ componentTypes.SWITCH } /> }/>;
export const DatePickerField = props =>
  <FieldInterface { ...props } name={ props.input.name } variant={ props.variant } componentType={ componentTypes.DATE_PICKER } />;
