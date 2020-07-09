import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useFieldApi, useFormApi, FieldArray } from '@data-driven-forms/react-form-renderer';
import { Row, Col, Button, Typography, Space } from 'antd';
import { UndoOutlined, RedoOutlined } from '@ant-design/icons';

import AntForm from '../common/form-wrapper';

const ArrayItem = ({ fields, fieldIndex, name, remove, length, minItems, removeLabel }) => {
  const { renderForm } = useFormApi();

  const editedFields = fields.map((field, index) => {
    const computedName = field.name ? `${name}.${field.name}` : name;
    return { ...field, name: computedName, key: `${computedName}-${index}` };
  });

  return (
    <Row>
      <Col span={24}>{renderForm([editedFields])}</Col>
      <Col span={24}>
        <Button type="primary" danger onClick={() => remove(fieldIndex)} disabled={length <= minItems}>
          {removeLabel}
        </Button>
      </Col>
    </Row>
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
    FormFieldGridProps,
    FormControlProps,
    buttonLabels,
    validateOnMount,
    isRequired,
    helperText,
    FormItemProps,
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
    <AntForm
      meta={{ ...meta, error: typeof error === 'object' ? error.name : error }}
      validateOnMount={validateOnMount}
      helperText={helperText}
      FormItemProps={FormItemProps}
      isRequired={isRequired}
    >
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
            <Row gutter={[0, 16]}>
              <Col span={24}>
                <Row justify="space-between">
                  <Col>{label && <Typography.Title level={4}>{label}</Typography.Title>}</Col>
                  <Col>
                    <Space>
                      <Button type="default" onClick={undo} disabled={state.index === 0} icon={<UndoOutlined />} />
                      <Button type="default" onClick={redo} disabled={state.index === state.history.length} icon={<RedoOutlined />} />
                      <Button type="primary" onClick={pushWrapper} disabled={value.length >= maxItems}>
                        {combinedButtonLabels.add}
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Col>
              {description && (
                <Col span={24}>
                  <Typography.Text>{description}</Typography.Text>
                </Col>
              )}
              <Col span={24}>
                <Row gutter={[0, 16]}>
                  {value.length <= 0 ? (
                    <Typography.Text>{noItemsMessage}</Typography.Text>
                  ) : (
                    map((name, index) => (
                      <Col span={24} key={name}>
                        <ArrayItem
                          fields={formFields}
                          name={name}
                          fieldIndex={index}
                          remove={removeWrapper}
                          length={value.length}
                          minItems={minItems}
                          removeLabel={combinedButtonLabels.remove}
                        />
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
              {isError && (
                <Col span={12}>
                  <Typography.Text type="danger">{typeof error === 'object' ? error.name : error}</Typography.Text>
                </Col>
              )}
            </Row>
          );
        }}
      </FieldArray>
    </AntForm>
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
  FormItemProps: PropTypes.object,
  buttonLabels: PropTypes.object
};

DynamicArray.defaultProps = {
  maxItems: Infinity,
  minItems: 0,
  noItemsMessage: 'No items added',
  FormItemProps: {}
};

export default DynamicArray;
