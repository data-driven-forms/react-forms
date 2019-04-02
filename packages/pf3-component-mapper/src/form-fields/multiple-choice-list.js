import React from 'react';
import RequiredLabel from './required-label';
import { Checkbox, Col, FormGroup } from 'patternfly-react';
import { composeValidators } from '@data-driven-forms/react-form-renderer';

const MultipleChoiceList = ({ validate, FieldProvider, ...props }) => (
  <FieldProvider { ...props } validate={ composeValidators(props.validate || []) }>
    { ({
      label,
      isRequired,
      helperText,
      meta,
      options,
      isDisabled,
      isReadOnly,
      ...rest
    }) => {
      const { error, touched } = meta;
      const showError = touched && error;
      const groupValues = rest.input.value;
      return (
        <FormGroup validationState={ showError ? 'error' : null }>
          <Col md={ 2 } componentClass="label" className="control-label">
            { (isRequired ? <RequiredLabel label={ label } /> : label) }
          </Col>
          <Col md={ 10 }>
            { options.map(option =>
              (<FieldProvider
                formOptions={rest.formOptions}
                id={ `${rest.id}-${option.value}` }
                key={ option.value }
                { ...option }
                name={ props.name }
                type="checkbox"
                render={ ({ input, meta, formOptions, componentType, ...rest }) => {
                  const indexValue = groupValues.indexOf(input.value);
                  return (
                    <Checkbox
                      aria-label={ option['aria-label'] || option.label }
                      { ...input }
                      { ...rest }
                      disabled={ isDisabled || isReadOnly }
                      onChange={ () => (indexValue === -1
                        ? input.onChange([ ...groupValues, input.value ])
                        : input.onChange([ ...groupValues.slice(0, indexValue), ...groupValues.slice(indexValue + 1) ])) }
                    >
                      { rest.label }
                    </Checkbox>
                  );
                } }
              />)) }
          </Col>
        </FormGroup>
      );
    } }
  </FieldProvider>
);

export default MultipleChoiceList;
