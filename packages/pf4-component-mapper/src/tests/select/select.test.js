import React from 'react';
import { mount } from 'enzyme';
import isEqual from 'lodash/isEqual';
import FormRenderer, { componentTypes } from '@data-driven-forms/react-form-renderer';

import Select from '../../select/select/select';
import { act } from 'react-dom/test-utils';
import ValueContainer from '../../select/select/value-container';
import FormTemplate from '../../files/form-template';
import componentMapper from '../../files/component-mapper';

describe('<Select />', () => {
  let initialProps;
  const onChange = jest.fn();
  beforeEach(() => {
    initialProps = {
      onChange,
      name: 'test-select',
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

  it('should render translated option in value container', async () => {
    const wrapper = mount(
      <FormRenderer
        onSubmit={jest.fn}
        FormTemplate={FormTemplate}
        componentMapper={componentMapper}
        schema={{
          fields: [
            {
              component: componentTypes.SELECT,
              name: 'select',
              options: [
                {
                  label: <h1>Translated</h1>,
                  value: 'translated'
                }
              ]
            }
          ]
        }}
      />
    );

    expect(wrapper.find(ValueContainer).find('h1')).toHaveLength(0);

    wrapper.find('.pf-c-select__toggle').simulate('click');
    const option = wrapper.find('button.pf-c-select__menu-item').first();

    await act(async () => {
      option.simulate('click');
    });
    wrapper.update();

    expect(
      wrapper
        .find(ValueContainer)
        .find('h1')
        .text()
    ).toEqual('Translated');
  });

  it('should return single simple value', async () => {
    const wrapper = mount(<Select {...initialProps} />);
    wrapper.find('.pf-c-select__toggle').simulate('click');
    const option = wrapper.find('button.pf-c-select__menu-item').first();

    await act(async () => {
      option.simulate('click');
    });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('should return single object value', async () => {
    const wrapper = mount(<Select {...initialProps} simpleValue={false} />);
    wrapper.find('.pf-c-select__toggle').simulate('click');
    const option = wrapper.find('button.pf-c-select__menu-item').first();

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
    wrapper.find('.pf-c-select__toggle').simulate('click');
    /**
     * select first option
     */
    const option1 = wrapper.find('button.pf-c-select__menu-item').first();

    await act(async () => {
      option1.simulate('click');
    });
    /**
     * select second option
     */
    const option2 = wrapper.find('button.pf-c-select__menu-item').last();
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
    wrapper.find('.pf-c-select__toggle').simulate('click');
    /**
     * select first option
     */
    const option1 = wrapper.find('button.pf-c-select__menu-item').first();

    await act(async () => {
      option1.simulate('click');
    });
    /**
     * select second option
     */
    const option2 = wrapper.find('button.pf-c-select__menu-item').last();
    await act(async () => {
      option2.simulate('click');
    });
    wrapper.update();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).lastCalledWith([...initialProps.options]);
  });

  it('should expand and close multi value chips', async () => {
    const value = [1, 2, 3, 4];
    const options = [
      ...initialProps.options,
      {
        label: '3',
        value: 3
      },
      {
        label: '4',
        value: 4
      }
    ];
    const wrapper = mount(<Select {...initialProps} options={options} value={value} isMulti closeMenuOnSelect={false} />);

    expect(wrapper.find('.pf-c-chip-group')).toHaveLength(1);
    expect(wrapper.find('div.pf-c-chip')).toHaveLength(3);
    const expandButton = wrapper.find('button.pf-c-chip.pf-m-overflow').last();
    await act(async () => {
      expandButton.simulate('click');
    });
    wrapper.update();
    expect(wrapper.find('div.pf-c-chip')).toHaveLength(4);
  });

  it('should call on change when removing chip', async () => {
    const value = [1, 2];
    const wrapper = mount(<Select {...initialProps} value={value} isMulti closeMenuOnSelect={false} />);

    await act(async () => {
      wrapper
        .find('button.pf-c-button.pf-m-plain')
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
      showLessLabel: 'Show less',
      showMoreLabel: 'more',
      simpleValue: true,
      updatingMessage: 'Loading data...',
      menuIsPortal: false,
      value: [1, 2],
      loadingMessage: 'Loading...',
      noOptionsMessage: 'No options',
      noResultsMessage: 'No results found'
    });
  });

  it('should load single select Async options correctly', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: '3' }]));

    let wrapper;

    await act(async () => {
      wrapper = mount(<Select {...initialProps} options={undefined} loadOptions={asyncLoading} />);
    });
    wrapper.update();
    wrapper.find('.pf-c-select__toggle').simulate('click');

    expect(wrapper.find('button.pf-c-select__menu-item')).toHaveLength(1);
    expect(wrapper.find('button.pf-c-select__menu-item').text()).toEqual('label');
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
    wrapper.find('.pf-c-select__toggle').simulate('click');
    expect(wrapper.find('button.pf-c-select__menu-item')).toHaveLength(1);
    expect(wrapper.find('button.pf-c-select__menu-item').text()).toEqual('label');
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
    wrapper.find('.pf-c-select__toggle').simulate('click');
    expect(wrapper.find('button.pf-c-select__menu-item')).toHaveLength(1);
    expect(wrapper.find('button.pf-c-select__menu-item').text()).toEqual('label');
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
    wrapper.find('.pf-c-select__toggle').simulate('click');
    expect(wrapper.find('button.pf-c-select__menu-item')).toHaveLength(1);
    expect(wrapper.find('button.pf-c-select__menu-item').text()).toEqual('label');
    expect(onChange).toHaveBeenCalledWith([{ label: 'label', value: '123' }]);
  });

  it('should load Async options after filtering', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'label', value: 1 }]));
    let wrapper;
    await act(async () => {
      wrapper = mount(<Select {...initialProps} isSearchable={true} options={undefined} loadOptions={asyncLoading} />);
    });

    wrapper.update();
    expect(asyncLoading.mock.calls).toHaveLength(1);
    wrapper.find('.pf-c-select__toggle').simulate('click');

    const search = wrapper.find('input');

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

      let innerSelectProps = wrapper.find('InternalSelect').props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();
      innerSelectProps = wrapper.find('InternalSelect').props().options;

      expect(innerSelectProps).toEqual(NEW_OPTIONS);
    });

    it('should change the options when loadOptions prop is changed', async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} />);
      });

      wrapper.update();
      let innerSelectProps = wrapper.find('InternalSelect').props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });

      wrapper.update();
      innerSelectProps = wrapper.find('InternalSelect').props().options;

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
