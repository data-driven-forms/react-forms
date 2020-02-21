import React from 'react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { useFormApi as useFormApiInternal } from '../packages/react-form-renderer/src';
const path = require('path')

const FormTemplate = ({ schema: { title, label, description }, formFields, FormSpy }) => {
  // When testing inside the renderer package, it cannot import things from itself!
  const isInternal = path.dirname(module.parent.filename).includes('/react-form-renderer/');

  const formOptions = isInternal ? useFormApiInternal() : useFormApi();

  return (
    <form onSubmit={ formOptions.handleSubmit }>
      { title || label && <h1>{ title || label }</h1> }
      { description && <h2>{ description }</h2> }
      { formFields }
      <FormSpy>
        { ({ submitting, pristine, validating, form: { reset }, values }) => (
          <React.Fragment>
            <button
              type="submit"
              disabled={ submitting || validating || formOptions.getState().invalid }
            >
            Submit
            </button>
            <button
              type="button"
              disabled={ pristine }
              onClick={ () => {
                formOptions.onReset && formOptions.onReset();
                reset();
              } }
            >
            Reset
            </button>
            <button
              type="button"
              disabled={ pristine }
              onClick={ () => formOptions.onCancel(values) }
            >
            Cancel
            </button>
          </React.Fragment>) }
      </FormSpy>
    </form>
  );
};

export default FormTemplate;
