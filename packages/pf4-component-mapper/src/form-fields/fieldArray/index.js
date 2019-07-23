import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, GridItem, Bullseye, FormHelperText } from '@patternfly/react-core';
import { CloseIcon, AddCircleOIcon } from '@patternfly/react-icons';

import './final-form-array.scss';

const ArrayItem = ({
  fields,
  fieldKey,
  fieldIndex,
  name,
  remove,
  formOptions,
}) => {
  const widths = {
    label: fields[0].label ? 7 : 0,
    field: fields[0].label ? 4 : 11,
  };

  const editedFields = fields.map((field) => {
    const itemName = field.name
      ? field.name.substring(field.name.lastIndexOf('.') + 1)
      : `${fieldKey}[${fieldIndex}]`;
    const fieldName = name ? `${name}${itemName && itemName !== 'items' ? itemName : ''}` : `${fieldKey}[${fieldIndex}]`;
    return { ...field, name: fieldName, key: name, hideLabel: true };
  });

  return (
    <React.Fragment>
      <Grid>
        <GridItem sm= { 11 }>
          <hr className="ddf-final-form-hr" />
        </GridItem>
      </Grid>
      <Grid className="wrapper">
        { widths.label > 0 && <GridItem className="ddf-final-form-group-label" sm={ widths.label }>
          { <label htmlFor={ editedFields[0].name }>{ fields[0].label }</label> }
        </GridItem> }
        <GridItem sm={ widths.field } className="final-form-array-item">
          { formOptions.renderForm(editedFields) }
        </GridItem>
        <GridItem sm={ 1 }>
          <Bullseye>
            <CloseIcon onClick={ () => remove(fieldIndex) } className="ddf-final-form-group-remove-icon"/>
          </Bullseye>
        </GridItem>
      </Grid>
    </React.Fragment>
  );
};

ArrayItem.propTypes = {
  fieldKey: PropTypes.string.isRequired,
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  formOptions: PropTypes.object.isRequired,
};

const DynamicArray = ({
  fieldKey,
  arrayValidator,
  title,
  description,
  fields,
  itemDefault,
  formOptions,
  meta,
  reactFinalForm,
  FieldArrayProvider,
  ...rest
}) => {
  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <FieldArrayProvider key={ fieldKey } name={ rest.input.name } validate={ arrayValidator }>
      { (cosi) => (
        <Fragment>
          { title && <GridItem sm={ 12 }><h3>{ title }</h3></GridItem> }
          { description && <GridItem sm={ 12 }><p>{ description }</p></GridItem> }
          { cosi.fields.map((name, index) => (
            <ArrayItem
              key={ `${name || fieldKey}-${index}` }
              fields={ fields }
              name={ name }
              fieldKey={ fieldKey }
              fieldIndex={ index }
              remove={ cosi.fields.remove }
              formOptions={ formOptions }
            />)) }
          <Grid>
            <GridItem sm={ 11 }>{ isError && <FormHelperText isHidden={ false } isError={ true }>{ error }</FormHelperText> }</GridItem>
            <GridItem sm={ 1 } className="final-form-array-add-container">
              <Bullseye>
                <AddCircleOIcon onClick={ () => cosi.fields.push(itemDefault) } className="ddf-final-form-group-add-icon"/>
              </Bullseye>
            </GridItem>
          </Grid>
        </Fragment>
      ) }
    </FieldArrayProvider>);
};

DynamicArray.propTypes = {
  fieldKey: PropTypes.string,
  arrayValidator: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object),
  itemDefault: PropTypes.any,
};

const FixedArrayField = ({ title, description, fields, additionalItems, formOptions }) => (
  <Fragment>
    { title && <GridItem sm={ 12 }><h3>{ title }</h3></GridItem> }
    { description && <GridItem sm={ 12 }><p>{ description }</p></GridItem> }
    { formOptions.renderForm(fields) }
    { formOptions.renderForm([ additionalItems ]) }
  </Fragment>
);

FixedArrayField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  additionalItems: PropTypes.object.isRequired,
};

const renderArrayField = props => {
  const { fieldKey, arrayValidator, hasFixedItems, ...rest } = props;
  return (
    hasFixedItems ? <FixedArrayField { ...props } /> : (
      <DynamicArray
        fieldKey={ rest.input.name }
        { ...rest }
        arrayValidator={ arrayValidator }
      />
    )
  );
};

renderArrayField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  fields: PropTypes.array.isRequired,
  validate: PropTypes.array,
  itemDefault: PropTypes.any,
};
renderArrayField.defaultProps = {
  validate: [],
};

export default renderArrayField;
