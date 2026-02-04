import React, { memo } from 'react';
import isEqual from 'lodash/isEqual';
import { useFormApi, FieldArray, useFieldApi } from '@data-driven-forms/react-form-renderer';

import { Bullseye, Button, Flex, FlexItem, FormFieldGroup, FormFieldGroupHeader, FormHelperText, Grid, GridItem } from '@patternfly/react-core';

import { TrashIcon } from '@patternfly/react-icons';

import './final-form-array.css';
import { BaseFieldProps, FieldArrayProps, FieldArrayButtonLabels } from '../types';

const Spacer: React.FC = () => <span className="ddf-final-form-spacer" />;

interface ArrayItemProps {
  fields: any[];
  fieldIndex: number;
  name: string;
  remove: (index: number) => void;
  length: number;
  minItems: number;
  buttonLabels: Required<FieldArrayButtonLabels>;
  isLast: boolean;
}

const ArrayItem = memo<ArrayItemProps>(
  ({ fields, fieldIndex, name, remove, length, minItems, buttonLabels, isLast }) => {
    const { renderForm } = useFormApi();

    const editedFields = fields.map((field: any, index: number) => {
      const computedName = field.name ? `${name}.${field.name}` : name;
      return { ...field, name: computedName, key: `${name}-${index}` };
    });

    const isRemoveDisabled = length <= minItems;

    return (
      <React.Fragment>
        <Flex>
          <FlexItem className="pf-c-form" grow={{ default: 'grow' }}>
            {editedFields.map((field: any) => renderForm([field]))}
          </FlexItem>
          <FlexItem>
            {editedFields[0].label && <Spacer />}
            <Button
              icon={<TrashIcon />}
              variant="plain"
              aria-label={buttonLabels.remove}
              disabled={isRemoveDisabled}
              {...(!isRemoveDisabled && { onClick: () => remove(fieldIndex) })}
            />
          </FlexItem>
        </Flex>
        {!isLast && editedFields.length > 1 && <hr className="ddf-final-form-hr" />}
      </React.Fragment>
    );
  },
  ({ remove: _prevRemove, ...prev }, { remove: _nextRemove, ...next }) => isEqual(prev, next)
);

ArrayItem.displayName = 'ArrayItem';

const DynamicArray: React.FC<BaseFieldProps<FieldArrayProps>> = (props) => {
  const {
    arrayValidator,
    label,
    description,
    fields: formFields = [],
    defaultItem,
    meta,
    minItems = 0,
    maxItems = Infinity,
    noItemsMessage = 'No items added',
    buttonLabels = {},
    ...rest
  } = useFieldApi(props);

  const { dirty, submitFailed, error, submitError } = meta;
  const isError = (dirty || submitFailed) && (error || submitError) && (typeof error === 'string' || typeof submitError === 'string');

  const combinedButtonLabels: Required<FieldArrayButtonLabels> = {
    add: 'Add item',
    removeAll: 'Delete all',
    remove: 'Remove',
    ...buttonLabels,
  };

  return (
    <FieldArray key={rest.input.name} name={rest.input.name} validate={arrayValidator}>
      {({ fields: { map, value = [], push, remove, forEach } }) => (
        <FormFieldGroup
          header={
            <FormFieldGroupHeader
              titleText={{ text: label, id: props.name }}
              titleDescription={description}
              actions={
                <React.Fragment>
                  {minItems === 0 && (
                    <Button
                      variant="link"
                      isDisabled={value.length === 0}
                      {...(value.length !== 0 && { onClick: () => forEach((_: any, index: number) => remove(index)) })}
                    >
                      {combinedButtonLabels.removeAll}
                    </Button>
                  )}
                  <Button
                    variant="secondary"
                    isDisabled={value.length >= maxItems}
                    {...(!(value.length >= maxItems) && { onClick: () => push(defaultItem) })}
                  >
                    {combinedButtonLabels.add}
                  </Button>
                </React.Fragment>
              }
            />
          }
        >
          {value.length <= 0 && <Bullseye>{noItemsMessage}</Bullseye>}
          {map((name: string, index: number) => (
            <ArrayItem
              key={`${name}-${index}`}
              fields={formFields}
              name={name}
              fieldIndex={index}
              remove={remove}
              length={value.length}
              minItems={minItems}
              buttonLabels={combinedButtonLabels}
              isLast={value.length === index + 1}
            />
          ))}
          <Grid>
            <GridItem sm={11}>{isError && <FormHelperText>{error || submitError}</FormHelperText>}</GridItem>
          </Grid>
        </FormFieldGroup>
      )}
    </FieldArray>
  );
};

export default DynamicArray;
