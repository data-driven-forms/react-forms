import React, { useRef } from 'react';
import Form from '../form';
import PropTypes from 'prop-types';

import RendererContext from '../renderer-context';
import renderForm from './render-form';
import defaultSchemaValidator from '../default-schema-validator';
import SchemaErrorComponent from './schema-error-component';
import defaultValidatorMapper from '../validator-mapper';

const FormRenderer = ({
  componentMapper,
  FormTemplate,
  onSubmit,
  onCancel,
  onReset,
  clearOnUnmount,
  subscription,
  clearedValue,
  schema,
  validatorMapper,
  actionMapper,
  schemaValidatorMapper,
  ...props
}) => {
  const registeredFields = useRef({});
  let schemaError;

  const setRegisteredFields = (fn) => (registeredFields.current = fn({ ...registeredFields.current }));
  const internalRegisterField = (name) => {
    setRegisteredFields((prev) => (prev[name] ? { ...prev, [name]: prev[name] + 1 } : { ...prev, [name]: 1 }));
  };

  const internalUnRegisterField = (name) => {
    setRegisteredFields(({ [name]: currentField, ...prev }) => (currentField && currentField > 1 ? { [name]: currentField - 1, ...prev } : prev));
  };

  const internalGetRegisteredFields = () =>
    Object.entries(registeredFields.current).reduce((acc, [name, value]) => (value > 0 ? [...acc, name] : acc), []);

  const validatorMapperMerged = { ...defaultValidatorMapper, ...validatorMapper };

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];
    defaultSchemaValidator(schema, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
  } catch (error) {
    schemaError = error;
    // eslint-disable-next-line no-console
    console.error(error);
    // eslint-disable-next-line no-console
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={schemaError.name} message={schemaError.message} />;
  }

  return (
    <Form
      {...props}
      clearedValue={clearedValue}
      clearOnUnmount={clearOnUnmount}
      onSubmit={onSubmit}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ formOptions: { reset, getState, ...formOptions } }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            formOptions: {
              onSubmit,
              onCancel: onCancel ? (...args) => onCancel(getState().values, ...args) : undefined,
              onReset: (...args) => {
                onReset && onReset(...args);
                reset();
              },
              getState,
              reset,
              renderForm,
              ...formOptions,
              internalRegisterField,
              internalUnRegisterField,
              ffGetRegisteredFields: formOptions.getRegisteredFields,
              getRegisteredFields: internalGetRegisteredFields,
            },
          }}
        >
          <FormTemplate formFields={renderForm(schema.fields)} schema={schema} />
        </RendererContext.Provider>
      )}
    />
  );
};

FormRenderer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  schema: PropTypes.object.isRequired,
  clearOnUnmount: PropTypes.bool,
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
  componentMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func, PropTypes.elementType]),
  }).isRequired,
  FormTemplate: PropTypes.elementType.isRequired,
  validatorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func,
  }),
  actionMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func,
  }),
  schemaValidatorMapper: PropTypes.shape({
    components: PropTypes.shape({
      [PropTypes.string]: PropTypes.func,
    }),
    validators: PropTypes.shape({
      [PropTypes.string]: PropTypes.func,
    }),
    actions: PropTypes.shape({
      [PropTypes.string]: PropTypes.func,
    }),
  }),
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false,
};

export default FormRenderer;
