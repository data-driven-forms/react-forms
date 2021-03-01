import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useFieldApi, useFormApi, FieldArray as FieldArrayFF } from '@data-driven-forms/react-form-renderer';
import { createUseStyles } from 'react-jss';

import { Button, Intent, FormGroup } from '@blueprintjs/core';

import BlueprintContext from '../blueprint-context/blueprint-context';

const useStyles = createUseStyles({
  addContainer: {
    display: 'flex',
    flexFlow: 'row-reverse',
    marginBottom: 15
  },
  remove: {
    marginBottom: 15
  }
});

const ArrayItem = ({ remove, fields, name, removeLabel, ArrayItemProps, RemoveButtonProps, disabledRemove }) => {
  const formOptions = useFormApi();
  const { remove: removeCss } = useStyles();

  const editedFields = fields.map((field) => ({
    ...field,
    ...(field.name ? { name: `${name}.${field.name}` } : { name })
  }));

  return (
    <div {...ArrayItemProps}>
      {formOptions.renderForm(editedFields, formOptions)}
      <Button
        onClick={remove}
        intent={Intent.DANGER}
        disabled={disabledRemove}
        {...RemoveButtonProps}
        className={clsx(removeCss, RemoveButtonProps && RemoveButtonProps.className)}
      >
        {removeLabel}
      </Button>
    </div>
  );
};

ArrayItem.propTypes = {
  remove: PropTypes.func,
  fields: PropTypes.array,
  name: PropTypes.string,
  removeLabel: PropTypes.node,
  ArrayItemProps: PropTypes.object,
  RemoveButtonProps: PropTypes.object,
  disabledRemove: PropTypes.bool
};

const FieldArray = (props) => {
  const {
    defaultItem,
    fields,
    arrayValidator,
    label,
    description,
    buttonLabels,
    AddContainerProps,
    AddButtonProps,
    RemoveButtonProps,
    ArrayItemProps,
    FieldArrayProps,
    noItemsMessage,
    validateOnMount,
    meta,
    helperText,
    isRequired,
    FormGroupProps,
    maxItems,
    minItems
  } = useFieldApi(props);

  const { required } = useContext(BlueprintContext);

  const { addContainer } = useStyles();

  const { error, touched, submitError } = meta;
  const showError = (validateOnMount || touched) && (error || submitError);

  const text = showError ? error : helperText || description;

  const intent = showError && error && { intent: Intent.DANGER };
  const labelInfo = isRequired && { labelInfo: required };

  const combinedLabels = {
    add: 'Add',
    remove: 'Remove',
    ...buttonLabels
  };

  return (
    <FormGroup helperText={text} label={label} {...labelInfo} {...FormGroupProps} {...intent}>
      <FieldArrayFF name={props.name} validate={arrayValidator}>
        {(fieldArrayProps) => (
          <div {...FieldArrayProps}>
            {fieldArrayProps.fields.length === 0 && noItemsMessage}
            {fieldArrayProps.fields.map((name, index) => (
              <ArrayItem
                key={index}
                remove={() => fieldArrayProps.fields.remove(index)}
                name={name}
                fields={fields}
                removeLabel={combinedLabels.remove}
                ArrayItemProps={ArrayItemProps}
                RemoveButtonProps={RemoveButtonProps}
                disabledRemove={fieldArrayProps.fields.length <= minItems}
              />
            ))}
            <div {...AddContainerProps} className={clsx(addContainer, AddContainerProps && AddContainerProps.className)}>
              <Button
                onClick={() => fieldArrayProps.fields.push(defaultItem)}
                intent={Intent.SUCCESS}
                disabled={fieldArrayProps.fields.length >= maxItems}
                {...AddButtonProps}
              >
                {combinedLabels.add}
              </Button>
            </div>
          </div>
        )}
      </FieldArrayFF>
    </FormGroup>
  );
};

FieldArray.propTypes = {
  name: PropTypes.string,
  defaultItem: PropTypes.any,
  fields: PropTypes.array,
  label: PropTypes.node,
  description: PropTypes.node,
  buttonLabels: PropTypes.object,
  AddContainerProps: PropTypes.object,
  AddButtonProps: PropTypes.object,
  RemoveButtonProps: PropTypes.object,
  ArrayItemProps: PropTypes.object,
  FormGroupProps: PropTypes.object,
  FieldArrayProps: PropTypes.object,
  noItemsMessage: PropTypes.node,
  validateOnMount: PropTypes.bool,
  helperText: PropTypes.node,
  isRequired: PropTypes.bool,
  maxItems: PropTypes.number,
  minItems: PropTypes.number
};

FieldArray.defaultProps = {
  noItemsMessage: 'No items'
};

export default FieldArray;
