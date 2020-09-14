import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';

const Radio = (props) => {
  const { labelText, disabled, input, options, FormGroupProps, ...rest } = useFieldApi(prepareProps({ type: 'radio', ...props }));

  return (
    <FormGroup legendText={labelText} {...FormGroupProps}>
      <RadioButtonGroup {...input} valueSelected={input.value} disabled={disabled} {...rest}>
        {options.map((option) => (
          <RadioButton key={option.value} disabled={disabled} labelText={option.label} value={option.value} {...option} />
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
