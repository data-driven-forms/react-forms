import React, { Fragment, memo } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import { useFormApi, FieldArray, componentTypes } from '@data-driven-forms/react-form-renderer';

import { Bullseye, FormHelperText, Grid, GridItem } from '@patternfly/react-core';

import { AddCircleOIcon, CloseIcon } from '@patternfly/react-icons';

import './final-form-array.css';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

const ArrayItem = memo(
  ({ fields, fieldIndex, name, remove, length, minItems }) => {
    const { renderForm } = useFormApi();

    const widths = {
      label: fields[0].label ? 5 : 0,
      field: fields[0].label ? 7 : 12,
    };

    const editedFields = fields.map((field, index) => {
      const computedName = field.name ? `${name}.${field.name}` : name;
      return { ...field, name: computedName, key: `${name}-${index}`, hideLabel: true };
    });

    return (
      <React.Fragment>
        <Grid>
          <GridItem sm={11}>
            <hr className="ddf-final-form-hr" />
          </GridItem>
        </Grid>
        <Grid>
          <GridItem sm={11}>
            {editedFields.map(({ condition, ...field }, index) =>
              renderForm([
                {
                  name: field.name,
                  component: componentTypes.FIELD_ARRAY_ITEM,
                  field,
                  index,
                  widths,
                  ...(condition && { condition }),
                },
              ])
            )}
          </GridItem>
          <GridItem sm={1}>
            {length > minItems && (
              <Bullseye>
                <CloseIcon onClick={() => remove(fieldIndex)} className="ddf-final-form-group-remove-icon" />
              </Bullseye>
            )}
            {length <= minItems && (
              <Bullseye>
                <CloseIcon className="ddf-final-form-group-remove-icon disabled" />
              </Bullseye>
            )}
          </GridItem>
        </Grid>
      </React.Fragment>
    );
  },
  ({ remove: _prevRemove, ...prev }, { remove: _nextRemove, ...next }) => isEqual(prev, next)
);

ArrayItem.propTypes = {
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  length: PropTypes.number,
  minItems: PropTypes.number,
};

const DynamicArray = ({ ...props }) => {
  const {
    arrayValidator,
    label,
    description,
    fields: formFields,
    defaultItem,
    meta,
    minItems,
    maxItems,
    noItemsMessage,
    ...rest
  } = useFieldApi(props);
  const { dirty, submitFailed, error, submitError } = meta;
  const isError = (dirty || submitFailed) && (error || submitError) && (typeof error === 'string' || typeof submitError === 'string');

  return (
    <FieldArray key={rest.input.name} name={rest.input.name} validate={arrayValidator}>
      {({ fields: { map, value = [], push, remove } }) => (
        <Fragment>
          {label && <GridItem sm={12}>{label}</GridItem>}
          {description && <GridItem sm={12}>{description}</GridItem>}
          {value.length <= 0 && (
            <Bullseye>
              <GridItem sm={12}>{noItemsMessage}</GridItem>
            </Bullseye>
          )}
          {map((name, index) => (
            <ArrayItem
              key={`${name}-${index}`}
              fields={formFields}
              name={name}
              fieldIndex={index}
              remove={remove}
              length={value.length}
              minItems={minItems}
            />
          ))}
          <Grid>
            <GridItem sm={11}>
              {isError && (
                <FormHelperText isHidden={false} isError={true}>
                  {error || submitError}
                </FormHelperText>
              )}
            </GridItem>
            <GridItem sm={1} className="final-form-array-add-container">
              {value.length < maxItems && (
                <Bullseye>
                  <AddCircleOIcon onClick={() => push(defaultItem)} className="ddf-final-form-group-add-icon" />
                </Bullseye>
              )}
              {value.length >= maxItems && (
                <Bullseye>
                  <AddCircleOIcon className="ddf-final-form-group-add-icon disabled" />
                </Bullseye>
              )}
            </GridItem>
          </Grid>
        </Fragment>
      )}
    </FieldArray>
  );
};

DynamicArray.propTypes = {
  label: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultItem: PropTypes.any,
  minItems: PropTypes.number,
  maxItems: PropTypes.number,
  noItemsMessage: PropTypes.node,
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added',
};

export default DynamicArray;
