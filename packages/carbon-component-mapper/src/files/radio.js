import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';

import prepareProps from '../common/prepare-props';
import HelperTextBlock from '../common/helper-text-block';

const Radio = (props) => {
  const { labelText, disabled, input, options, FormGroupProps, helperText, meta, validateOnMount, ...rest } = useFieldApi(
    prepareProps({ type: 'radio', ...props })
  );

  const invalid = (meta.touched || validateOnMount) && meta.error;

  return (
    <FormGroup legendText={labelText} {...FormGroupProps}>
      <RadioButtonGroup {...input} valueSelected={input.value} disabled={disabled} {...rest}>
        {options.map((option) => (
          <RadioButton key={option.value} disabled={disabled} labelText={option.label} value={option.value} {...option} />
        ))}
      </RadioButtonGroup>
      <HelperTextBlock helperText={helperText} errorText={invalid} />
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
