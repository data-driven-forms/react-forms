import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Radio = (props) => {
  const { labelText, disabled, input, options, FormGroupProps, helperText, meta, validateOnMount, ...rest } = useFieldApi(
    prepareProps({ type: 'radio', ...props })
  );

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  return (
    <FormGroup legendText={labelText} {...FormGroupProps}>
      <RadioButtonGroup {...input} valueSelected={input.value} disabled={disabled} {...rest}>
        {options.map((option) => (
          <RadioButton key={option.value} disabled={disabled} labelText={option.label} value={option.value} {...option} />
        ))}
      </RadioButtonGroup>
      <HelperTextBlock helperText={helperText} errorText={invalid} warnText={warnText} />
    </FormGroup>
  );
};

Radio.propTypes = {
  FormGroupProps: PropTypes.object,
  isDisabled: PropTypes.bool,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  )
};

export default Radio;
