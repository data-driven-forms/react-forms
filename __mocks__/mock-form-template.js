/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useFormApi, FormSpy } from '@data-driven-forms/react-form-renderer';
import { useFormApi as useFormApiInternal, FormSpy as FormSpyInternal } from '../packages/react-form-renderer/src';
const path = require('path');

const FormTemplate = ({ schema: { title, label, description }, formFields }) => {
  // When testing inside the renderer package, it cannot import things from itself!
  const isInternal = path.dirname(module.parent.filename).includes('/react-form-renderer/');
  const formOptions = isInternal ? useFormApiInternal() : useFormApi();
  const FormSpyFinal = isInternal ? FormSpyInternal : FormSpy;

  return (
    <form onSubmit={formOptions.handleSubmit}>
      {(title || label) && <h1>{title || label}</h1>}
      {description && <h2>{description}</h2>}
      {formFields}
      <FormSpyFinal>
        {({ submitting, pristine, validating, form: { reset }, values }) => (
          <React.Fragment>
            <button type="submit" disabled={submitting || validating || formOptions.getState().invalid}>
              Submit
            </button>
            <button
              type="button"
              disabled={pristine}
              onClick={() => {
                formOptions.onReset && formOptions.onReset();
                reset();
              }}
            >
              Reset
            </button>
            <button type="button" disabled={pristine} onClick={() => formOptions.onCancel(values)}>
              Cancel
            </button>
          </React.Fragment>
        )}
      </FormSpyFinal>
    </form>
  );
};

export default FormTemplate;
