import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi, useFormApi, FieldArray as FieldArrayFF } from '@data-driven-forms/react-form-renderer';

import { Button, FormGroup } from 'carbon-components-react';
import { AddAlt32, Subtract32 } from '@carbon/icons-react';

import './field-array.scss';

import prepareProps from '../common/prepare-props';

const ArrayItem = ({ remove, fields, name, removeText, buttonDisabled }) => {
  const formOptions = useFormApi();

  const editedFields = fields.map((field) => ({
    ...field,
    ...(field.name ? { name: `${name}.${field.name}` } : { name })
  }));

  return (
    <div>
      {formOptions.renderForm(editedFields, formOptions)}
      <Button
        disabled={buttonDisabled}
        renderIcon={Subtract32}
        id={`remove-${name}`}
        kind="danger"
        onClick={remove}
        className={'ddorg__carbon-field-array-remove'}
      >
        {removeText}
      </Button>
    </div>
  );
};

ArrayItem.propTypes = {
  remove: PropTypes.func,
  fields: PropTypes.array,
  name: PropTypes.string,
  removeText: PropTypes.node,
  buttonDisabled: PropTypes.bool
};

const FieldArray = (props) => {
  const { itemDefault, maxItems, minItems, fields, input, arrayValidator, labelText, buttonLabels, noItemsMessage, meta } = useFieldApi(
    prepareProps(props)
  );

  const buttonLabelsFinal = {
    add: 'Add',
    remove: 'Remove',
    ...buttonLabels
  };

  const invalid = meta.touched && meta.error && !Array.isArray(meta.error);

  return (
    <FormGroup
      legendText={labelText}
      invalid={Boolean(invalid)}
      message={Boolean(invalid)}
      messageText={invalid || ''}
      className={'ddorg__carbon-field-array-form-group'}
    >
      <FieldArrayFF name={input.name} validate={arrayValidator}>
        {(fieldArrayProps) => (
          <div>
            {fieldArrayProps.fields.length === 0 && noItemsMessage}
            {fieldArrayProps.fields.map((name, index) => (
              <ArrayItem
                removeText={buttonLabelsFinal.remove}
                key={index}
                remove={() => fieldArrayProps.fields.remove(index)}
                name={name}
                fields={fields}
                buttonDisabled={minItems >= fieldArrayProps.fields.length}
              />
            ))}
            <div className={'ddorg__carbon-field-array-add-container'}>
              <Button
                disabled={fieldArrayProps.fields.length >= maxItems}
                renderIcon={AddAlt32}
                id={`add-${input.name}`}
                onClick={() => fieldArrayProps.fields.push(itemDefault)}
                className={'ddorg__carbon-field-array-add'}
              >
                {buttonLabelsFinal.add}
              </Button>
            </div>
          </div>
        )}
      </FieldArrayFF>
    </FormGroup>
  );
};

FieldArray.propTypes = {
  noItemsMessage: PropTypes.node,
  maxItems: PropTypes.number,
  minItems: PropTypes.number
};

FieldArray.defaultProps = {
  noItemsMessage: 'No items',
  maxItems: Infinity,
  minItems: 0
};

export default FieldArray;
