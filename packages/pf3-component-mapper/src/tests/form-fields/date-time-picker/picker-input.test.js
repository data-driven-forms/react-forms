import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import PickerInput from '../../../form-fields/date-time-picker/picker-input';

describe('<PickerInput />', () => {
  let initialProps;
  const handleOverlayToggle = jest.fn();
  beforeEach(() => {
    initialProps = {
      handleOverlayToggle,
    };
  });

  afterEach(() => {
    handleOverlayToggle.mockReset();
  });

  it('should render picker input correctly', () => {
    const wrapper = mount(<PickerInput { ...initialProps }/>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render picker input disbaled variant correctly', () => {
    const wrapper = mount(<PickerInput { ...initialProps } isDisabled />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render picker input time variant correctly', () => {
    const wrapper = mount(<PickerInput { ...initialProps } variant="time" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should toggle overlay on input click', () => {
    const wrapper = mount(<PickerInput { ...initialProps }/>);
    wrapper.find('input').simulate('click');
    expect(handleOverlayToggle).toHaveBeenCalledWith(true);
  });

  it('should toggle overlay icon click', () => {
    const wrapper = mount(<PickerInput { ...initialProps }/>);
    wrapper.find('span.input-group-addon').simulate('click');
    expect(handleOverlayToggle).toHaveBeenCalledWith(true);
  });
});
