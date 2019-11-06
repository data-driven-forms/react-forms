import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem, Bullseye, FormHelperText } from '@patternfly/react-core';

import CloseIcon from '../../icons/close-icon';
import AddCircleOIcon from '../../icons/add-circle-o-icon';

import './final-form-array.scss';

const ArrayItem = ({
  fields,
  fieldIndex,
  name,
  remove,
  formOptions,
  length,
  minItems,
}) => {
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
        <GridItem sm= { 11 }>
          <hr className="ddf-final-form-hr" />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem sm={ 11 }>
          { editedFields.map((field, index) => (
            <Grid key={ `${field.label}-${index}` } className="ddf-final-form-array-grid">
              { widths.label > 0 &&
              <GridItem sm={ widths.label } key={ `${field.label}-${index}` }>
                <label htmlFor={ field.name }>{ field.label }{ field.isRequired && <span className='pf-c-form__label-required'>*</span> }</label>
              </GridItem> }
              <GridItem sm={ widths.field }>
                { formOptions.renderForm([ field ]) }
              </GridItem>
            </Grid>
          )) }
        </GridItem>
        <GridItem sm={ 1 }>
          { length > minItems &&
          <Bullseye>
            <CloseIcon onClick={ () => remove(fieldIndex) } className="ddf-final-form-group-remove-icon"/>
          </Bullseye> }
          { length <= minItems &&
          <Bullseye>
            <CloseIcon className="ddf-final-form-group-remove-icon disabled"/>
          </Bullseye> }
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

ArrayItem.propTypes = {
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  length: PropTypes.number,
  minItems: PropTypes.number,
};

const DynamicArray = ({
  arrayValidator,
  label,
  description,
  fields: formFields,
  defaultItem,
  formOptions,
  meta,
  FieldArrayProvider,
  minItems,
  maxItems,
  noItemsMessage,
  ...rest
}) => {
  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <FieldArrayProvider key={ rest.input.name } name={ rest.input.name } validate={ arrayValidator }>
      { ({ fields: { map, value = [], push, remove }}) => (
        <Fragment>
          { label && <GridItem sm={ 12 }>{ label }</GridItem> }
          { description && <GridItem sm={ 12 }>{ description }</GridItem> }
          { value.length <= 0 && <Bullseye>
            <GridItem sm={ 12 }>{ noItemsMessage }</GridItem>
          </Bullseye> }
          { map((name, index) => (
            <ArrayItem
              key={ `${name}-${index}` }
              fields={ formFields }
              name={ name }
              fieldIndex={ index }
              remove={ remove }
              formOptions={ formOptions }
              length={ value.length }
              minItems={ minItems }
            />)) }
          <Grid>
            <GridItem sm={ 11 }>{ isError && <FormHelperText isHidden={ false } isError={ true }>{ error }</FormHelperText> }</GridItem>
            <GridItem sm={ 1 } className="final-form-array-add-container">
              { value.length < maxItems &&
              <Bullseye>
                <AddCircleOIcon onClick={ () => push(defaultItem) } className="ddf-final-form-group-add-icon"/>
              </Bullseye> }
              { value.length >= maxItems &&
              <Bullseye>
                <AddCircleOIcon className="ddf-final-form-group-add-icon disabled"/>
              </Bullseye> }
            </GridItem>
          </Grid>
        </Fragment>
      ) }
    </FieldArrayProvider>);
};

DynamicArray.propTypes = {
  arrayValidator: PropTypes.func,
  label: PropTypes.node,
  description: PropTypes.node,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  defaultItem: PropTypes.any,
  minItems: PropTypes.number,
  maxItems: PropTypes.number,
  noItemsMessage: PropTypes.node,
  formOptions: PropTypes.shape({
    renderForm: PropTypes.func.isRequired,
  }).isRequired,
  FieldArrayProvider: PropTypes.node.isRequired,
  meta: PropTypes.object.isRequired,
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added',
};

export default DynamicArray;
