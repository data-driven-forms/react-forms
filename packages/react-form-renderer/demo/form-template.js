/* eslint-disable react/prop-types */
import React from 'react';
import { useFormApi, FormSpy } from '../src';

const isDisabled = (disableStates, getState) => disableStates.map((item) => getState()[item]).find((item) => !!item);

const FormTemplate = ({ schema: { title, description }, formFields }) => {
  const { handleSubmit, getState, onReset, onCancel } = useFormApi();
  return (
    <form onSubmit={handleSubmit}>
      {title && <h1>{title}</h1>}
      {description && <h2>{description}</h2>}
      {formFields}
      <FormSpy>
        {({ submitting, pristine, validating, valid, form: { reset }, values }) => (
          <React.Fragment>
            {JSON.stringify({ pristine, valid })}
            <button key="form-submit" type="submit" disabled={submitting || validating || isDisabled(['invalid'], getState)}>
              Submit
            </button>
            <button
              key="form-reset"
              type="button"
              disabled={pristine}
              onClick={() => {
                onReset && onReset();
                reset();
              }}
            >
              Reset
            </button>
            <button key="form-cancel" type="button" disabled={pristine} onClick={() => onCancel(values)}>
              Cancel
            </button>
          </React.Fragment>
        )}
      </FormSpy>
    </form>
  );
};

export default FormTemplate;
