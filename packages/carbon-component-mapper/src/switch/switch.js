import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Toggle } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Switch = (props) => {
  const { input, meta, onText, offText, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi({
    ...prepareProps(props),
    type: 'checkbox',
  });

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  const { checked, ...inputRest } = input;

  return (
    <div {...WrapperProps}>
      <Toggle {...inputRest} toggled={checked} key={input.name} id={input.name} labelA={offText} labelB={onText} {...rest} />
      <HelperTextBlock helperText={helperText} errorText={invalid} warnText={warnText} />
    </div>
  );
};

export default Switch;
