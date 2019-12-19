import React from 'react';
import toJson from 'enzyme-to-json';
import { SelectField } from '../../form-fields/form-fields';
import SelectPF3 from '../../form-fields/select/index';
import { mount } from 'enzyme';
import isEqual from 'lodash/isEqual';
import ReactSelect from 'react-select';

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
    wrapper.find(ReactSelect).instance().props.onChange({
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
    wrapper.find(ReactSelect).instance().props.onChange(
      [{ value: 2, label: 'x' }, { value: 1, label: 'a' }],
    );
    expect(changeSpy).toHaveBeenCalledWith([ 2, 1 ]);
  });

  describe('reloading props', () => {
    const NEW_OPTIONS = [{ label: 'Different label', value: 2 }];
    let asyncLoading;
    let asyncLoadingNew;

    beforeEach(() => {
      asyncLoading = () => Promise.resolve(initialProps.options);
      asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);
    });

    it('should change the options when options prop is changed', () => {
      const wrapper = mount(<SelectField { ...initialProps } />);

      let innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();
      innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(innerSelectProps).toEqual(NEW_OPTIONS);
    });

    it('should change the options when loadOptions prop is changed', (done) => {
      const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading }/>);

      setImmediate(() => {
        wrapper.update();
        let innerSelectProps = wrapper.find(ReactSelect).props().options;

        expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

        wrapper.setProps({ loadOptions: asyncLoadingNew });

        setImmediate(() => {
          wrapper.update();
          innerSelectProps = wrapper.find(ReactSelect).props().options;

          expect(isEqual(innerSelectProps, NEW_OPTIONS)).toEqual(true);
          done();
        });
      });
    });

    it('should change the value when new options do not include it', () => {
      const wrapper = mount(<SelectField { ...initialProps } input={{ ...initialProps.input, value: 1 }}/>);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();

      expect(changeSpy).toHaveBeenCalledWith(undefined);
    });

    it('not should change the value when new options include it', () => {
      const wrapper = mount(<SelectField { ...initialProps } input={{ ...initialProps.input, value: 2 }}/>);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', (done) => {
      const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading } input={{ ...initialProps.input, value: 1 }}/>);

      setImmediate(() => {
        wrapper.update();
        wrapper.setProps({ loadOptions: asyncLoadingNew });

        setImmediate(() => {
          wrapper.update();

          expect(changeSpy).toHaveBeenCalledWith(undefined);
          done();
        });
      });
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', (done) => {
      const wrapper = mount(<SelectField { ...initialProps } loadOptions={ asyncLoading } input={{ ...initialProps.input, value: 2 }}/>);

      setImmediate(() => {
        wrapper.update();
        wrapper.setProps({ loadOptions: asyncLoadingNew });

        setImmediate(() => {
          wrapper.update();

          expect(changeSpy).not.toHaveBeenCalled();
          done();
        });
      });
    });

    it('should pick correct value for single select when passed array', () => {
      const wrapper = mount(<SelectField { ...initialProps } input={{ ...initialProps.input, value: [ 2 ]}}/>);
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([{ value: 2, label: 'option 2' }]);
    });

    it('should pick correct array value for single select when passed array', () => {
      let wrapper = mount(<SelectField { ...initialProps } input={{ ...initialProps.input, value: [ 2 ]}} pluckSingleValue={ false }/>);
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([]);

      wrapper = mount(<SelectField
        { ...initialProps }
        options={ [ ...initialProps.options, { label: 'array options', value: [ 2 ]}] }
        input={{ ...initialProps.input, value: [ 2 ]}}
        pluckSingleValue={ false }
      />);
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([{ label: 'array options', value: [ 2 ]}]);
    });
  });
});
