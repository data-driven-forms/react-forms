import React from 'react';
import toJson from 'enzyme-to-json';
import { SelectField } from '../../form-fields/form-fields';
import SelectPF3 from '../../form-fields/select/index';
import { mount } from 'enzyme';
import Select from 'react-select';
import isEqual from 'lodash/isEqual';

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
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'asyncLabel' }]));

    const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

    setImmediate(() => {
      wrapper.update();
      expect(toJson(wrapper)).toMatchSnapshot();
      done();
    });
  });

  it('should load Async options correctly', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'asyncLabel' }]));

    const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

    setImmediate(() => {
      wrapper.update();
      expect(wrapper.find(SelectPF3).first().instance().state.options).toEqual([{ label: 'asyncLabel' }]);
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
    expect(changeSpy).toHaveBeenCalledWith([ 2, 1 ]);
  });

  it('should change the options when options prop is changed', () => {
    const wrapper = mount(<SelectField { ...initialProps } />);

    let innerSelectProps = wrapper.find(Select).props().options;

    expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

    const NEW_OPTIONS = [{ label: 'Different label', value: 'Different value' }];
    wrapper.setProps({ options: NEW_OPTIONS });
    wrapper.update();
    innerSelectProps = wrapper.find(Select).props().options;

    expect(isEqual(innerSelectProps, NEW_OPTIONS)).toEqual(true);
  });

  it.only('should change the options when loadOptions prop is changed', (done) => {
    const INITIAL_OPTIONS = [{ label: 'asyncLabel' }];
    const asyncLoading = () => Promise.resolve(INITIAL_OPTIONS);
    const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

    setImmediate(() => {
      wrapper.update();
      let innerSelectProps = wrapper.find(Select).props().options;

      expect(isEqual(innerSelectProps, INITIAL_OPTIONS)).toEqual(true);

      const NEW_OPTIONS = [{ label: 'Different label', value: 'Different value' }];
      const asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);

      wrapper.setProps({ loadOptions: asyncLoadingNew });

      setImmediate(() => {
        wrapper.update();
        innerSelectProps = wrapper.find(Select).props().options;

        expect(isEqual(innerSelectProps, NEW_OPTIONS)).toEqual(true);
        done();
      });
    });
  });
});
