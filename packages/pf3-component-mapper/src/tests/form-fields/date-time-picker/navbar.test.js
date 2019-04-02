import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Navbar from '../../../form-fields/date-time-picker/navbar';

describe('<Navbar />', () => {
  let initialProps;

  beforeEach(() => {
    initialProps = {
      month: new Date('December 17, 2018 00:00:00'),
    };
  });

  it.skip('should render correctly', () => {
    const wrapper = mount(<Navbar { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it.skip('should render year navbar variant correctly', () => {
    const wrapper = mount(<Navbar { ...initialProps } isYear />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call previsouse click prop', () => {
    const onPreviousClick = jest.fn();
    const wrapper = mount(<Navbar { ...initialProps } onPreviousClick={ onPreviousClick } />);
    wrapper.find('td').first().simulate('mousedown');
    expect(onPreviousClick).toHaveBeenCalled();
  });

  it('should call next click prop', () => {
    const onNextClick = jest.fn();
    const wrapper = mount(<Navbar { ...initialProps } onNextClick={ onNextClick } />);
    wrapper.find('td').last().simulate('mousedown');
    expect(onNextClick).toHaveBeenCalled();
  });

  it('should call onMonthClick click prop', () => {
    const onMonthClick = jest.fn();
    const wrapper = mount(<Navbar { ...initialProps } onMonthClick={ onMonthClick } />);
    wrapper.find('button.navbar-center-button').simulate('mousedown');
    expect(onMonthClick).toHaveBeenCalledWith(true);
  });

  it('should call toggleSelectingYear click prop', () => {
    const toggleSelectingYear = jest.fn();
    const wrapper = mount(<Navbar { ...initialProps } isYear toggleSelectingYear={ toggleSelectingYear } />);
    wrapper.find('button.navbar-center-button').simulate('click');
    expect(toggleSelectingYear).toHaveBeenCalledWith(true);
  });

});
