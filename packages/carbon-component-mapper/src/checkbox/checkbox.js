import React from 'react';
import PropTypes from 'prop-types';
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

Wrapper.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  description: PropTypes.node,
  helperText: PropTypes.node,
  error: PropTypes.node,
  showError: PropTypes.bool,
  isRequired: PropTypes.bool
};

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

const SingleCheckboxInCommon = ({ label, isDisabled, id, ...props }) => <CarbonCheckbox id={id} labelText={label} disabled={isDisabled} />;

SingleCheckboxInCommon.propTypes = {
  label: PropTypes.node,
  input: PropTypes.object,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  WrapperProps: PropTypes.object
};

const Checkbox = ({ options, ...props }) =>
  options ? (
    <MultipleChoiceListCommon options={options} {...props} Wrapper={Wrapper} Checkbox={SingleCheckboxInCommon} />
  ) : (
    <SingleCheckbox {...props} />
  );

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node, value: PropTypes.any }))
};

export default Checkbox;
