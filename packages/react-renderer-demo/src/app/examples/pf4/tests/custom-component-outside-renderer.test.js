import React from 'react';
import { mount } from 'enzyme';
import Form from '@data-driven-forms/react-form-renderer/dist/cjs/form';
import RendererContext from '@data-driven-forms/react-form-renderer/dist/cjs/renderer-context';

import useFieldApi from '@data-driven-forms/react-form-renderer/dist/cjs/use-field-api';
import toJson from 'enzyme-to-json';

const CustomComponent = (props) => {
  const { input, meta, label, sideEffect } = useFieldApi(props);
  return (
    <div className="input-wrapper">
      <label className="input-label">{label}</label>
      <input
        {...input}
        onChange={(...args) => {
          sideEffect(...args); // do something in addition to just changing the value in form state
          input.onChange(...args);
        }}
      />
      {meta.error && (
        <div className="custom-error-block">
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

CustomComponent.defaultProps = {
  sideEffect: () => {}
};

const FormWrapper = ({ props, children }) => (
  <Form onSubmit={() => {}} {...props}>
    {() => (
      <form>
        <RendererContext.Provider
          value={{
            formOptions: {},
            validatorMapper: { required: () => (value) => (value ? undefined : 'required') }
          }}
        >
          {children}
        </RendererContext.Provider>
      </form>
    )}
  </Form>
);

describe('<CustomComponent /> outside renderer', () => {
  it('should render component to snapshot', () => {
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" />
      </FormWrapper>
    );
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });
  it('should render component in error state to snapshot', () => {
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" validate={[{ type: 'required' }]} />
      </FormWrapper>
    );
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });

  it('should call sideEffect when the input change', () => {
    const sideEffect = jest.fn();
    const wrapper = mount(
      <FormWrapper>
        <CustomComponent name="custom-component" label="custom-component" sideEffect={sideEffect} />
      </FormWrapper>
    );
    wrapper.find('input[name="custom-component"]').simulate('change', { target: { value: 'foo' } });
    expect(sideEffect).toHaveBeenCalledTimes(1);
  });
});
