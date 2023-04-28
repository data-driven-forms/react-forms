/* eslint-disable react/prop-types */
import React from 'react';
import { FormRenderer, componentTypes, useFieldApi, FormError as ERROR } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';

import FormTemplate from '../../form-template/form-template';
import userEvent from '@testing-library/user-event';

describe('FormTemplate', () => {
  const DummyField = (props) => {
    const { input } = useFieldApi(props);

    return <input {...input} aria-label={props.name} />;
  };

  const fields = [
    { name: 'field1', component: componentTypes.TEXT_FIELD },
    { name: 'field2', component: componentTypes.TEXT_FIELD },
  ];

  const FormError = ({ formError }) => <span className="formError">{formError}</span>;

  const Form = (props) => <form {...props} />;

  const Button = ({ label, children, buttonType, ...props }) => (
    <button {...props} id={buttonType}>
      {label}
      {children}
    </button>
  );
  const ButtonGroup = (props) => <span className="buttonGroup" {...props} />;

  const Title = (props) => <h1 {...props}>{props.children}</h1>;

  const Description = (props) => <small {...props} />;

  const FormTemplateTest = (props) => (
    <FormTemplate
      BeforeError={FormError}
      FormWrapper={Form}
      Button={Button}
      ButtonGroup={ButtonGroup}
      Title={Title}
      Description={Description}
      {...props}
    />
  );

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: FormTemplateTest,
    componentMapper: { [componentTypes.TEXT_FIELD]: DummyField },
    schema: {
      fields,
    },
  };

  it('Renders correctly', async () => {
    render(<FormRenderer {...rendererProps} />);

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByLabelText('field1')).toBeInTheDocument();
    expect(screen.getByLabelText('field2')).toBeInTheDocument();
  });

  it('Renders correctly - fully enabled', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        schema={{
          title: 'some-title',
          description: 'some-description',
          fields,
        }}
        FormTemplate={(props) => <FormTemplateTest {...props} canReset />}
      />
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();

    expect(screen.getByText('some-title')).toBeInTheDocument();
    expect(screen.getByText('some-description')).toBeInTheDocument();

    expect(screen.getByLabelText('field1')).toBeInTheDocument();
    expect(screen.getByLabelText('field2')).toBeInTheDocument();
  });

  it('Renders correctly - with label', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        schema={{
          label: 'some-title',
          fields,
        }}
        FormTemplate={(props) => <FormTemplateTest {...props} canReset />}
      />
    );

    expect(screen.getByText('some-title')).toBeInTheDocument();
  });

  it('Calls submit', async () => {
    const spy = jest.fn();

    render(<FormRenderer {...rendererProps} onSubmit={spy} />);

    await userEvent.click(screen.getByText('Submit'));

    expect(spy).toHaveBeenCalled();
  });

  it('Calls reset', async () => {
    render(<FormRenderer {...rendererProps} FormTemplate={(props) => <FormTemplateTest {...props} canReset />} />);

    await userEvent.type(screen.getByLabelText('field1'), 'y');

    expect(screen.getByLabelText('field1')).toHaveValue('y');

    await userEvent.click(screen.getByText('Reset'));

    expect(screen.getByLabelText('field1')).toHaveValue('');
  });

  it('Calls cancel', async () => {
    const spy = jest.fn();

    render(<FormRenderer {...rendererProps} onCancel={spy} />);

    await userEvent.click(screen.getByText('Cancel'));

    expect(spy).toHaveBeenCalled();
  });

  it('Changes button order', async () => {
    const { container } = render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        FormTemplate={(props) => <FormTemplateTest {...props} canReset buttonOrder={['cancel', 'submit', 'reset']} />}
      />
    );

    expect([...container.getElementsByTagName('button')].map((e) => e.textContent)).toEqual(['Cancel', 'Submit', 'Reset']);
  });

  it('Changes button order - default', async () => {
    const { container } = render(
      <FormRenderer {...rendererProps} onCancel={jest.fn()} FormTemplate={(props) => <FormTemplateTest {...props} canReset buttonOrder={[]} />} />
    );

    expect([...container.getElementsByTagName('button')].map((e) => e.textContent)).toEqual(['Submit', 'Reset', 'Cancel']);
  });

  it('Changes labels', async () => {
    const { container } = render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        FormTemplate={(props) => <FormTemplateTest {...props} canReset submitLabel="save" cancelLabel="discard" resetLabel="retry" />}
      />
    );

    expect([...container.getElementsByTagName('button')].map((e) => e.textContent)).toEqual(['save', 'retry', 'discard']);
  });

  it('Changes button className', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        FormTemplate={(props) => <FormTemplateTest {...props} buttonClassName="custom-button-classname" />}
      />
    );

    expect(screen.getByText('Submit').closest('.custom-button-classname')).toBeDefined();
  });

  it('Hide form controls', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        FormTemplate={(props) => <FormTemplateTest {...props} canReset showFormControls={false} />}
      />
    );

    expect(() => screen.getByText('Submit')).toThrow();
    expect(() => screen.getByText('Reset')).toThrow();
    expect(() => screen.getByText('Cancel')).toThrow();
  });

  it('Custom buttons', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onCancel={jest.fn()}
        FormTemplate={(props) => <FormTemplateTest {...props} FormButtons={() => <div id="custom-buttons">custom buttons</div>} />}
      />
    );
    expect(screen.getByText('custom buttons')).toBeInTheDocument();
  });

  it('shows form error', async () => {
    render(
      <FormRenderer
        {...rendererProps}
        onSubmit={() => ({
          [ERROR]: 'form error',
        })}
      />
    );

    expect(() => screen.getByText('form error')).toThrow();

    await userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('form error')).toBeInTheDocument();
  });
});
