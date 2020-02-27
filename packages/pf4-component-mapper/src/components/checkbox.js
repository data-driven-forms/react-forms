import React from 'react';
import PropTypes from 'prop-types';
// import MultipleChoiceList from '../common/multiple-choice-list';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../common/form-group';
import { Checkbox as Pf4Checkbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';

const SingleCheckbox = (props) => {
  const { label, isRequired, helperText, meta, description, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);
  return (
    <FormGroup isRequired={isRequired} helperText={helperText} meta={meta} description={description} hideLabel id={id || input.name}>
      <Pf4Checkbox
        isChecked={input.checked}
        {...input}
        id={id || input.name}
        label={label}
        aria-label={rest.name}
        {...rest}
        isDisabled={isDisabled || isReadOnly}
      />
    </FormGroup>
  );
};

SingleCheckbox.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool
  }).isRequired,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

const Checkbox = ({ options, ...props }) => {
  /**
   * ignore multiple choice list for now
   * <MultipleChoiceList options={options} {...props} />
   */
  return <SingleCheckbox {...props} />;
};

Checkbox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string }))
};

export default Checkbox;
