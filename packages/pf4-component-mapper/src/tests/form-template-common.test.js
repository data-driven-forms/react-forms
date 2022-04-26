import React from 'react';
import { FormRenderer, Form, FormError } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormTemplate from '../form-template';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import componentMapper from '../component-mapper';

describe('FormTemplate PF4 Common', () => {
  let initialProps;
  let ContextWrapper;
  let formOptions;

  beforeEach(() => {
    formOptions = {
      onSubmit: jest.fn(),
      onReset: jest.fn(),
      onCancel: jest.fn(),
      canReset: true,
      pristine: true,
      getState: jest.fn().mockImplementation(() => ({})),
    };
    ContextWrapper = ({ children, ...props }) => (
      <RenderWithProvider value={{ formOptions }}>
        <Form onSubmit={jest.fn()}>{() => children}</Form>
      </RenderWithProvider>
    );
    initialProps = {
      formFields: <div>Formfields</div>,
      schema: {},
    };
  });

  it('should render title', () => {
    initialProps = {
      ...initialProps,
      schema: { title: 'I am title' },
    };

    render(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(screen.getByText('I am title')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should hide buttons', () => {
    render(
      <ContextWrapper>
        <FormTemplate {...initialProps} showFormControls={false} />
      </ContextWrapper>
    );

    expect(() => screen.getByText('Submit')).toThrow();
    expect(() => screen.getByText('Cancel')).toThrow();
  });

  it('should render description', () => {
    initialProps = {
      ...initialProps,
      schema: { description: 'I am description' },
    };

    render(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );

    expect(screen.getByText('I am description')).toBeInTheDocument();
  });

  it('should render custom formControls', () => {
    const FormButtons = () => <div>Form Controls</div>;

    render(
      <ContextWrapper>
        <FormTemplate {...initialProps} FormButtons={FormButtons} />
      </ContextWrapper>
    );

    expect(screen.getByText('Form Controls')).toBeInTheDocument();
    expect(() => screen.getByText('Submit')).toThrow();
    expect(() => screen.getByText('Cancel')).toThrow();
  });

  it('should render all controls and with default labels', () => {
    const { container } = render(
      <ContextWrapper>
        <FormTemplate {...initialProps} />
      </ContextWrapper>
    );
    expect([...container.getElementsByTagName('button')].map((b) => b.textContent)).toEqual(['Submit', 'Cancel']);
  });

  it('should render only submit button', () => {
    const { container } = render(
      <ContextWrapper>
        <FormTemplate {...initialProps} canReset={false} onCancel={undefined} />
      </ContextWrapper>
    );
    expect([...container.getElementsByTagName('button')].map((b) => b.textContent)).toEqual(['Submit']);
  });

  it('should render buttons in correct order', () => {
    const { container } = render(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={['cancel', 'submit', 'reset']} />
      </ContextWrapper>
    );

    expect([...container.getElementsByTagName('button')].map((b) => b.textContent)).toEqual(['Cancel', 'Submit', 'Reset']);
  });

  it('should add missing buttons if not defined in button order', () => {
    const { container } = render(
      <ContextWrapper>
        <FormTemplate {...initialProps} canSubmit canReset buttonOrder={[]} />
      </ContextWrapper>
    );

    expect([...container.getElementsByTagName('button')].map((b) => b.textContent)).toEqual(['Submit', 'Reset', 'Cancel']);
  });

  it('should call cancel with form values', async () => {
    const expectedValues = { name: 'some name', b: { type: 'good' } };

    const onCancel = jest.fn();

    render(
      <FormRenderer
        onCancel={(values) => onCancel(values)}
        schema={{ fields: [] }}
        onSubmit={jest.fn}
        FormTemplate={FormTemplate}
        initialValues={expectedValues}
        componentMapper={{}}
      />
    );

    await userEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalledWith(expectedValues);
  });

  it('show form alert message', async () => {
    render(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
              'aria-label': 'text',
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: 'some error title' };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    expect(() => screen.getByText('some error title')).toThrow();

    await userEvent.type(screen.getByLabelText('text'), 'something');

    expect(screen.getByText('some error title')).toBeInTheDocument();
  });

  it('show form alert message as object', async () => {
    render(
      <FormRenderer
        schema={{
          fields: [
            {
              component: 'text-field',
              name: 'field',
              'aria-label': 'text',
            },
          ],
        }}
        validate={({ field }) => {
          if (field) {
            return { [FormError]: { title: 'some error title', description: 'some description' } };
          }
        }}
        onSubmit={jest.fn()}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
      />
    );

    expect(() => screen.getByText('some error title')).toThrow();
    expect(() => screen.getByText('some description')).toThrow();

    await userEvent.type(screen.getByLabelText('text'), 'something');

    expect(screen.getByText('some error title')).toBeInTheDocument();
    expect(screen.getByText('some description')).toBeInTheDocument();
  });
});
