import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { componentMapper, FormTemplate } from '../index';
import { CONDITIONAL_SUBMIT_FLAG } from '@data-driven-forms/common/wizard';

describe('wizard', () => {
  let initialProps;
  let schema;
  let onSubmit;
  let onCancel;

  beforeEach(() => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          stepsInfo: [
            {
              title: 'AWS step',
            },
            {
              title: 'Summary',
            },
          ],
          fields: [
            {
              name: 'first-step',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }],
                  inputProps: { 'aria-label': 'aws-field' },
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                },
              ],
            },
          ],
        },
      ],
    };
    onSubmit = jest.fn();
    onCancel = jest.fn();
    initialProps = {
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} showFormControls={false} />,
      schema,
      onSubmit: (values) => onSubmit(values),
      onCancel: (values) => onCancel(values),
    };
  });

  it('simple next and back', () => {
    render(<FormRenderer {...initialProps} />);

    expect(screen.getByText('AWS step')).toHaveClass('Mui-active');
    expect(() => userEvent.click(screen.getByText('Continue'))).toThrow();

    userEvent.type(screen.getByLabelText('aws-field'), 'something');
    userEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Summary')).toHaveClass('Mui-active');

    userEvent.click(screen.getByText('Back'));

    expect(screen.getByText('AWS step')).toHaveClass('Mui-active');
  });

  it('conditional next', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          title: 'A title',
          description: 'A description',
          stepsInfo: [
            {
              title: 'First step',
            },
            {
              title: 'Last step',
            },
          ],
          fields: [
            {
              name: 'first-step',
              nextStep: {
                when: 'aws',
                stepMapper: {
                  aws: 'summary',
                  google: 'google',
                },
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }],
                  inputProps: { 'aria-label': 'aws-field' },
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'summary',
                  label: 'Summary field',
                },
              ],
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'googlesummary',
                  label: 'Google summary',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByText('First step')).toHaveClass('Mui-active');

    userEvent.type(screen.getByLabelText('aws-field'), 'aws');
    userEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Last step')).toHaveClass('Mui-active');
    expect(screen.getAllByText('Summary field')).toHaveLength(2);

    userEvent.click(screen.getByText('Back'));

    expect(screen.getByText('First step')).toHaveClass('Mui-active');

    userEvent.type(screen.getByLabelText('aws-field'), '{backspace}{backspace}{backspace}google');
    userEvent.click(screen.getByText('Continue'));

    expect(screen.getByText('Last step')).toHaveClass('Mui-active');
    expect(screen.getAllByText('Google summary')).toHaveLength(2);
  });

  it('conditional submit', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          title: 'A title',
          description: 'A description',
          fields: [
            {
              name: 'first-step',
              nextStep: {
                when: 'aws',
                stepMapper: {
                  aws: 'summary',
                  google: 'google',
                },
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }],
                  inputProps: { 'aria-label': 'aws-field' },
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                  inputProps: { 'aria-label': 'summary-field' },
                },
              ],
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'googlesummary',
                  inputProps: { 'aria-label': 'google-field' },
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    userEvent.type(screen.getByLabelText('aws-field'), 'aws');
    userEvent.click(screen.getByText('Continue'));
    userEvent.type(screen.getByLabelText('summary-field'), 'summary');
    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'aws',
      summary: 'summary',
    });
    onSubmit.mockClear();

    userEvent.click(screen.getByText('Back'));

    userEvent.type(screen.getByLabelText('aws-field'), '{backspace}{backspace}{backspace}google');
    userEvent.click(screen.getByText('Continue'));
    userEvent.type(screen.getByLabelText('google-field'), 'google summary');
    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'google',
      googlesummary: 'google summary',
    });
    onSubmit.mockClear();
  });

  it('sends values to cancel', () => {
    render(<FormRenderer {...initialProps} />);

    userEvent.type(screen.getByLabelText('aws-field'), 'something');
    userEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledWith({
      aws: 'something',
    });
  });

  it('conditional submit step', () => {
    const submit = jest.fn();
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              name: 'first-step',
              nextStep: {
                when: 'name',
                stepMapper: {
                  aws: 'summary',
                  submit: CONDITIONAL_SUBMIT_FLAG,
                },
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'name',
                  validate: [{ type: validatorTypes.REQUIRED }],
                  inputProps: { 'aria-label': 'name' },
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} onSubmit={submit} schema={schema} />);

    userEvent.type(screen.getByLabelText('name'), 'summary');

    expect(screen.getByText('Continue')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('name'), '{selectall}{backspace}submit');

    expect(screen.getByText('Submit')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit'));

    expect(submit).toHaveBeenCalledWith({ name: 'submit' }, expect.any(Object), expect.any(Object));
  });
});
