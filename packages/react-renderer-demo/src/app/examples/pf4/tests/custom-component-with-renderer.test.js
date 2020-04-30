import React from 'react';
import { mount } from 'enzyme';
import FormRenderer from '@data-driven-forms/react-form-renderer/dist/cjs/form-renderer';

import { FormTemplate } from '@data-driven-forms/pf4-component-mapper/dist/cjs';
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

const createSchema = ({ label = 'Custom label', validate = [], ...rest }) => ({
  fields: [
    {
      name: 'custom-component',
      component: 'custom-component',
      label,
      validate,
      ...rest
    }
  ]
});

const RendererWrapper = (props) => (
  <FormRenderer
    onSubmit={() => {}}
    FormTemplate={FormTemplate}
    componentMapper={{
      'custom-component': CustomComponent
    }}
    schema={{ fields: [] }}
    {...props}
  />
);

describe('<CustomComponent /> with renderer', () => {
  it('should render component to snapshot', () => {
    const wrapper = mount(<RendererWrapper schema={createSchema({})} />);
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });
  it('should render component in error state to snapshot', () => {
    const wrapper = mount(<RendererWrapper schema={createSchema({ validate: [{ type: 'required' }] })} />);
    expect(toJson(wrapper.find(CustomComponent))).toMatchSnapshot();
  });

  it('should call sideEffect when the input change', () => {
    const sideEffect = jest.fn();
    const wrapper = mount(<RendererWrapper schema={createSchema({ sideEffect })} />);
    wrapper.find('input[name="custom-component"]').simulate('change', { target: { value: 'foo' } });
    expect(sideEffect).toHaveBeenCalledTimes(1);
  });
});
