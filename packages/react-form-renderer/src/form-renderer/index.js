import React from 'react';
import { Form, FormSpy } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
import createFocusDecorator from 'final-form-focus';

import miqParser from '../parsers/miq-parser/miq-parser';
import mozillaParser from '../parsers/mozilla-parser/mozilla-schema-parser';
import RendererContext, { configureContext } from './renderer-context';
import FormControls from './form-controls';
import renderForm from './render-form';
import defaultSchemaValidator from '../parsers/default-schema-validator';
import SchemaErrorComponent from './schema-error-component';
import { renderTitle, renderDescription } from './form-information';

const schemaMapper = type => ({
  mozilla: (schema, uiSchema) => mozillaParser(schema, uiSchema),
  miq: schema => miqParser(schema),
  default: schema => ({ schema }),
})[type];

const isDisabled = (disableStates, getState) => disableStates.map(item => getState()[item]).find(item => !!item);

const FormRenderer = ({
  layoutMapper,
  formFieldsMapper,
  onSubmit,
  onCancel,
  canReset,
  onReset,
  schema,
  schemaType,
  buttonsLabels,
  disableSubmit,
  initialValues,
  uiSchema,
  showFormControls,
  buttonOrder,
  buttonClassName,
  clearOnUnmount,
  validate,
  onStateUpdate,
  renderFormButtons,
  subscription,
}) => {
  const inputSchema = schemaMapper(schemaType)(schema, uiSchema);
  let schemaError;
  try {
    defaultSchemaValidator(inputSchema.schema, formFieldsMapper, layoutMapper);
  } catch (error) {
    schemaError = error;
    console.error(error);
    console.log('error: ', error.message);
  }

  if (schemaError) {
    return <SchemaErrorComponent name={ schemaError.name } message={ schemaError.message } />;
  }

  return (
    <Form
      onSubmit={ onSubmit }
      mutators={{ ...arrayMutators }}
      decorators={ [ createFocusDecorator() ] }
      initialValues={{
        ...inputSchema.defaultValues,
        ...initialValues,
      }}
      validate={ validate }
      subscription={{ pristine: true, submitting: true, valid: true, ...subscription }}
      render={ ({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }, ...state }) => (
        <RendererContext.Provider value={ configureContext({
          layoutMapper,
          formFieldsMapper,
          formOptions: {
            pristine,
            onSubmit,
            onCancel,
            getState,
            valid,
            submit,
            handleSubmit,
            reset,
            clearOnUnmount,
            renderForm,
            ...mutators,
            ...form,
          },
        }) }>
          <RendererContext.Consumer>
            { ({ layoutMapper: { FormWrapper }}) => (
              <FormWrapper>
                { inputSchema.schema.title && renderTitle(inputSchema.schema.title) }
                { inputSchema.schema.description && renderDescription(inputSchema.schema.description) }
                { renderForm(inputSchema.schema.fields) }
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
  formType: PropTypes.oneOf([ 'pf3', 'pf4' ]),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  canReset: PropTypes.bool,
  schema: PropTypes.object.isRequired,
  schemaType: PropTypes.oneOf([ 'mozilla', 'miq', 'default' ]),
  buttonsLabels: PropTypes.object,
  disableSubmit: PropTypes.arrayOf(PropTypes.string),
  initialValues: PropTypes.object,
  uiSchema: PropTypes.object,
  showFormControls: PropTypes.bool,
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
  clearOnUnmount: PropTypes.bool,
  validate: PropTypes.func,
  onStateUpdate: PropTypes.func,
  renderFormButtons: PropTypes.oneOfType([ PropTypes.node, PropTypes.element, PropTypes.func ]),
  subscription: PropTypes.shape({ [PropTypes.string]: PropTypes.bool }),
};

FormRenderer.defaultProps = {
  formType: 'pf3',
  resetAble: false,
  schemaType: 'default',
  buttonsLabels: {},
  disableSubmit: [],
  initialValues: {},
  uiSchema: {},
  showFormControls: true,
  clearOnUnmount: false,
  buttonClassName: '',
};
