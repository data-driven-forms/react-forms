import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, HelpBlock, Checkbox, Radio as PfRadio, Col, FormGroup } from 'patternfly-react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { validationError } from './helpers';
import MultipleChoiceList from './multiple-choice-list';
import RequiredLabel from './required-label';
import Switch from './switch-field';
import { DateTimePicker } from './date-time-picker/date-time-picker';
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
  assignFieldProvider,
  initialValue,
  loadOptions,
  ...rest
}) => ({
  [componentTypes.TEXT_FIELD]: () =>
    <FormControl { ...input } placeholder={ placeholder } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } />,
  [componentTypes.TEXTAREA_FIELD]: () =>
    <FormControl { ...input } disabled={ isDisabled } readOnly={ isReadOnly } { ...rest } componentClass="textarea" placeholder={ placeholder }/>,
  [componentTypes.CHECKBOX]: () => <Checkbox { ...input } disabled={ isDisabled || isReadOnly }>{ !noCheckboxLabel && label }</Checkbox>,
  [componentTypes.RADIO]: () => options.map(option => (
    <FieldProvider
      key={ `${input.name}-${option.value}` }
      name={ input.name }
      value={ option.value }
      type="radio"
      formOptions={ formOptions }
      render={ ({ input }) => (
        <PfRadio { ...input } onChange={ () => { input.onChange(option.value); } } disabled={ isDisabled || isReadOnly }>{ option.label }</PfRadio>) }
    />
  )),
  [componentTypes.SELECT_COMPONENT]: () => <Select
    loadOptions={ loadOptions }
    options={ options }
    invalid={ invalid }
    input={ input }
    placeholder={ placeholder }
    rest={ rest }
    isSearchable={ isSearchable }
    isDisabled={ isDisabled }
    isReadOnly={ isReadOnly }
  />,
  [componentTypes.SWITCH]: () =>
    <Switch
      { ...rest }
      { ...input }
      isReadOnly={ isReadOnly }
      disabled={ isDisabled }
      checked={ input.value }
      onChange={ ({ target: { checked }}) => input.onChange(checked) }
    />,
  [componentTypes.DATE_PICKER]: () => <DateTimePicker onChange={ input.onChange } isDisabled={ isDisabled } { ...rest } />,
})[componentType];

const renderHelperText = (error, helperText) => (error // eslint-disable-line no-nested-ternary
  ? <HelpBlock>{ error }</HelpBlock>
  : helperText ? <HelpBlock>{ helperText }</HelpBlock> : null);

const FinalFormField = ({
  meta,
  validateOnMount,
  label,
  helperText,
  description,
  hideLabel,
  isVisible,
  ...rest
}) => {
  const invalid = validationError(meta, validateOnMount);
  return (
    <FormGroup validationState={ invalid ? 'error' : null }>
      { label &&
          <Col md={ hideLabel ? 0 : 2 } componentClass="label" className="control-label">
            { !hideLabel && (rest.isRequired ? <RequiredLabel label={ label } /> : label) }
          </Col> }
      <Col md={ !label ? 12 : 10 }>
        { selectComponent({ ...rest, invalid, label })() }
        { description && <HelpBlock style={{ color: '#767676' }}>{ description }</HelpBlock> }
        { renderHelperText(invalid && meta.error, helperText) }
      </Col>
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
