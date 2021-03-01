import React, { useEffect } from 'react';
import { Slider as AntSlider } from 'antd';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../form-group';

const Slider = (props) => {
  const {
    input: { value, onChange, ...input },
    meta,
    label,
    validateOnMount,
    helperText,
    description,
    FormItemProps,
    isRequired,
    range,
    min = 0,
    max = 100,
    isDisabled,
    isReadOnly,
    ...rest
  } = useFieldApi(props);
  useEffect(() => {
    if (range === true && (!value || !Array.isArray(value))) {
      onChange([min, max]);
    }
  }, [min, max, range, value, onChange]);
  return (
    <FormGroup
      label={label}
      meta={meta}
      validateOnMount={validateOnMount}
      helperText={helperText}
      description={description}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
    >
      <AntSlider
        disabled={isDisabled || isReadOnly}
        onChange={onChange}
        {...input}
        value={range === true && !Array.isArray(value) ? [min, max] : value}
        range={range}
        min={min}
        max={max}
        {...rest}
      />
    </FormGroup>
  );
};

export default Slider;
