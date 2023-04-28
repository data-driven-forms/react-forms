/* eslint-disable react/prop-types */
import React from 'react';
import { FormRenderer, componentTypes, useFormApi, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MultipleChoiceList from '../../multiple-choice-list';

describe('multiple choice list', () => {
  let wrapperProps;

  const SingleCheckbox = ({ isDisabled, label, option, meta, ...props }) => (
    <React.Fragment>
      <label>{label}</label>
      <input {...props} aria-label={option.value} disabled={isDisabled} />
    </React.Fragment>
  );

  const Wrapper = ({ children, ...props }) => {
    wrapperProps = props;
    return <div className="wrapper">{children}</div>;
  };

  const Checkbox = (props) => <MultipleChoiceList Checkbox={SingleCheckbox} Wrapper={Wrapper} {...props} />;

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: ({ formFields }) => {
      const { handleSubmit } = useFormApi();
      return (
        <form onSubmit={handleSubmit}>
          {formFields}
          <button type="submit">Submit</button>
        </form>
      );
    },
    componentMapper: { [componentTypes.CHECKBOX]: Checkbox },
    schema: {
      fields: [
        {
          name: 'check',
          component: componentTypes.CHECKBOX,
          label: 'Select animals',
          helperText: 'some helper text',
          isRequired: true,
          options: [
            {
              value: 'cats',
              label: 'l cats',
            },
            {
              value: 'cats_1',
              label: 'l cats_1',
            },
            {
              value: 'cats_2',
              label: 'l cats_2',
            },
            {
              value: 'zebras',
              label: 'l zebras',
            },
            {
              value: 'pigeons',
              label: 'l pigeons',
            },
          ],
        },
      ],
    },
  };

  it('renders correctly', async () => {
    const { container } = render(<FormRenderer {...rendererProps} />);

    expect(wrapperProps).toEqual({
      description: undefined,
      error: undefined,
      helperText: 'some helper text',
      isRequired: true,
      label: 'Select animals',
      meta: {
        active: false,
        data: {},
        dirty: false,
        dirtySinceLastSubmit: false,
        error: undefined,
        initial: undefined,
        invalid: false,
        length: undefined,
        modified: false,
        modifiedSinceLastSubmit: false,
        pristine: true,
        submitError: undefined,
        submitFailed: false,
        submitSucceeded: false,
        submitting: false,
        touched: false,
        valid: true,
        validating: false,
        visited: false,
      },
      name: 'check',
      rest: {},
      showError: false,
    });

    expect([...container.getElementsByTagName('label')].map((l) => l.textContent)).toEqual([
      'l cats',
      'l cats_1',
      'l cats_2',
      'l zebras',
      'l pigeons',
    ]);
    expect([...container.getElementsByTagName('input')].map((i) => i.value)).toEqual(['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons']);
  });

  it('show error', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        schema={{
          fields: [{ ...rendererProps.schema.fields[0], validate: [{ type: 'required' }] }],
        }}
      />
    );

    fireEvent.focusIn(screen.getByLabelText('cats'));
    fireEvent.focusOut(screen.getByLabelText('cats'));

    expect(wrapperProps).toEqual({
      description: undefined,
      error: 'Required',
      helperText: 'some helper text',
      isRequired: true,
      label: 'Select animals',
      meta: {
        active: false,
        data: {},
        dirty: false,
        dirtySinceLastSubmit: false,
        error: 'Required',
        initial: undefined,
        invalid: true,
        length: undefined,
        modified: false,
        modifiedSinceLastSubmit: false,
        pristine: true,
        submitError: undefined,
        submitFailed: false,
        submitSucceeded: false,
        submitting: false,
        touched: true,
        valid: false,
        validating: false,
        visited: true,
      },
      name: 'check',
      rest: {},
      showError: true,
    });
  });

  it('show submit error', async () => {
    render(<FormRenderer {...rendererProps} onSubmit={() => ({ check: 'submitError' })} />);

    await userEvent.click(screen.getByText('Submit'));

    expect(wrapperProps).toEqual({
      description: undefined,
      error: 'submitError',
      helperText: 'some helper text',
      isRequired: true,
      label: 'Select animals',
      meta: {
        active: false,
        data: {},
        dirty: false,
        dirtySinceLastSubmit: false,
        error: undefined,
        initial: undefined,
        invalid: true,
        length: undefined,
        modified: false,
        modifiedSinceLastSubmit: false,
        pristine: true,
        submitError: 'submitError',
        submitFailed: true,
        submitSucceeded: false,
        submitting: false,
        touched: true,
        valid: false,
        validating: false,
        visited: false,
      },
      name: 'check',
      rest: {},
      showError: true,
    });
  });

  it('should set showError to true if validateOnMount prop is set to true on mount', () => {
    render(
      <FormRenderer
        {...rendererProps}
        schema={{
          ...rendererProps.schema,
          fields: [{ ...rendererProps.schema.fields[0], validateOnMount: true, validate: [{ type: validatorTypes.REQUIRED }] }],
        }}
        onSubmit={() => undefined}
      />
    );

    expect(wrapperProps).toEqual({
      description: undefined,
      error: 'Required',
      helperText: 'some helper text',
      isRequired: true,
      label: 'Select animals',
      meta: {
        active: false,
        data: {},
        dirty: false,
        dirtySinceLastSubmit: false,
        error: 'Required',
        initial: undefined,
        invalid: true,
        length: undefined,
        modified: false,
        modifiedSinceLastSubmit: false,
        pristine: true,
        submitError: undefined,
        submitFailed: false,
        submitSucceeded: false,
        submitting: false,
        touched: false,
        valid: false,
        validating: false,
        visited: false,
      },
      name: 'check',
      rest: {},
      showError: true,
    });
  });
});
