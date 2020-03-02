import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

import RendererContext from './renderer-context';
import renderForm from '../form-renderer/render-form';
import defaultSchemaValidator from '../parsers/default-schema-validator';
import SchemaErrorComponent from '../form-renderer/schema-error-component';
import defaultValidatorMapper from '../validators/validator-mapper';

const FormRenderer = ({
  formFieldsMapper,
  formTemplate,
  onSubmit,
  onCancel,
  onReset,
  initialValues,
  clearOnUnmount,
  validate,
  subscription,
  clearedValue,
  schema,
  validatorMapper,
  actionMapper
}) => {
  let schemaError;

  const validatorMapperMerged = { ...defaultValidatorMapper, ...validatorMapper };

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];
    defaultSchemaValidator(schema, formFieldsMapper, validatorTypes, actionTypes);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={schemaError.name} message={schemaError.message} />;
  }

  const FormTemplate = formTemplate
    ? formTemplate
    : () => <div>{`FormRenderer is missing 'formTemplate' prop: ({formFields, schema}) => <FormTemplate {...} />`}</div>;

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      decorators={[createFocusDecorator()]}
      initialValues={initialValues}
      validate={validate}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => (
        <RendererContext.Provider
          value={{
            formFieldsMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            formOptions: {
              pristine,
              onSubmit,
              onCancel,
              onReset,
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
  initialValues: PropTypes.object,
  clearOnUnmount: PropTypes.bool,
  validate: PropTypes.func,
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
  formFieldsMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
  }).isRequired,
  formTemplate: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]).isRequired,
  validatorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  actionMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  })
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false
};

export default FormRenderer;
