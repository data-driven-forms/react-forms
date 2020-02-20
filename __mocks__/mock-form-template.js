import React from 'react';

const FormTemplate = ({ schema: { title, label, description }, formFields, formOptions, FormSpy }) => {
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
