import React from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { useFieldApi, useFormApi, FieldArray as FieldArrayFF } from '@data-driven-forms/react-form-renderer';

const ArrayItem = memo(({ remove, fields, name }) => {
  const formOptions = useFormApi();

  const editedFields = fields.map((field) => ({
    ...field,
    ...(field.name ? { name: `${name}.${field.name}` } : { name })
  }));

  return (
    <div>
      {formOptions.renderForm(editedFields, formOptions)}
      <button onClick={remove}>Remove</button>
    </div>
  );
}, ({remove: _prevRemove, ...prev}, {remove: _nextRemove, ...next}) => isEqual(prev, next));

ArrayItem.propTypes = {
  remove: PropTypes.func,
  fields: PropTypes.array,
  name: PropTypes.string
};

const FieldArray = (props) => {
  const { itemDefault, fields, input, arrayValidator } = useFieldApi(props);

  return (
    <FieldArrayFF name={input.name} validate={arrayValidator}>
      {(fieldArrayProps) => (
        <div>
          {fieldArrayProps.fields.map((name, index) => (
            <ArrayItem key={index} remove={() => fieldArrayProps.fields.remove(index)} name={name} fields={fields} />
          ))}
          <button onClick={() => fieldArrayProps.fields.push(itemDefault)}>Add</button>
        </div>
      )}
    </FieldArrayFF>
  );
};

export default FieldArray;
