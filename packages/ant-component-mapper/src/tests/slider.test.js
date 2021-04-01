import React from 'react';
import { Form as DDFForm, RendererContext } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import { Slider as AntSlider, Form as OriginalForm } from 'antd';
import Slider from '../slider';
import FormGroup from '../form-group';

const Form = (props) => (
  <OriginalForm>
    <RendererContext.Provider value={{ formOptions: { internalRegisterField: jest.fn(), internalUnRegisterField: jest.fn() } }}>
      <DDFForm onSubmit={jest.fn()} {...props} />
    </RendererContext.Provider>
  </OriginalForm>
);

describe('<Slider />', () => {
  const initialProps = {
    label: 'Slider',
    name: 'slider'
  };

  it('should render default slider with label', () => {
    const wrapper = mount(<Form>{() => <Slider {...initialProps} />}</Form>);
    expect(wrapper.find(AntSlider)).toHaveLength(1);
    expect(wrapper.find(FormGroup)).toHaveLength(1);
  });

  it('should have disabled prop when isDisabled is passed', () => {
    const wrapper = mount(<Form>{() => <Slider {...initialProps} isDisabled />}</Form>);
    expect(wrapper.find(AntSlider).prop('disabled')).toBe(true);
  });

  it('should set value to array after first render if range propery is true', () => {
    const wrapper = mount(<Form>{() => <Slider {...initialProps} range isDisabled />}</Form>);
    wrapper.update();
    expect(wrapper.find(AntSlider).prop('value')).toEqual([0, 100]);
  });

  it('min/max should default to 0/100', () => {
    const wrapper = mount(<Form>{() => <Slider {...initialProps} />}</Form>);
    wrapper.update();
    expect(wrapper.find(AntSlider).prop('min')).toBe(0);
    expect(wrapper.find(AntSlider).prop('max')).toBe(100);
  });
});
