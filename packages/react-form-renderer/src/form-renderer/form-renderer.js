import arrayMutators from 'final-form-arrays';
import createFocusDecorator from 'final-form-focus';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useRef, useState, cloneElement } from 'react';

import defaultSchemaValidator from '../default-schema-validator';
import defaultValidatorMapper from '../validator-mapper';
import Form from '../form';
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
  conditionMapper = {},
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
  const [fileInputs, setFileInputs] = useState([]);
  const formFields = useMemo(() => renderForm(schema.fields), [schema]);
  const registeredFields = useRef({});
  const focusDecorator = useRef(createFocusDecorator());
  const validatorMapperMerged = useMemo(() => {
    return { ...defaultValidatorMapper, ...validatorMapper };
  }, [validatorMapper]);
  const mutatorsMerged = useMemo(() => ({ ...arrayMutators, ...mutators }), [mutators]);
  const decoratorsMerged = useMemo(() => [focusDecorator.current, ...(Array.isArray(decorators) ? decorators : [])], [decorators]);

  const handleSubmitCallback = useCallback(
    (values, formApi, ...args) => {
      return !isFunc(onSubmit) ? undefined : onSubmit(values, { ...formApi, fileInputs }, ...args);
    },
    [onSubmit, fileInputs]
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

  const registerInputFile = useCallback((name) => {
    setFileInputs((prevFiles) => [...prevFiles, name]);
  }, []);

  const unRegisterInputFile = useCallback((name) => {
    setFileInputs((prevFiles) => [...prevFiles.splice(prevFiles.indexOf(name))]);
  }, []);

  const setRegisteredFields = useCallback((fn) => {
    return (registeredFields.current = fn({ ...registeredFields.current }));
  }, []);

  const internalRegisterField = useCallback((name) => {
    setRegisteredFields((prev) => (prev[name] ? { ...prev, [name]: prev[name] + 1 } : { ...prev, [name]: 1 }));
  }, []);

  const internalUnRegisterField = useCallback((name) => {
    setRegisteredFields(({ [name]: currentField, ...prev }) => (currentField && currentField > 1 ? { [name]: currentField - 1, ...prev } : prev));
  }, []);

  const internalGetRegisteredFields = useCallback(() => {
    const fields = registeredFields.current;
    return Object.entries(fields).reduce((acc, [name, value]) => (value > 0 ? [...acc, name] : acc), []);
  }, []);

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
      onSubmit={handleSubmitCallback}
      mutators={mutatorsMerged}
      decorators={decoratorsMerged}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form } }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            conditionMapper,
            formOptions: {
              registerInputFile,
              unRegisterInputFile,
              pristine,
              onSubmit,
              onCancel: isFunc(onCancel) ? handleCancelCallback(getState) : undefined,
              onReset: handleResetCallback(reset),
              onError: handleErrorCallback,
              getState,
              valid,
              clearedValue,
              submit,
              handleSubmit,
              reset,
              clearOnUnmount,
              renderForm,
              internalRegisterField,
              internalUnRegisterField,
              ...mutators,
              ...form,
              ffGetRegisteredFields: form.getRegisteredFields,
              getRegisteredFields: internalGetRegisteredFields,
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
  conditionMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func,
  }),
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false,
};

export default FormRenderer;
