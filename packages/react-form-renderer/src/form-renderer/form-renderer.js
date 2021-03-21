import React, { useState, useRef } from 'react';
import Form from '../form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

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
  const [fileInputs, setFileInputs] = useState([]);
  const focusDecorator = useRef(createFocusDecorator());
  let schemaError;

  const validatorMapperMerged = { ...defaultValidatorMapper, ...validatorMapper };

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];
    defaultSchemaValidator(schema, componentMapper, validatorTypes, actionTypes, schemaValidatorMapper);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={schemaError.name} message={schemaError.message} />;
  }

  const registerInputFile = (name) => setFileInputs((prevFiles) => [...prevFiles, name]);

  const unRegisterInputFile = (name) => setFileInputs((prevFiles) => [...prevFiles.splice(prevFiles.indexOf(name))]);

  return (
    <Form
      {...props}
      onSubmit={(values, formApi, ...args) => onSubmit(values, { ...formApi, fileInputs }, ...args)}
      mutators={{ ...arrayMutators }}
      decorators={[focusDecorator.current]}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form } }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            formOptions: {
              registerInputFile,
              unRegisterInputFile,
              pristine,
              onSubmit,
              onCancel: onCancel ? (...args) => onCancel(getState().values, ...args) : undefined,
              onReset: (...args) => {
                onReset && onReset(...args);
                reset();
              },
              getState,
              valid,
              clearedValue,
              submit,
              handleSubmit,
              reset,
              clearOnUnmount,
              renderForm,
              ...mutators,
              ...form
            }
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
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func, PropTypes.elementType])
  }).isRequired,
  FormTemplate: PropTypes.elementType.isRequired,
  validatorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  actionMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  schemaValidatorMapper: PropTypes.shape({
    components: PropTypes.shape({
      [PropTypes.string]: PropTypes.func
    }),
    validators: PropTypes.shape({
      [PropTypes.string]: PropTypes.func
    }),
    actions: PropTypes.shape({
      [PropTypes.string]: PropTypes.func
    })
  })
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false
};

export default FormRenderer;
