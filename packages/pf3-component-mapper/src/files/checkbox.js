import React from 'react';
import PropTypes from 'prop-types';
import { FieldLevelHelp, Checkbox as Pf3Checkbox } from 'patternfly-react';
import MultipleChoiceList from '../form-fields/multiple-choice-list';
import FormGroup from '../common/form-wrapper';
import RequiredLabel from '../form-fields/required-label';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const SingleCheckbox = (props) => {
  const { label, helperText, meta, description, input, isRequired, isReadOnly, isDisabled, inputAddon } = useFieldApi(props);
  return (
    <FormGroup hideLabel meta={meta} description={description} inputAddon={inputAddon}>
      <Pf3Checkbox {...input} disabled={isDisabled || isReadOnly}>
        {isRequired ? <RequiredLabel label={label} /> : label}
        {helperText && <FieldLevelHelp content={helperText} />}
      </Pf3Checkbox>
    </FormGroup>
  );
};

SingleCheckbox.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  isDisabled: PropTypes.bool,
  description: PropTypes.string
};

const Checkbox = ({ options, ...props }) => (options ? <MultipleChoiceList options={options} {...props} /> : <SingleCheckbox {...props} />);

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.any }))
};

export default Checkbox;
