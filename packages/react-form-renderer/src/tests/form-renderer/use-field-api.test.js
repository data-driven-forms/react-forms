import React, { Component } from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import useFieldApi from '../../use-field-api';
import componentTypes from '../../component-types';
import Form from '../../form';
import RendererContext from '../../renderer-context';
import validatorTypes from '../../validator-types';

describe('useFieldApi', () => {
  const Catcher = ({ children }) => children;
  const registerInputFileSpy = jest.fn();

  const TestField = (props) => {
    const rest = useFieldApi(props);

    return (
      <Catcher {...rest}>
        <input {...rest.input} />
      </Catcher>
    );
  };

  class WrapperComponent extends Component {
    render() {
      const { onSubmit, ...props } = this.props;
      return (
        <Form onSubmit={onSubmit}>
          {({ handleSubmit, form: { reset } }) => (
            <form onSubmit={handleSubmit}>
              <RendererContext.Provider
                value={{
                  formOptions: {
                    registerInputFile: registerInputFileSpy
                  },
                  validatorMapper: { required: () => (value) => (!value ? 'required' : undefined) }
                }}
              >
                <TestField reset={reset} {...props} />
              </RendererContext.Provider>
            </form>
          )}
        </Form>
      );
    }
  }

  let initialProps;
  let onSubmit;

  beforeEach(() => {
    onSubmit = jest.fn();
    initialProps = {
      name: 'some-name',
      component: 'text-field',
      onSubmit: (values) => onSubmit(values)
    };
    registerInputFileSpy.mockClear();
  });

  it('reloads type when component changes', () => {
    const wrapper = mount(<WrapperComponent {...initialProps} />);

    expect(wrapper.find(Catcher).props().input.type).toEqual(undefined);

    wrapper.setProps({ component: componentTypes.RADIO });
    wrapper.update();

    expect(wrapper.find(Catcher).props().input.type).toEqual('radio');
  });

  it('reloads validator when dataType changes', () => {
    const wrapper = mount(<WrapperComponent {...initialProps} />);

    wrapper.find('form').simulate('submit');
    wrapper.update();
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    // validate is not checked in useField, so you have to change key too
    wrapper.setProps({ dataType: 'number', key: 'somekey' });
    wrapper.update();

    wrapper.find('input').simulate('change', { target: { value: 'ABC' } });
    wrapper.update();

    wrapper.find('form').simulate('submit');
    wrapper.update();
    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(wrapper.find(Catcher).props().meta.error).toEqual('Values must be number');
  });

  it('reloads validator when validate changes', async () => {
    const wrapper = mount(<WrapperComponent {...initialProps} />);

    wrapper.find('form').simulate('submit');
    wrapper.update();
    expect(onSubmit).toHaveBeenCalledWith({});
    onSubmit.mockClear();

    // validate is not checked in useField, so you have to change key too
    wrapper.setProps({ validate: [{ type: 'required' }], key: 'somekey' });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(Catcher)
        .props()
        .reset();
    });
    wrapper.update();

    wrapper.find('form').simulate('submit');
    wrapper.update();
    expect(onSubmit).not.toHaveBeenCalled();
    onSubmit.mockClear();

    expect(wrapper.find(Catcher).props().meta.error).toEqual('required');
  });

  it('reloads array validator when dataType changes', () => {
    initialProps = {
      ...initialProps,
      component: componentTypes.FIELD_ARRAY
    };

    const wrapper = mount(<WrapperComponent {...initialProps} />);

    expect(wrapper.find(Catcher).props().arrayValidator).toEqual(undefined);

    wrapper.setProps({ dataType: 'number' });
    wrapper.update();

    expect(wrapper.find(Catcher).props().arrayValidator).toEqual(expect.any(Function));
  });

  it('reloads array validator when validate changes', () => {
    initialProps = {
      ...initialProps,
      component: componentTypes.FIELD_ARRAY
    };

    const wrapper = mount(<WrapperComponent {...initialProps} />);

    expect(wrapper.find(Catcher).props().arrayValidator).toEqual(undefined);

    wrapper.setProps({ validate: [{ type: 'required' }] });
    wrapper.update();

    expect(wrapper.find(Catcher).props().arrayValidator).toEqual(expect.any(Function));
  });

  it('reloads initial value', () => {
    const wrapper = mount(<WrapperComponent {...initialProps} />);

    expect(wrapper.find(Catcher).props().meta.initial).toEqual(undefined);

    wrapper.setProps({ initialValue: 'pepa' });
    wrapper.update();

    expect(wrapper.find(Catcher).props().meta.initial).toEqual('pepa');
  });

  it('should assing correct value to type file input', () => {
    const wrapper = mount(
      <WrapperComponent
        {...initialProps}
        name="file-input"
        type="file"
        initialValue={{
          inputValue: '',
          inputFiles: []
        }}
      />
    );

    expect(wrapper.find('input').prop('value')).toEqual('');
    expect(registerInputFileSpy).toHaveBeenCalledWith('file-input');
  });

  it('should not crash when passing validate directly', () => {
    const TestDummy = ({ validate }) => {
      const { input } = useFieldApi({
        name: 'foo',
        validate: validate ? [{ type: validatorTypes.REQUIRED }] : [{ type: validatorTypes.URL }]
      });
      return <input {...input} id="foo" />;
    };

    const FormWrapper = ({ validate = true }) => (
      <Form onSubmit={jest.fn()}>
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <RendererContext.Provider
              value={{
                validatorMapper: { required: () => (value) => (!value ? 'required' : undefined), url: () => jest.fn() },
                formOptions: {}
              }}
            >
              <TestDummy validate={validate} />
            </RendererContext.Provider>
          </form>
        )}
      </Form>
    );

    const wrapper = mount(<FormWrapper />);
    expect(wrapper.find('input')).toHaveLength(1);
    wrapper.find('#foo').simulate('change', { target: { value: 'bar' } });
    wrapper.update();
    wrapper.setProps({ validate: false });
    wrapper.update();
    expect(wrapper.find('input')).toHaveLength(1);
  });
});
