/* eslint-disable react/prop-types, react/no-unused-prop-types */
import React from 'react';
import { useFormApi, FormSpy, FormOptions } from '../src';
import { FormTemplateRenderProps } from '../src/common-types/form-template-render-props';

interface FormSpyProps {
  submitting: boolean;
  pristine: boolean;
  validating: boolean;
  valid: boolean;
  form: {
    reset: () => void;
  };
  values: Record<string, any>;
}

const isDisabled = (disableStates: string[], getState: FormOptions['getState']): boolean =>
  disableStates.map((item) => (getState() as any)[item]).find((item) => !!item);

const FormTemplate = ({ schema: { title, description }, formFields }: FormTemplateRenderProps) => {
  const { handleSubmit, getState, onReset, onCancel } = useFormApi();
  return (
    <form onSubmit={handleSubmit}>
      {title && <h1>{title}</h1>}
      {description && <h2>{description}</h2>}
      {formFields}
      <FormSpy>
        {({ submitting, pristine, validating, valid, form: { reset }, values }: FormSpyProps) => (
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
            <button key="form-cancel" type="button" disabled={pristine} onClick={() => onCancel?.(values)}>
              Cancel
            </button>
          </React.Fragment>
        )}
      </FormSpy>
    </form>
  );
};

export default FormTemplate;
