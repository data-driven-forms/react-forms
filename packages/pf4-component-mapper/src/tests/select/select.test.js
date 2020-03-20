import React from 'react';
import { mount } from 'enzyme';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import isEqual from 'lodash/isEqual';

import DataDrivenSelect from '../../common/select/select';
import { Select } from '../../common/select/select';

describe('<Select />', () => {
  let initialProps;
  const onChange = jest.fn();
  beforeEach(() => {
    initialProps = {
      onChange,
      menuIsOpen: true,
      id: 'select',
      options: [
        {
          label: 'First option',
          value: 1
        },
        {
          label: 'Second option',
          value: 2
        }
      ]
    };
  });

  afterEach(() => {
    onChange.mockReset();
  });

  it('should return single simple value', () => {
    const wrapper = mount(<Select {...initialProps} />);
    const option = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();
    option.simulate('click');
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should return single object value', () => {
    const wrapper = mount(<Select {...initialProps} simpleValue={false} />);
    const option = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();
    option.simulate('click');
    expect(onChange).toHaveBeenCalledWith({ ...initialProps.options[0] });
  });

  it('should return multiple simple values', () => {
    const onChange = jest.fn();
    // simulate first return value in state
    const value = [1];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti onChange={onChange} closeMenuOnSelect={false} />);
    /**
     * select first option
     */
    const option1 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();
    option1.simulate('click');
    /**
     * select second option
     */
    const option2 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .last()
      .find('div')
      .last();
    option2.simulate('click');
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([1, 2]);
  });

  it('should return multiple object values', () => {
    const onChange = jest.fn();
    // simulate first return value in state
    const value = [{ ...initialProps.options[0] }];
    const wrapper = mount(<Select {...initialProps} value={value} simpleValue={false} isMulti onChange={onChange} closeMenuOnSelect={false} />);
    /**
     * select first option
     */
    const option1 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();
    option1.simulate('click');
    /**
     * select second option
     */
    const option2 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .last()
      .find('div')
      .last();
    option2.simulate('click');
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([...initialProps.options]);
  });

  it('should expand and close multi value chips', () => {
    const value = [1, 2];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    expect(wrapper.find('.ddorg__pf4-component-mapper__select__multivalue--container')).toHaveLength(1);
    const expandButton = wrapper.find('button.pf-c-button.pf-m-plain.ddorg__pf4-component-mapper__select__value--container-chipgroup');
    expandButton.simulate('click');
    expect(wrapper.find('.ddorg__pf4-component-mapper__select__multivalue--container')).toHaveLength(2);
  });

  it('should call on change when removing chip', () => {
    const value = [1, 2];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    wrapper
      .find(components.MultiValueRemove)
      .first()
      .simulate('click');
    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('should map props correctly from DataDrivenSelect to Select', () => {
    const props = {
      isMulti: true,
      options: [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 }
      ],
      name: 'foo',
      onChange: Function,
      value: [1, 2]
    };
    const wrapper = mount(<DataDrivenSelect {...props} />);
    const mappedProps = wrapper.find(Select).props();
    expect(mappedProps).toEqual({
      hideSelectedOptions: false,
      closeMenuOnSelect: false,
      isClearable: false,
      isMulti: true,
      onChange: Function,
      isSearchable: false,
      name: 'foo',
      options: [
        { label: 'a', value: 1 },
        { label: 'b', value: 2 }
      ],
      placeholder: 'Choose...',
      selectVariant: 'default',
      showLessLabel: 'Show less',
      showMoreLabel: 'more',
      simpleValue: true,
      updatingMessage: 'Loading data...',
      menuIsPortal: false,
      value: [1, 2],
      loadingMessage: 'Loading...'
    });
  });

  it('should load single select Async options correctly', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));

    const wrapper = mount(<Select {...initialProps} options={undefined} loadOptions={asyncLoading} />);

    setImmediate(() => {
      wrapper.update();
      expect(
        wrapper
          .find(Select)
          .first()
          .instance().state.allOptions
      ).toEqual([{ label: 'label' }]);
      done();
    });
  });

  it('should load multi select Async options correctly and set initial value to undefined', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    const wrapper = mount(
      <Select
        {...initialProps}
        value={['does not exists in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(
        wrapper
          .find(Select)
          .first()
          .instance().state.allOptions
      ).toEqual([{ label: 'label', value: '123' }]);
      expect(onChange).toHaveBeenCalledWith(undefined);
      done();
    });
  });

  it('should load multi select Async options correctly and set initial value to ["123"]', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    const wrapper = mount(
      <Select
        {...initialProps}
        value={['123', 'Not in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(
        wrapper
          .find(Select)
          .first()
          .instance().state.allOptions
      ).toEqual([{ label: 'label', value: '123' }]);
      expect(onChange).toHaveBeenCalledWith(['123']);
      done();
    });
  });

  it('should load multi select Async options correctly and set initial value to ["123"] if initial value is an object', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    const wrapper = mount(
      <Select
        {...initialProps}
        value={[{ value: '123', label: 'label' }, 'Not in options']}
        isMulti
        options={undefined}
        loadOptions={asyncLoading}
        onChange={onChange}
        simpleValue
      />
    );

    setImmediate(() => {
      wrapper.update();
      expect(
        wrapper
          .find(Select)
          .first()
          .instance().state.allOptions
      ).toEqual([{ label: 'label', value: '123' }]);
      expect(onChange).toHaveBeenCalledWith([{ label: 'label', value: '123' }]);
      done();
    });
  });

  it('should load Async options after filtering', (done) => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));

    const wrapper = mount(<Select {...initialProps} options={undefined} loadOptions={asyncLoading} />);

    setImmediate(() => {
      wrapper.update();
      const search = wrapper.find('input');
      search.getDOMNode().value = 'foo';
      search.simulate('change');
      setImmediate(() => {
        wrapper.update();
        expect(asyncLoading.mock.calls).toHaveLength(2);
        expect(asyncLoading.mock.calls[1]).toEqual(['foo']);
        done();
      });
    });
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
      const wrapper = mount(<Select {...initialProps} />);

      let innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();
      innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(innerSelectProps).toEqual(NEW_OPTIONS);
    });

    it('should change the options when loadOptions prop is changed', (done) => {
      const wrapper = mount(<Select {...initialProps} loadOptions={asyncLoading} />);

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
      const wrapper = mount(<Select {...initialProps} value={1} />);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('not should change the value when new options include it', () => {
      const wrapper = mount(<Select {...initialProps} value={2} />);

      wrapper.setProps({ options: NEW_OPTIONS });
      wrapper.update();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', (done) => {
      const wrapper = mount(<Select {...initialProps} loadOptions={asyncLoading} value={1} />);

      setImmediate(() => {
        wrapper.update();
        wrapper.setProps({ loadOptions: asyncLoadingNew });

        setImmediate(() => {
          wrapper.update();

          expect(onChange).toHaveBeenCalledWith(undefined);
          done();
        });
      });
    });

    it('should not reset the value when loadOptions prop is changed and new options includes the value', (done) => {
      const wrapper = mount(<Select {...initialProps} loadOptions={asyncLoading} value={2} />);

      setImmediate(() => {
        wrapper.update();
        wrapper.setProps({ loadOptions: asyncLoadingNew });

        setImmediate(() => {
          wrapper.update();

          expect(onChange).not.toHaveBeenCalled();
          done();
        });
      });
    });
  });
});
