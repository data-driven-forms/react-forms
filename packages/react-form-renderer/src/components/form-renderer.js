import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

import RendererContext from './renderer-context';
import renderForm from '../form-renderer/render-form';
import defaultSchemaValidator from '../parsers/default-schema-validator';
import SchemaErrorComponent from '../form-renderer/schema-error-component';

const FormRenderer = ({
  formFieldsMapper,
  formTemplate,
  onSubmit,
  onCancel,
  onReset,
  initialValues,
  clearOnUnmount,
  validate,
  onStateUpdate,
  subscription,
  clearedValue,
  schema,
}) => {
  let schemaError;
  try {
    defaultSchemaValidator(schema, formFieldsMapper);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={ schemaError.name } message={ schemaError.message } />;
  }

  const FormTemplate = formTemplate ? formTemplate : () => <div>{ `FormRenderer is missing 'formTemplate' prop:
  ({formFields, formOptions, formSpy, schema}) => <FormTemplate {...} />` }</div>;

  return (
    <Form
      onSubmit={ onSubmit }
      mutators={{ ...arrayMutators }}
      decorators={ [ createFocusDecorator() ] }
      initialValues={ initialValues }
      validate={ validate }
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={ ({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => {
        const formOptions = {
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
          ...form,
        };

        return (
          <RendererContext.Provider value={{
            formFieldsMapper,
            formOptions,
          }}>
            <FormTemplate
              formFields={ renderForm(schema.fields) }
              formOptions={ formOptions }
              FormSpy={ FormSpy }
              schema={ schema }
            />
            { onStateUpdate && <FormSpy onChange={ onStateUpdate } /> }
          </RendererContext.Provider>
        );} }
    />
  );};

FormRenderer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  schema: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  clearOnUnmount: PropTypes.bool,
  validate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
};

FormRenderer.defaultProps = {
  initialValues: {},
  clearOnUnmount: false,
};

export default FormRenderer;
