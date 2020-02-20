import React from 'react';

const isDisabled = (disableStates, getState) => disableStates.map(item => getState()[item]).find(item => !!item);

const FormTemplate = ({ schema: { title, description }, formFields, formOptions, FormSpy }) => {
  console.log('render of the form');

  return (
    <form onSubmit={ formOptions.handleSubmit }>
      { title && <h1>{ title }</h1> }
      { description && <h2>{ description }</h2> }
      { formFields }
      <FormSpy>
        { ({ submitting, pristine, validating, form: { reset }, values }) => (
          <React.Fragment>
            <button
              key="form-submit"
              type="submit"
              disabled={ submitting || validating || isDisabled([ 'invalid' ], formOptions.getState) }
            >
            Submit
            </button>
            <button
              key="form-reset"
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
              key="form-cancel"
              type="button"
              disabled={ pristine }
              onClick={ () => formOptions.onCancel(values) }
            >
            Cancel
            </button>
          </React.Fragment>) }
      </FormSpy>
    </form>
  );};

export default FormTemplate;
