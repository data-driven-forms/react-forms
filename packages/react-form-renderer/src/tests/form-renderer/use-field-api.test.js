import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useFieldApi from '../../use-field-api';
import componentTypes from '../../component-types';
import Form from '../../form';
import RendererContext from '../../renderer-context';
import validatorTypes from '../../validator-types';

describe('useFieldApi', () => {
  let catcherProps;

  const Catcher = ({ children, ...rest }) => {
    catcherProps = rest;

    return children;
  };

  const registerInputFileSpy = jest.fn();

  const TestField = (props) => {
    const rest = useFieldApi(props);

    return (
      <Catcher {...rest}>
        <input {...rest.input} aria-label={rest.input.name} />
      </Catcher>
    );
  };

  const WrapperComponent = ({ onSubmit, ...props }) => (
    <Form onSubmit={onSubmit}>
      {({ handleSubmit, form: { reset } }) => (
        <form onSubmit={handleSubmit}>
          <RendererContext.Provider
            value={{
              formOptions: {
                registerInputFile: registerInputFileSpy,
                unRegisterInputFile: jest.fn(),
                internalRegisterField: jest.fn(),
                internalUnRegisterField: jest.fn(),
              },
              validatorMapper: { required: () => (value) => !value ? 'required' : undefined },
            }}
          >
            <TestField reset={reset} {...props} />
            <button type="submit">Submit</button>
          </RendererContext.Provider>
        </form>
      )}
    </Form>
  );

  let initialProps;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      name: 'some-name',
      component: 'text-field',
      onSubmit: (values) => onSubmit(values),
    };
    registerInputFileSpy.mockClear();
    catcherProps = undefined;
  });

  it('reloads type when component changes', () => {
    const { rerender } = render(<WrapperComponent {...initialProps} />);

    expect(catcherProps.input.type).toEqual(undefined);

    rerender(<WrapperComponent {...initialProps} component={componentTypes.RADIO} />);

    expect(catcherProps.input.type).toEqual('radio');
  });

  it('reloads validator when dataType changes', async () => {
    const { rerender } = render(<WrapperComponent {...initialProps} />);

    await userEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    rerender(<WrapperComponent {...initialProps} dataType="number" key="somekey" />);
    await userEvent.type(screen.getByLabelText('some-name'), 'ABC');
    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(catcherProps.meta.error).toEqual('Values must be number');
  });

  it('reloads validator when validate changes', async () => {
    const { rerender } = render(<WrapperComponent {...initialProps} />);

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    // validate is not checked in useField, so you have to change key too
    rerender(<WrapperComponent {...initialProps} validate={[{ type: 'required' }]} key="somekey" />);

    await userEvent.click(screen.getByText('Submit'));

    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(catcherProps.meta.error).toEqual('required');
  });

  it('reloads array validator when dataType changes', () => {
    initialProps = {
      ...initialProps,
      component: componentTypes.FIELD_ARRAY,
    };

    const { rerender } = render(<WrapperComponent {...initialProps} />);

    expect(catcherProps.arrayValidator).toEqual(undefined);

    rerender(<WrapperComponent {...initialProps} dataType="number" />);

    expect(catcherProps.arrayValidator).toEqual(expect.any(Function));
  });

  it('reloads array validator when validate changes', () => {
    initialProps = {
      ...initialProps,
      component: componentTypes.FIELD_ARRAY,
    };

    const { rerender } = render(<WrapperComponent {...initialProps} />);

    expect(catcherProps.arrayValidator).toEqual(undefined);

    rerender(<WrapperComponent {...initialProps} validate={[{ type: 'required' }]} />);

    expect(catcherProps.arrayValidator).toEqual(expect.any(Function));
  });

  it('reloads initial value', () => {
    const { rerender } = render(<WrapperComponent {...initialProps} />);

    expect(catcherProps.meta.initial).toEqual(undefined);

    rerender(<WrapperComponent {...initialProps} initialValue="pepa" />);

    expect(catcherProps.meta.initial).toEqual('pepa');
  });

  it('should assing correct value to type file input', () => {
    render(
      <WrapperComponent
        {...initialProps}
        name="file-input"
        type="file"
        initialValue={{
          inputValue: '',
          inputFiles: [],
        }}
      />
    );

    expect(screen.getByLabelText('file-input')).toHaveValue('');
    expect(registerInputFileSpy).toHaveBeenCalledWith('file-input');
  });

  it('should not crash when passing validate directly', async () => {
    const TestDummy = ({ validate }) => {
      const { input } = useFieldApi({
        name: 'foo',
        validate: validate ? [{ type: validatorTypes.REQUIRED }] : [{ type: validatorTypes.URL }],
      });
      return <input {...input} aria-label="foo" />;
    };

    const FormWrapper = ({ validate = true }) => (
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RendererContext.Provider
              value={{
                validatorMapper: { required: () => (value) => !value ? 'required' : undefined, url: () => jest.fn() },
                formOptions: {
                  internalRegisterField: jest.fn(),
                  internalUnRegisterField: jest.fn(),
                },
              }}
            >
              <TestDummy validate={validate} />
            </RendererContext.Provider>
          </form>
        )}
      </Form>
    );

    const { rerender } = render(<FormWrapper />);

    expect(screen.getByLabelText('foo')).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText('foo'), 'bar');

    rerender(<FormWrapper validate={false} />);

    expect(screen.getByLabelText('foo')).toBeInTheDocument();
  });

  it('omits FieldProps', async () => {
    const parse = jest.fn().mockImplementation((value) => value);
    initialProps = { ...initialProps, FieldProps: { parse } };

    render(<WrapperComponent {...initialProps} />);

    expect(catcherProps.FieldProps).toEqual(undefined);
    expect(parse.mock.calls).toHaveLength(0);

    await userEvent.type(screen.getByLabelText('some-name'), 'bar');

    expect(parse.mock.calls).toHaveLength(3);
  });
});
