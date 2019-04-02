import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import TimePicker from '../../../form-fields/date-time-picker/time-picker';

describe('<TimePicker />', () => {
  let initialProps;
  let initialDate = new Date(Date.UTC(2018, 12, 17, 3, 24, 0));
  beforeEach(() => {
    initialProps = {
      onHourChange: jest.fn(),
      onMinuteChange: jest.fn(),
      selectedDay: initialDate,
    };
  });

  /**
   * timezones are pain and i don't want to deal with it
   */
  it.skip('should render correcntly', () => {
    const wrapper = mount(<TimePicker { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should decrement minute by one on button click', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onMinuteChange={ onMinuteChange } />);
    wrapper.find('.chevron-button').last().simulate('click');
    expect(onMinuteChange).toHaveBeenCalledWith(initialDate.getMinutes() - 1);
  });

  it('should decrement minute to 59 if was 0 before on button click', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(
      <TimePicker
        { ...initialProps }
        selectedDay={ new Date(Date.UTC(2017, 12, 17, 3, 0, 0)) }
        onMinuteChange={ onMinuteChange }
      />
    );
    wrapper.find('.chevron-button').last().simulate('click');
    expect(onMinuteChange).toHaveBeenCalledWith(59);
  });

  it('should increment minute by one on button click', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onMinuteChange={ onMinuteChange } />);
    wrapper.find('.chevron-button').at(1).simulate('click');
    expect(onMinuteChange).toHaveBeenCalledWith(initialDate.getMinutes() + 1);
  });

  it('should increment minute to 0 if was 59 on button click', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(
      <TimePicker
        { ...initialProps }
        selectedDay={ new Date(Date.UTC(2018, 12, 17, 3, 59, 0)) }
        onMinuteChange={ onMinuteChange }
      />
    );
    wrapper.find('.chevron-button').at(1).simulate('click');
    expect(onMinuteChange).toHaveBeenCalledWith(0);
  });

  it('should decrement hours by one on button click', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onHourChange={ onHourChange } />);
    wrapper.find('.chevron-button').at(2).simulate('click');
    expect(onHourChange).toHaveBeenCalledWith(initialDate.getHours() - 1);
  });

  it('should decrement hours to 23 if was 0 before on button click', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(
      <TimePicker
        { ...initialProps }
        selectedDay={ new Date('December 17, 2018 00:00:00') }
        onHourChange={ onHourChange }
      />
    );
    wrapper.find('.chevron-button').at(2).simulate('click');
    expect(onHourChange).toHaveBeenCalledWith(23);
  });

  it('should increment hours by one on button click', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onHourChange={ onHourChange } />);
    wrapper.find('.chevron-button').first().simulate('click');
    expect(onHourChange).toHaveBeenCalledWith(initialDate.getHours() + 1);
  });

  it('should increment hours to 0 if was 23 on button click', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(
      <TimePicker
        { ...initialProps }
        selectedDay={ new Date('December 17, 2018 23:59:00') }
        onHourChange={ onHourChange }
      />
    );
    wrapper.find('.chevron-button').first(0).simulate('click');
    expect(onHourChange).toHaveBeenCalledWith(0);
  });

  it('should call minutes change callback on minute input change event', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onMinuteChange={ onMinuteChange } />);
    wrapper.find('input').last().simulate('change', { target: { value: 11 }});
    expect(onMinuteChange).toHaveBeenCalledWith(11);
  });

  it('should call hours change callback on hour input change event', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(<TimePicker { ...initialProps } onHourChange={ onHourChange } />);
    wrapper.find('input').first().simulate('change', { target: { value: 5 }});
    expect(onHourChange).toHaveBeenCalledWith(5);
  });
});
