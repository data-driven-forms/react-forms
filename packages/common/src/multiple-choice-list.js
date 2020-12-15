import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import { formGroup } from './prop-types-templates';

const SingleCheckbox = (props) => {
  const { input, Checkbox, ...rest } = useFieldApi({ ...props, type: 'checkbox' });

  return <Checkbox {...input} {...rest} />;
};

const MultipleChoiceList = (props) => {
  const { Wrapper, Checkbox, label, isRequired, helperText, meta, input, options, isDisabled, isReadOnly, description, ...rest } = useFieldApi(props);

  const { error, touched, submitError } = meta;
  const showError = touched && (error || submitError);

  return (
    <Wrapper
      showError={showError}
      isRequired={isRequired}
      label={label}
      helperText={helperText}
      meta={meta}
      description={description}
      rest={rest}
      error={error || submitError}
      name={input.name}
    >
      {options.map((option) => (
        <SingleCheckbox
          Checkbox={Checkbox}
          aria-label={option['aria-label'] || option.label}
          {...rest}
          value={option.value}
          label={option.label}
          name={input.name}
          option={option}
          id={`${rest.id || input.name}-${option.value}`}
          key={`${rest.id || input.name}-${option.value}`}
          isDisabled={isDisabled || isReadOnly}
        />
      ))}
    </Wrapper>
  );
};

MultipleChoiceList.propTypes = {
  name: PropTypes.string.isRequired,
  Wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  Checkbox: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

export default MultipleChoiceList;

export const wrapperProps = {
  ...formGroup,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
