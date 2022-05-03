import React, { cloneElement, useCallback, useMemo } from 'react';
import Form from '../form';
import PropTypes from 'prop-types';

import defaultSchemaValidator from '../default-schema-validator';
import defaultValidatorMapper from '../validator-mapper';
import RendererContext from '../renderer-context';
import renderForm from './render-form';
import SchemaErrorComponent from './schema-error-component';

const isFunc = (fn) => typeof fn === 'function';

const renderChildren = (children, props) => {
  if (isFunc(children)) {
    return children(props);
  }

  let childElement = children;
  if (Array.isArray(children)) {
    /**
     * Only permit one child element
     */
    if (children.length !== 1) {
      throw new Error('FormRenderer expects only one child element!');
    }

    childElement = children[0];
  }

  if (typeof childElement === 'object') {
    /**
     * Clone react element, pass form fields and schema as props, but override them with child props if present
     */
    return cloneElement(children, { ...props, ...childElement.props });
  }

  throw new Error(`Invalid children prop! Expected one of [null, Function, object], got ${typeof children}`);
};

const FormRenderer = ({
  actionMapper,
  children,
  clearedValue,
  clearOnUnmount,
  componentMapper,
  decorators,
  FormTemplate,
  FormTemplateProps,
  mutators,
  onCancel,
  onError,
  onReset,
  onSubmit,
  schema,
  schemaValidatorMapper,
  subscription,
  validatorMapper,
  ...props
}) => {
  const formFields = useMemo(() => renderForm(schema.fields), [schema]);
  const validatorMapperMerged = useMemo(() => {
    return { ...defaultValidatorMapper, ...validatorMapper };
  }, [validatorMapper]);

  const handleSubmitCallback = useCallback(
    (values, formApi, ...args) => {
      return !isFunc(onSubmit) ? undefined : onSubmit(values, formApi, ...args);
    },
    [onSubmit]
  );

  const handleCancelCallback = useCallback(
    (getState) => {
      return (...args) => onCancel(getState().values, ...args);
    },
    [onCancel]
  );

  const handleResetCallback = useCallback(
    (reset) =>
      (...args) => {
        reset();
        return !isFunc(onReset) ? void 0 : onReset(...args);
      },
    [onReset]
  );

  const handleErrorCallback = useCallback(
    (...args) => {
      // eslint-disable-next-line no-console
      console.error(...args);
      return !isFunc(onError) ? void 0 : onError(...args);
    },
    [onError]
  );

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];

    defaultSchemaValidator(schema, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
  } catch (error) {
    handleErrorCallback('schema-error', error);
    return <SchemaErrorComponent name={error.name} message={error.message} />;
  }

  return (
    <Form
      clearedValue={clearedValue}
      clearOnUnmount={clearOnUnmount}
      onSubmit={handleSubmitCallback}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ formOptions: { reset, getState, ...formOptions } }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            formOptions: {
              onSubmit,
              onCancel: isFunc(onCancel) ? handleCancelCallback(getState) : undefined,
              onReset: handleResetCallback(reset),
              onError: handleErrorCallback,
              getState,
              reset,
              renderForm,
              ...formOptions,
              initialValues: props.initialValues,
              schema,
            },
          }}
        >
          {FormTemplate && <FormTemplate formFields={formFields} schema={schema} {...FormTemplateProps} />}

          {children && renderChildren(children, { formFields, schema })}
        </RendererContext.Provider>
      )}
      {...props}
    />
  );
};

FormRenderer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  onError: PropTypes.func,
  schema: PropTypes.object.isRequired,
  clearOnUnmount: PropTypes.bool,
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
  componentMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func, PropTypes.elementType]),
  }).isRequired,
  FormTemplate: PropTypes.elementType,
  FormTemplateProps: PropTypes.object,
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
  initialValues: PropTypes.object,
  decorators: PropTypes.array,
  mutators: PropTypes.object,
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false,
};

export default FormRenderer;
