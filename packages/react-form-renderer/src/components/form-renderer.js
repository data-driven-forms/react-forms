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
import useComponentSpy from '../hooks/use-component-spy';

const FormContent = ({ value, formFields, schema, onStateUpdate, Template }) => {
  useComponentSpy(onStateUpdate);
  return (
    <RendererContext.Provider value={value}>
      <Template formFields={formFields} schema={schema} />
    </RendererContext.Provider>
  );
};

FormContent.propTypes = {
  value: PropTypes.object.isRequired,
  formFields: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  schema: PropTypes.object.isRequired,
  onStateUpdate: PropTypes.func,
  Template: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]).isRequired
};

const FormRenderer = ({
  componentMapper,
  FormTemplate,
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
  actionMapper,
  onStateUpdate
}) => {
  let schemaError;

  const validatorMapperMerged = { ...defaultValidatorMapper, ...validatorMapper };

  try {
    const validatorTypes = Object.keys(validatorMapperMerged);
    const actionTypes = actionMapper ? Object.keys(actionMapper) : [];
    defaultSchemaValidator(schema, componentMapper, validatorTypes, actionTypes);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={schemaError.name} message={schemaError.message} />;
  }

  const Template = FormTemplate
    ? FormTemplate
    : () => <div>{`FormRenderer is missing 'FormTemplate' prop: ({formFields, schema}) => <FormTemplate {...} />`}</div>;

  return (
    <Form
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      decorators={[createFocusDecorator()]}
      initialValues={initialValues}
      validate={validate}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => (
        <FormContent
          formFields={renderForm(schema.fields)}
          schema={schema}
          onStateUpdate={onStateUpdate}
          Template={Template}
          value={{
            componentMapper,
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
        />
      )}
    />
  );
};

FormRenderer.propTypes = {
  onStateUpdate: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  schema: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
  clearOnUnmount: PropTypes.bool,
  validate: PropTypes.func,
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
  componentMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
  }).isRequired,
  FormTemplate: PropTypes.func.isRequired,
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
