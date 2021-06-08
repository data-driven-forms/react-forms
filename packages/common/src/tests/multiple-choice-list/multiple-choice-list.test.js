/* eslint-disable react/prop-types */
import React from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, componentTypes, useFormApi } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import MultipleChoiceList from '../../multiple-choice-list';

describe('multiple choice list', () => {
  let wrapper;
  let wrapperProps;

  const SingleCheckbox = ({ isDisabled, label, option, meta, ...props }) => (
    <React.Fragment>
      <label>{label}</label>
      <input {...props} disabled={isDisabled} />
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
      return <form onSubmit={handleSubmit}>{formFields}</form>;
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
              label: 'l cats'
            },
            {
              value: 'cats_1',
              label: 'l cats_1'
            },
            {
              value: 'cats_2',
              label: 'l cats_2'
            },
            {
              value: 'zebras',
              label: 'l zebras'
            },
            {
              value: 'pigeons',
              label: 'l pigeons'
            }
          ]
        }
      ]
    }
  };

  it('renders correctly', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

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
        visited: false
      },
      name: 'check',
      rest: {},
      showError: false
    });
    expect(wrapper.find(SingleCheckbox)).toHaveLength(5);

    expect(wrapper.find('label').map((l) => l.text())).toEqual(['l cats', 'l cats_1', 'l cats_2', 'l zebras', 'l pigeons']);
    expect(wrapper.find('input').map((i) => i.props().value)).toEqual(['cats', 'cats_1', 'cats_2', 'zebras', 'pigeons']);
  });

  it('show error', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [{ ...rendererProps.schema.fields[0], validate: [{ type: 'required' }] }]
          }}
        />
      );
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('focus');
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('change', { target: { checked: false, type: 'checkbox' } });
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find('input')
        .first()
        .simulate('blur');
    });
    wrapper.update();

    expect(wrapperProps).toEqual({
      description: undefined,
      error: 'Required',
      helperText: 'some helper text',
      isRequired: true,
      label: 'Select animals',
      meta: {
        active: false,
        data: {},
        dirty: true,
        dirtySinceLastSubmit: false,
        error: 'Required',
        initial: undefined,
        invalid: true,
        modified: false,
        modifiedSinceLastSubmit: false,
        pristine: false,
        submitError: undefined,
        submitFailed: false,
        submitSucceeded: false,
        submitting: false,
        touched: true,
        valid: false,
        validating: false,
        visited: true,
        warning: undefined
      },
      name: 'check',
      rest: {},
      showError: 'Required'
    });
  });

  it('show submit error', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} subscription={{ submitFailed: true }} onSubmit={() => ({ check: 'submitError' })} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('form').simulate('submit');
    });
    wrapper.update();

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
        warning: undefined
      },
      name: 'check',
      rest: {},
      showError: 'submitError'
    });
  });
});
