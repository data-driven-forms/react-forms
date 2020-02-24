import React from 'react';
import { useFormApi, FormSpy } from '@data-driven-forms/react-form-renderer';

const isDisabled = (disableStates, getState) => disableStates.map((item) => getState()[item]).find((item) => !!item);

const FormTemplate = ({ schema: { title, description }, formFields }) => {
  console.log('render of the form');

  const { handleSubmit, getState, onReset, onCancel } = useFormApi();

  return (
    <form onSubmit={handleSubmit}>
      {title && <h1>{title}</h1>}
      {description && <h2>{description}</h2>}
      {formFields}
      <FormSpy>
        {({ submitting, pristine, validating, form: { reset }, values }) => (
          <React.Fragment>
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
