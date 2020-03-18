import React from 'react';
import Form from './form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

import RendererContext from './renderer-context';
import renderForm from '../form-renderer/render-form';
import defaultSchemaValidator from './default-schema-validator';
import SchemaErrorComponent from '../form-renderer/schema-error-component';
import defaultValidatorMapper from '../validators/validator-mapper';

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
  schemaValidatorMapper,
  debug,
  ...props
}) => {
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

  const Template = FormTemplate
    ? FormTemplate
    : () => <div>{`FormRenderer is missing 'FormTemplate' prop: ({formFields, schema}) => <FormTemplate {...} />`}</div>;

  return (
    <Form
      {...props}
      onSubmit={onSubmit}
      mutators={{ ...arrayMutators }}
      decorators={[createFocusDecorator()]}
      initialValues={initialValues}
      validate={validate}
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      debug={debug}
      render={({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => (
        <RendererContext.Provider
          value={{
            componentMapper,
            validatorMapper: validatorMapperMerged,
            actionMapper,
            formOptions: {
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
          <Template formFields={renderForm(schema.fields)} schema={schema} />
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
  componentMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
  }).isRequired,
  FormTemplate: PropTypes.func.isRequired,
  validatorMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  actionMapper: PropTypes.shape({
    [PropTypes.string]: PropTypes.func
  }),
  debug: PropTypes.func,
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
