import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';

import { Button } from 'semantic-ui-react';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import FormFieldGrid from '../common/form-field-grid';

const ArrayItem = ({ fields, fieldIndex, name, remove, length, minItems, removeLabel }) => {
  const { renderForm } = useFormApi();

  const editedFields = fields.map((field, index) => {
    const computedName = field.name ? `${name}.${field.name}` : name;
    return { ...field, name: computedName, key: `${computedName}-${index}` };
  });

  return (
    <div>
      <div>
        <div container spacing={3}>
          {renderForm([editedFields])}
        </div>
      </div>
      <div>
        <Button color="secondary" onClick={() => remove(fieldIndex)} disabled={length <= minItems}>
          {removeLabel}
        </Button>
      </div>
    </div>
  );
};

ArrayItem.propTypes = {
  name: PropTypes.string,
  fieldIndex: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object),
  remove: PropTypes.func.isRequired,
  length: PropTypes.number,
  minItems: PropTypes.number,
  removeLabel: PropTypes.node.isRequired
};

const defaultButtonLabels = {
  add: 'ADD',
  remove: 'REMOVE'
};

const initialState = {
  index: 0,
  history: []
};

export const reducer = (state, { type, action }) => {
  switch (type) {
    case 'redo':
      return {
        ...state,
        index: state.index + 1
      };
    case 'action':
      return {
        index: state.index + 1,
        history: [...state.history.slice(0, state.index), action]
      };
    case 'undo':
      return {
        ...state,
        index: state.index - 1
      };
    case 'resetHistory':
      return {
        ...state,
        history: state.history.slice(0, state.index)
      };
    default:
      return state;
  }
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
    buttonLabels,
    ...rest
  } = useFieldApi(props);
  const [state, dispatch] = useReducer(reducer, initialState);

  const combinedButtonLabels = {
    ...defaultButtonLabels,
    ...buttonLabels
  };

  const { dirty, submitFailed, error } = meta;
  const isError = (dirty || submitFailed) && error && typeof error === 'string';

  return (
    <div>
      <div>
        <FieldArray key={rest.input.name} name={rest.input.name} validate={arrayValidator}>
          {({ fields: { map, value = [], push, remove } }) => {
            const pushWrapper = () => {
              dispatch({ type: 'resetHistory' });
              push(defaultItem);
            };

            const removeWrapper = (index) => {
              dispatch({ type: 'action', action: { action: 'remove', value: value[index] } });
              remove(index);
            };

            const undo = () => {
              push(state.history[state.index - 1].value);
              dispatch({ type: 'undo' });
            };

            const redo = () => {
              remove(value.length - 1);
              dispatch({ type: 'redo' });
            };

            return (
              <div>
                <div>
                  {label && <h1>{label}</h1>}
                  <Button disabled={state.index === 0} onClick={undo}>
                    Undo
                  </Button>
                  <Button disabled={state.index === state.history.length} onClick={redo}>
                    Redu
                  </Button>
                  <Button color="primary" onClick={pushWrapper} disabled={value.length >= maxItems}>
                    {combinedButtonLabels.add}
                  </Button>
                </div>
                {description && (
                  <div item xs={12}>
                    <h2>{description}</h2>
                  </div>
                )}
                <div item xs={12}>
                  {value.length <= 0 ? (
                    <p>{noItemsMessage}</p>
                  ) : (
                    map((name, index) => (
                      <ArrayItem
                        key={name}
                        fields={formFields}
                        name={name}
                        fieldIndex={index}
                        remove={removeWrapper}
                        length={value.length}
                        minItems={minItems}
                        removeLabel={combinedButtonLabels.remove}
                      />
                    ))
                  )}
                </div>
                {isError && (
                  <div item xs={12}>
                    <p>{error}</p>
                  </div>
                )}
              </div>
            );
          }}
        </FieldArray>
      </div>
    </div>
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
  buttonLabels: PropTypes.object
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added'
};

export default DynamicArray;
