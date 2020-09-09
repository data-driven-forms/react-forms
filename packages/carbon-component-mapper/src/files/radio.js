import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';

import WithDescription from '../common/with-description';

const Radio = (props) => {
  const { label, labelText, input, isDisabled, options, FormGroupProps, helperText, description, ...rest } = useFieldApi({ type: 'radio', ...props });

  return (
    <FormGroup
      legendText={description ? <WithDescription labelText={labelText || label} description={description} /> : labelText || label}
      {...FormGroupProps}
    >
      <RadioButtonGroup {...input} valueSelected={input.value} disabled={isDisabled} {...rest}>
        {options.map((option) => (
          <RadioButton key={option.value} {...props} disabled={isDisabled} labelText={option.label} value={option.value} {...option} />
        ))}
      </RadioButtonGroup>
    </FormGroup>
  );
};

Radio.propTypes = {
  FormGroupProps: PropTypes.object,
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

export default Radio;
