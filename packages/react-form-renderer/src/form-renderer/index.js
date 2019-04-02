import React from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import PropTypes from 'prop-types';
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

const renderControls = ({ formStyle, ...props }) => formStyle !== 'wizard' ? <FormControls { ...props }/> : null;

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
      initialValues={{
        ...inputSchema.defaultValues,
        ...initialValues,
      }}
      subscription={{ pristine: true, submitting: true, valid: true }}
      render={ ({ handleSubmit, pristine, valid, form: { reset, mutators, getState, submit, ...form }}) => (
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
                { showFormControls && renderControls({
                  buttonOrder,
                  buttonClassName,
                  onSubmit: handleSubmit,
                  onCancel,
                  canReset,
                  onReset: () => {
                    if (canReset) {
                      onReset && onReset();
                      reset();
                    }},
                  pristine,
                  disableSubmit: isDisabled(disableSubmit, getState),
                  ...buttonsLabels,
                }) }
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
};
