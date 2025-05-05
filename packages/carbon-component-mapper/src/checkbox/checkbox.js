import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import MultipleChoiceListCommon from '@data-driven-forms/common/multiple-choice-list';

import { Checkbox as CarbonCheckbox, FormGroup } from 'carbon-components-react';

import WithDescription from '../with-description';
import prepareProps, { buildLabel } from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Wrapper = ({ label, description, children, helperText, error, showError, isRequired }) => (
  <FormGroup
    legendText={description ? <WithDescription labelText={buildLabel(label, isRequired)} description={description} /> : buildLabel(label, isRequired)}
  >
    {children}
    <HelperTextBlock helperText={helperText} errorText={showError && error} />
  </FormGroup>
);

const SingleCheckbox = (props) => {
  const { input, meta, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi(prepareProps({ ...props, type: 'checkbox' }));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);

  const warnText = (meta.touched || validateOnMount) && meta.warning;

  return (
    <div {...WrapperProps}>
      <CarbonCheckbox {...input} id={input.name} {...rest} />
      <HelperTextBlock helperText={helperText} errorText={invalid} warnText={warnText} />
    </div>
  );
};

const SingleCheckboxInCommon = ({ label, isDisabled, id, meta, option: { value, name, ...rest }, onChange, ...props }) => (
  <CarbonCheckbox id={id} labelText={label} disabled={isDisabled} {...props} {...rest} onChange={(_value, _name, event) => onChange(event)} />
);

const Checkbox = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

export default Checkbox;
