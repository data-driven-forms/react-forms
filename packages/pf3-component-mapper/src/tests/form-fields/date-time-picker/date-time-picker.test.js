import React from 'react';
import { mount } from 'enzyme';

import { DateTimePicker } from '../../../form-fields/date-time-picker/date-time-picker';

describe('<DateTimePicker />', () => {
  it('should use value of type Date', () => {
    const wrapper = mount(<DateTimePicker value={ new Date() } />);
    expect(wrapper.state().selectedDay).toBeInstanceOf(Date);
  });

  it('should convert string value into Date object', () => {
    const wrapper = mount(<DateTimePicker value='2019-11-01T12:31:00.000Z' />);
    expect(wrapper.state().selectedDay).toBeInstanceOf(Date);
  });

  it('should not set state for undefined value', () => {
    const wrapper = mount(<DateTimePicker />);
    expect(wrapper.state().selectedDay).toBeUndefined();
  });
});
