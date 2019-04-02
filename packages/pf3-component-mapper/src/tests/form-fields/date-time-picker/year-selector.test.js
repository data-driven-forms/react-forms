import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import YearSelector from '../../../form-fields/date-time-picker/year-selector';

describe('<YearSelector />', () => {
  let initialProps;
  let initialState;
  let initialYear;

  beforeEach(() => {
    initialYear = 2019;
    initialProps = {
      yearChange: jest.fn(),
      toggleSelectingYear: jest.fn(),
    };
    initialState = {
      initialYear,
      firstInterval: [ initialYear - 19, initialYear ],
      currentInterval: [ initialYear - 19, initialYear ],
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(<YearSelector { ...initialProps } />);
    wrapper.setState({ ...initialState });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with some selected date', () => {
    const wrapper = mount(<YearSelector { ...initialProps } selectedDay={ new Date(Date.UTC(2019)) }/>);
    wrapper.setState({ ...initialState });
    wrapper.update();
    expect(wrapper.findWhere(node => node.key() === 'year-cell-4').last().find('button').props().className).toEqual('selected');
  });

  it('should select year 2000', () => {
    const yearChange = jest.fn();
    const wrapper = mount(<YearSelector { ...initialProps } yearChange={ yearChange } />);
    wrapper.setState({ ...initialState });
    wrapper.update();
    wrapper.find('table').last().find('tr').first().find('td').first().find('button').simulate('click');
    expect(yearChange).toHaveBeenCalledWith(2000);
  });

  it('should switch to prev year interval', () => {
    const wrapper = mount(<YearSelector { ...initialProps } />);
    wrapper.setState({ ...initialState });
    wrapper.update();
    wrapper.find('table').first().find('td').first().simulate('click');
    expect(wrapper.state().currentInterval).toEqual([ 1980, 1999 ]);
  });

  it('should witch to next year interval', () => {
    const wrapper = mount(<YearSelector { ...initialProps } />);
    wrapper.setState({ ...initialState });
    wrapper.update();
    wrapper.find('table').first().find('td').last().simulate('click');
    expect(wrapper.state().currentInterval).toEqual([ 2020, 2039 ]);
  });
});
