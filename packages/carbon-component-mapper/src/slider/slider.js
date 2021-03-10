import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Slider as CarbonSlider } from 'carbon-components-react';

import prepareProps from '../prepare-props';
import HelperTextBlock from '../helper-text-block/helper-text-block';

const Slider = (props) => {
  const { input, meta, isRequired, validateOnMount, helperText, WrapperProps, ...rest } = useFieldApi(prepareProps(props));

  const invalid = (meta.touched || validateOnMount) && (meta.error || meta.submitError);
  const warnText = (meta.touched || validateOnMount) && meta.warning;

  return (
    <div {...WrapperProps}>
      <CarbonSlider
        {...input}
        value={Number(input.value) || 0}
        key={input.name}
        id={input.name}
        invalid={Boolean(invalid)}
        min={0}
        max={100}
        required={isRequired}
        {...rest}
      />
      <HelperTextBlock helperText={helperText} errorText={invalid} warnText={warnText} />
    </div>
  );
};

Slider.propTypes = {
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  labelText: PropTypes.node,
  description: PropTypes.node,
  WrapperProps: PropTypes.object
};

export default Slider;
