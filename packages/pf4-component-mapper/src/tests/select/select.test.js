import React from 'react';
import { mount } from 'enzyme';
import { components } from 'react-select';
import ReactSelect from 'react-select';
import isEqual from 'lodash/isEqual';

import Select from '../../common/select/select';
import { act } from 'react-dom/test-utils';

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

  it('should return single simple value', async () => {
    const wrapper = mount(<Select {...initialProps} />);
    const option = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();

    await act(async () => {
      option.simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should return single object value', async () => {
    const wrapper = mount(<Select {...initialProps} simpleValue={false} />);
    const option = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .first()
      .find('div')
      .last();

    await act(async () => {
      option.simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith({ ...initialProps.options[0] });
  });

  it('should return multiple simple values', async () => {
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

    await act(async () => {
      option1.simulate('click');
    });
    /**
     * select second option
     */
    const option2 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .last()
      .find('div')
      .last();
    await act(async () => {
      option2.simulate('click');
    });

    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([1, 2]);
  });

  it('should return multiple object values', async () => {
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

    await act(async () => {
      option1.simulate('click');
    });
    /**
     * select second option
     */
    const option2 = wrapper
      .find('.ddorg__pf4-component-mapper__select__menu--option')
      .last()
      .find('div')
      .last();
    await act(async () => {
      option2.simulate('click');
    });
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([...initialProps.options]);
  });

  it('should expand and close multi value chips', async () => {
    const value = [1, 2];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    expect(wrapper.find('.ddorg__pf4-component-mapper__select__multivalue--container')).toHaveLength(1);
    const expandButton = wrapper.find('button.pf-c-button.pf-m-plain.ddorg__pf4-component-mapper__select__value--container-chipgroup');
    await act(async () => {
      expandButton.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('.ddorg__pf4-component-mapper__select__multivalue--container')).toHaveLength(2);
  });

  it('should call on change when removing chip', async () => {
    const value = [1, 2];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    await act(async () => {
      wrapper
        .find(components.MultiValueRemove)
        .first()
        .simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith([2]);
  });

  it('should map props correctly', () => {
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
    const wrapper = mount(<Select {...props} />);
    const mappedProps = wrapper.find(Select).props();
    expect(mappedProps).toEqual({
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

  it('should load single select Async options correctly', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));

    let wrapper;

    await act(async () => {
      wrapper = mount(<Select {...initialProps} options={undefined} loadOptions={asyncLoading} />);
    });
    wrapper.update();

    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .instance().props.options
    ).toEqual([{ label: 'label' }]);
  });

  it('should load multi select Async options correctly and set initial value to undefined', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    let wrapper;

    await act(async () => {
      wrapper = mount(
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
    });

    wrapper.update();
    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .instance().props.options
    ).toEqual([{ label: 'label', value: '123' }]);
    expect(onChange).toHaveBeenCalledWith(undefined);
  });

  it('should load multi select Async options correctly and set initial value to ["123"]', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    let wrapper;

    await act(async () => {
      wrapper = mount(
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
    });

    wrapper.update();
    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .instance().props.options
    ).toEqual([{ label: 'label', value: '123' }]);
    expect(onChange).toHaveBeenCalledWith(['123']);
  });

  it('should load multi select Async options correctly and set initial value to ["123"] if initial value is an object', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '123' }]));
    const onChange = jest.fn();
    let wrapper;
    await act(async () => {
      wrapper = mount(
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
    });

    wrapper.update();
    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .instance().props.options
    ).toEqual([{ label: 'label', value: '123' }]);
    expect(onChange).toHaveBeenCalledWith([{ label: 'label', value: '123' }]);
  });

  it('should load Async options after filtering', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label' }]));
    let wrapper;
    await act(async () => {
      wrapper = mount(<Select {...initialProps} isSearchable={true} options={undefined} loadOptions={asyncLoading} />);
    });

    wrapper.update();
    expect(asyncLoading.mock.calls).toHaveLength(1);

    const search = wrapper.find(ReactSelect).find('input');

    await act(async () => {
      search.instance().value = 'foo';
      search.simulate('change');
    });

    wrapper.update();
    expect(asyncLoading.mock.calls).toHaveLength(2);
    expect(asyncLoading.mock.calls[1]).toEqual(['foo']);
  });

  describe('reloading props', () => {
    const NEW_OPTIONS = [{ label: 'Different label', value: 2 }];
    let asyncLoading;
    let asyncLoadingNew;

    class Wrapper extends React.Component {
      render() {
        return <Select {...this.props} />;
      }
    }

    beforeEach(() => {
      asyncLoading = () => Promise.resolve(initialProps.options);
      asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);
    });

    it('should change the options when options prop is changed', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} />);
      });

      let innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();
      innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(innerSelectProps).toEqual(NEW_OPTIONS);
    });

    it('should change the options when loadOptions prop is changed', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} />);
      });

      wrapper.update();
      let innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });

      wrapper.update();
      innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, NEW_OPTIONS)).toEqual(true);
    });

    it('should change the value when new options do not include it', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} value={1} />);
      });
      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('not should change the value when new options include it', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} value={2} />);
      });
      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} value={1} />);
      });
      wrapper.update();

      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });
      wrapper.update();

      expect(onChange).toHaveBeenCalledWith(undefined);
    });

    it('should not reset the value when loadOptions prop is changed and new options includes the value', async () => {
      let wrapper;

      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} value={2} />);
      });
      wrapper.update();
      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });
      wrapper.update();

      expect(onChange).not.toHaveBeenCalled();
    });
  });
});
