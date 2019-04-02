import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PopoverRoot from '../../../form-fields/date-time-picker/popover-root';
import YearSelector from '../../../form-fields/date-time-picker/year-selector';
import MonthSelector from '../../../form-fields/date-time-picker/month-selector';
import TimePicker from '../../../form-fields/date-time-picker/time-picker';

describe('<PopoverRoot />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      onDayClick: jest.fn(),
      toggleSelectingMonth: jest.fn(),
      toggleSelectingYear: jest.fn(),
      yearChange: jest.fn(),
      monthChange: jest.fn(),
      onHourChange: jest.fn(),
      onMinuteChange: jest.fn(),
    };
  });

  it('should mount correctly', () => {
    const wrapper = mount(<PopoverRoot { ...initialProps }/>);
    expect(toJson(wrapper)).toBeTruthy();
  });

  it('should mount YearSelector child correctly', () => {
    const wrapper = mount(<PopoverRoot { ...initialProps } selectingYear />);
    expect(wrapper.find(YearSelector).exists()).toEqual(true);
  });

  it('should mount MonthSelector child correctly', () => {
    const wrapper = mount(<PopoverRoot { ...initialProps } selectingMonth />);
    expect(wrapper.find(MonthSelector).exists()).toEqual(true);
  });

  it('should mount TimePicker child correctly', () => {
    const wrapper = mount(<PopoverRoot { ...initialProps } variant="date-time" />);
    expect(wrapper.find(TimePicker).exists()).toEqual(true);
  });

  it('should call monthChange in MonthSelector child', () => {
    const monthChange = jest.fn();
    const wrapper = mount(<PopoverRoot { ...initialProps } selectingMonth monthChange={ monthChange } />);
    wrapper.find(MonthSelector).props().monthChange('Foo');
    expect(monthChange).toHaveBeenCalledWith('Foo');
  });

  it('should call yearChange in MonthSelector child when incrementing/decrementing year', () => {
    const yearChange = jest.fn();
    const wrapper = mount(<PopoverRoot { ...initialProps } selectingMonth yearChange={ yearChange } />);
    wrapper.find(MonthSelector).props().onNextClick();
    wrapper.find(MonthSelector).props().onPreviousClick();
    expect(yearChange).toHaveBeenCalledTimes(2);
  });

  it('should call onHourChange in TimePicker child correctly', () => {
    const onHourChange = jest.fn();
    const wrapper = mount(<PopoverRoot { ...initialProps } variant="date-time" onHourChange={ onHourChange } />);
    wrapper.find(TimePicker).props().onHourChange('Hours');
    expect(onHourChange).toHaveBeenCalledWith('Hours');
  });

  it('should call onMinuteChange in TimePicker child correctly', () => {
    const onMinuteChange = jest.fn();
    const wrapper = mount(<PopoverRoot { ...initialProps } variant="date-time" onMinuteChange={ onMinuteChange } />);
    wrapper.find(TimePicker).props().onMinuteChange('Minutes');
    expect(onMinuteChange).toHaveBeenCalledWith('Minutes');
  });
});
