import React from 'react';
import { mount } from 'enzyme';
import Option from '../../../form-fields/select/option';

describe('<Option />', () => {
  const optionProps = {
    getStyles: jest.fn(),
    cx: jest.fn(),
    selectProps: {},
  };
  it('should render in selected variant', () => {
    const wrapper = mount(<Option { ...optionProps }/>);
    expect(wrapper.find('i.selected-indicator.fa.fa-check')).toHaveLength(0);
    wrapper.setProps({ isSelected: true });
    wrapper.update();
    expect(wrapper.find('i.selected-indicator.fa.fa-check')).toHaveLength(1);
  });
});
