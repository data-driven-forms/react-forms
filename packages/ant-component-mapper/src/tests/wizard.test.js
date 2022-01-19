import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
          stepsInfo: [{ title: 'First step' }, { title: 'Summary' }],
          fields: [
            {
              name: 'first-step',
              nextStep: 'summary',
              fields: [
                {
                  'aria-label': 'aws-field',
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }],
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                  'aria-label': 'summary-field',
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

    expect(screen.getByText('First step')).toBeInTheDocument();
    expect(screen.getByText('Summary')).toBeInTheDocument();
    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();

    userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('aws-field'), 'something');

    userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('summary-field')).toBeInTheDocument();

    userEvent.click(screen.getByText('Back'));

    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();

    userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('summary-field')).toBeInTheDocument();

    userEvent.click(screen.getByText('First step'));

    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();
  });

  it('conditional next', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
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
                  'aria-label': 'aws-field',
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'summary',
                  'aria-label': 'summary-field',
                },
              ],
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'googlesummary',
                  'aria-label': 'google-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('aws-field'), 'aws');

    userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('summary-field')).toBeInTheDocument();

    userEvent.click(screen.getByText('Back'));

    expect(screen.getByLabelText('aws-field')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('aws-field'), '{selectall}{backspace}google');
    userEvent.click(screen.getByText('Next'));

    expect(screen.getByLabelText('google-field')).toBeInTheDocument();
  });

  it('conditional submit', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
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
                  'aria-label': 'aws-field',
                },
              ],
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                  'aria-label': 'summary-field',
                },
              ],
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'googlesummary',
                  'aria-label': 'google-field',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} schema={schema} />);

    userEvent.type(screen.getByLabelText('aws-field'), 'aws');
    userEvent.click(screen.getByText('Next'));
    userEvent.type(screen.getByLabelText('summary-field'), 'summary');
    userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'aws',
      summary: 'summary',
    });
    onSubmit.mockClear();

    userEvent.click(screen.getByText('Back'));
    userEvent.type(screen.getByLabelText('aws-field'), '{selectall}{backspace}google');
    userEvent.click(screen.getByText('Next'));
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
                  'aria-label': 'name',
                },
              ],
            },
          ],
        },
      ],
    };

    render(<FormRenderer {...initialProps} onSubmit={submit} schema={schema} />);

    userEvent.type(screen.getByLabelText('name'), 'summary');

    expect(screen.getByText('Next')).toBeInTheDocument();

    userEvent.type(screen.getByLabelText('name'), '{selectall}{backspace}submit');

    expect(screen.getByText('Submit')).toBeInTheDocument();

    userEvent.click(screen.getByText('Submit'));

    expect(submit).toHaveBeenCalledWith({ name: 'submit' }, expect.any(Object), expect.any(Object));
  });
});
