import React from 'react';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const SingleCheckbox = (props) => {
  const { input, Checkbox, ...rest } = useFieldApi({ ...props, type: 'checkbox' });

  return <Checkbox {...input} {...rest} />;
};

const MultipleChoiceList = (props) => {
  const { Wrapper, Checkbox, label, validateOnMount, isRequired, helperText, meta, input, options, isDisabled, isReadOnly, description, ...rest } =
    useFieldApi(props);

  const { error, touched, submitError } = meta;
  const showError = Boolean((touched || validateOnMount) && (error || submitError));

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

export default MultipleChoiceList;
