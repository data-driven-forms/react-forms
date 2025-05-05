import React, { memo } from 'react';
import isEqual from 'lodash/isEqual';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { useFieldApi, useFormApi, FieldArray as FieldArrayFF } from '@data-driven-forms/react-form-renderer';

import { Button, FormGroup } from 'carbon-components-react';
import { AddAlt32, Subtract32 } from '@carbon/icons-react';

import prepareProps from '../prepare-props';

const useStyles = createUseStyles({
  add: {
    marginTop: 16,
  },
  addContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  remove: {
    marginTop: 8,
    marginBottom: 8,
  },
  formGroup: {
    '.bx--form__requirements': {
      color: '#da1e28',
    },
  },
});

const ArrayItem = memo(
  ({ remove, fields, name, removeText, buttonDisabled, RemoveButtonProps = {}, ArrayItemProps = {} }) => {
    const formOptions = useFormApi();
    const { remove: removeStyle } = useStyles();

    const editedFields = fields.map((field) => ({
      ...field,
      ...(field.name ? { name: `${name}.${field.name}` } : { name }),
    }));

    return (
      <div {...ArrayItemProps}>
        {formOptions.renderForm(editedFields, formOptions)}
        <Button
          disabled={buttonDisabled}
          renderIcon={Subtract32}
          id={`remove-${name}`}
          kind="danger"
          onClick={remove}
          {...RemoveButtonProps}
          className={clsx(removeStyle, RemoveButtonProps.className)}
        >
          {removeText}
        </Button>
      </div>
    );
  },
  ({ remove: _prevRemove, ...prev }, { remove: _nextRemove, ...next }) => isEqual(prev, next)
);

const FieldArray = (props) => {
  const {
    AddContainerProps = {},
    AddButtonProps = {},
    FormGroupProps = {},
    WrapperProps = {},
    ArrayItemProps = {},
    RemoveButtonProps = {},
    defaultItem,
    maxItems = Infinity,
    minItems = 0,
    fields,
    input,
    arrayValidator,
    labelText,
    buttonLabels,
    noItemsMessage = 'No items',
    meta,
    validateOnMount,
  } = useFieldApi(prepareProps(props));

  const { formGroup, addContainer, add } = useStyles();

  const buttonLabelsFinal = {
    add: 'Add',
    remove: 'Remove',
    ...buttonLabels,
  };

  const invalid = (meta.touched || validateOnMount) && !Array.isArray(meta.error) && (meta.error || meta.submitError);

  return (
    <FormGroup
      legendText={labelText || ''}
      invalid={Boolean(invalid)}
      message={Boolean(invalid)}
      messageText={invalid || ''}
      {...FormGroupProps}
      className={clsx(formGroup, FormGroupProps.className)}
    >
      <FieldArrayFF name={input.name} validate={arrayValidator}>
        {(fieldArrayProps) => (
          <div {...WrapperProps}>
            {fieldArrayProps.fields.length === 0 && noItemsMessage}
            {fieldArrayProps.fields.map((name, index) => (
              <ArrayItem
                removeText={buttonLabelsFinal.remove}
                key={index}
                remove={() => fieldArrayProps.fields.remove(index)}
                name={name}
                fields={fields}
                buttonDisabled={minItems >= fieldArrayProps.fields.length}
                ArrayItemProps={ArrayItemProps}
                RemoveButtonProps={RemoveButtonProps}
              />
            ))}
            <div {...AddContainerProps} className={clsx(addContainer, AddContainerProps.className)}>
              <Button
                disabled={fieldArrayProps.fields.length >= maxItems}
                renderIcon={AddAlt32}
                id={`add-${input.name}`}
                onClick={() => fieldArrayProps.fields.push(defaultItem)}
                {...AddButtonProps}
                className={clsx(add, AddButtonProps.className)}
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

export default FieldArray;
