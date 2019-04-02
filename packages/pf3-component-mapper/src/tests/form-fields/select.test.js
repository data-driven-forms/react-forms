import React from 'react';
import toJson from 'enzyme-to-json';
import { SelectField } from '../../form-fields/form-fields';
import SelectPF3 from '../../form-fields/select/index';
import { mount } from 'enzyme';
import Select from 'react-select';

describe('<SelectField />', () => {
  let initialProps;
  const changeSpy = jest.fn();

  beforeEach(() => {
    initialProps = {
      input: {
        name: 'select-input',
        onChange: changeSpy,
      },
      meta: {},
      options: [{
        label: 'option 1',
        value: 1,
      }, {
        label: 'option 2',
        value: 2,
      }],
    };
  });

  afterEach(() => {
    changeSpy.mockReset();
  });

  it('should mount correctly', () => {
    const wrapper = mount(<SelectField { ...initialProps } />);
    expect(wrapper).toBeTruthy();
  });

  it('should mount Async correctly', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));

    const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

    setImmediate(() => {
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
  });

  it('should load Async options correctly', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));

    const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(SelectPF3).first().instance().state.options).toEqual([{ label: 'label' }]);
      done();
    });
  });

  it('should call on change with correct value on single select', () => {
    const wrapper = mount(<SelectField { ...initialProps } />);
    wrapper.find(Select).instance().props.onChange({
      value: 2,
    });
    expect(changeSpy).toHaveBeenCalledWith(2);
  });

  it('should call on change with correct value on multi select', () => {
    const wrapper = mount(
      <SelectField
        { ...initialProps }
        multi
        input={{
          name: 'select-input',
          onChange: changeSpy,
          value: [],
        }}
      />);
    wrapper.find(Select).instance().props.onChange(
      [{ value: 2, label: 'x' }, { value: 1, label: 'a' }],
    );
    expect(changeSpy).toHaveBeenCalledWith([ 1, 2 ]);
  });
});
