import React from 'react';
import { mount } from 'enzyme';
import ClearIndicator from '../../../components/select/clear-indicator';

describe('<ClearIndicator />', () => {
  const initialProps = {
    innerProps: {},
  };

  it('should call clearValue on click', () => {
    const clearValue = jest.fn();
    const wrapper = mount(<ClearIndicator { ...initialProps } clearValue={ clearValue } />);
    wrapper.find('button').simulate('click');
    expect(clearValue).toHaveBeenCalledTimes(1);
  });
});

