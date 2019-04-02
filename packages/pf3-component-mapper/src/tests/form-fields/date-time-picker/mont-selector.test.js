import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import MonthSelector from '../../../form-fields/date-time-picker/month-selector';

describe('<MonthSelector />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      monthChange: jest.fn(),
      toggleSelectingMonth: jest.fn(),
      onNextClick: jest.fn(),
      onPreviousClick: jest.fn(),
      selectedDay: new Date('December 17, 2018 00:00:00'),
    };
  });

  it.skip('should render correcntly', () => {
    const wrapper = mount(<MonthSelector { ...initialProps }/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should select month April 0', () => {
    const monthChange = jest.fn();
    const wrapper = mount(<MonthSelector { ...initialProps } monthChange={ monthChange }/>);
    wrapper.find('table').last().find('button').first().simulate('click');
    expect(monthChange).toHaveBeenCalledWith(0);
  });
});
