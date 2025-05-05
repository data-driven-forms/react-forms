import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { FormGroup, RadioButtonGroup, RadioButton } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Radio = ({ component, ...props }) => {
  const { labelText, disabled, input, options, FormGroupProps, helperText, meta, validateOnMount, ...rest } = useFieldApi(prepareProps(props));

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

export default Radio;
