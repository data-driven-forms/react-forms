import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

import RendererContext from './renderer-context';
import FormControls from './form-controls';
import renderForm from './render-form';
import defaultSchemaValidator from '../parsers/default-schema-validator';
import SchemaErrorComponent from './schema-error-component';
import { renderTitle, renderDescription } from './form-information';

const isDisabled = (disableStates, getState) => disableStates.map(item => getState()[item]).find(item => !!item);

const FormRenderer = ({
  layoutMapper,
  formFieldsMapper,
  onSubmit,
  onCancel,
  canReset,
  onReset,
  buttonsLabels,
  disableSubmit,
  initialValues,
  showFormControls,
  buttonOrder,
  buttonClassName,
  clearOnUnmount,
  validate,
  onStateUpdate,
  renderFormButtons,
  subscription,
  clearedValue,
  schema,
}) => {
  let schemaError;
  try {
    defaultSchemaValidator(schema, formFieldsMapper, layoutMapper);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={ schemaError.name } message={ schemaError.message } />;
  }

  const label = schema.title || schema.label;

  return (
    <Form
      onSubmit={ onSubmit }
      mutators={{ ...arrayMutators }}
      decorators={ [ createFocusDecorator() ] }
      initialValues={ initialValues }
      validate={ validate }
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={ ({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => (
        <RendererContext.Provider value={{
          layoutMapper,
          formFieldsMapper,
          formOptions: {
            pristine,
            onSubmit,
            onCancel,
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
          },
        }}>
          <RendererContext.Consumer>
            { ({ layoutMapper: { FormWrapper }}) => (
              <FormWrapper onSubmit={ handleSubmit }>
                { label && renderTitle(label) }
                { schema.description && renderDescription(schema.description) }
                { renderForm(schema.fields) }
                { onStateUpdate && <FormSpy onChange={ onStateUpdate } /> }
                { showFormControls && (
                  <FormControls
                    buttonOrder={ buttonOrder }
                    FormButtons={ renderFormButtons }
                    buttonClassName={ buttonClassName }
                    onCancel={ onCancel }
                    canReset={ canReset }
                    onReset={ onReset }
                    handleSubmit={ handleSubmit }
                    disableSubmit={ isDisabled(disableSubmit, getState) }
                    { ...buttonsLabels }
                  />
                ) }
              </FormWrapper>
            ) }
          </RendererContext.Consumer>
        </RendererContext.Provider>
      ) }
    />
  );};

export default FormRenderer;

FormRenderer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  canReset: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  buttonsLabels: PropTypes.object,
  disableSubmit: PropTypes.arrayOf(PropTypes.string),
  initialValues: PropTypes.object,
  showFormControls: PropTypes.bool,
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
  clearOnUnmount: PropTypes.bool,
  validate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  renderFormButtons: PropTypes.oneOfType([ PropTypes.node, PropTypes.element, PropTypes.func ]),
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
  clearedValue: PropTypes.any,
};

FormRenderer.defaultProps = {
  buttonsLabels: {},
  disableSubmit: [],
  initialValues: {},
  showFormControls: true,
  clearOnUnmount: false,
  buttonClassName: '',
};
