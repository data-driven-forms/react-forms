import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import isEqual from 'lodash/isEqual';
import ReactSelect from 'react-select';
import { DropdownButton } from 'patternfly-react';
import DataDrivenSelect from '@data-driven-forms/common/select';

import SelectField from '../../../files/select/select';

describe('<SelectField />', () => {
  let initialProps;
  let wrapper;
  const changeSpy = jest.fn();

  beforeEach(() => {
    initialProps = {
      classNamePrefix: 'pf3-select',
      input: {
        name: 'select-input',
        onChange: changeSpy
      },
      meta: {},
      options: [
        {
          label: 'option 1',
          value: 1
        },
        {
          label: 'option 2',
          value: 2
        }
      ]
    };
  });

  afterEach(() => {
    changeSpy.mockReset();
  });

  it('should mount correctly', async () => {
    await act(async () => {
      wrapper = mount(<SelectField {...initialProps} />);
    });
    wrapper.update();

    expect(wrapper).toBeTruthy();
  });

  it('should mount Async correctly', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'asyncLabel' }]));

    await act(async () => {
      wrapper = mount(<SelectField {...initialProps} loadOptions={asyncLoading} />);
    });
    wrapper.update();

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should load Async options correctly', async () => {
    const asyncLoading = jest.fn().mockReturnValue(Promise.resolve([{ label: 'asyncLabel' }]));

    await act(async () => {
      wrapper = mount(<SelectField {...initialProps} loadOptions={asyncLoading} />);
    });
    wrapper.update();

    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .props().options
    ).toEqual([{ label: 'asyncLabel' }]);
  });

  it('should call on change with correct value on single select', async () => {
    await act(async () => {
      wrapper = mount(<SelectField {...initialProps} />);
    });
    wrapper.update();
    await act(async () => {
      wrapper
        .find(ReactSelect)
        .instance()
        .props.onChange({
          value: 2
        });
    });
    wrapper.update();
    expect(changeSpy).toHaveBeenCalledWith(2);
  });

  it('should call on change with correct value on multi select', async () => {
    await act(async () => {
      wrapper = mount(
        <SelectField
          {...initialProps}
          isMulti
          input={{
            name: 'select-input',
            onChange: changeSpy,
            value: []
          }}
        />
      );
    });
    wrapper.update();
    await act(async () => {
      wrapper
        .find(ReactSelect)
        .instance()
        .props.onChange([
          { value: 2, label: 'x' },
          { value: 1, label: 'a' }
        ]);
    });
    wrapper.update();

    expect(changeSpy).toHaveBeenCalledWith([2, 1]);
  });

  describe('reloading props', () => {
    const NEW_OPTIONS = [{ label: 'Different label', value: 2 }];
    let asyncLoading;
    let asyncLoadingNew;

    class Wrapper extends React.Component {
      render() {
        return <SelectField {...this.props} />;
      }
    }

    beforeEach(() => {
      asyncLoading = () => Promise.resolve(initialProps.options);
      asyncLoadingNew = () => Promise.resolve(NEW_OPTIONS);
    });

    it('should change the options when options prop is changed', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} />);
      });
      wrapper.update();

      let innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(isEqual(innerSelectProps, initialProps.options)).toEqual(true);

      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();
      wrapper.update();
      innerSelectProps = wrapper.find(ReactSelect).props().options;

      expect(innerSelectProps).toEqual(NEW_OPTIONS);
    });

    it('should change the options when loadOptions prop is changed', async () => {
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
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} input={{ ...initialProps.input, value: 1 }} />);
      });
      wrapper.update();

      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();

      expect(changeSpy).toHaveBeenCalledWith(undefined);
    });

    it('should not change the value when new options do not include it and noValueUpdates is set', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} noValueUpdates input={{ ...initialProps.input, value: 1 }} />);
      });
      wrapper.update();
      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('not should change the value when new options include it', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} input={{ ...initialProps.input, value: 2 }} />);
      });
      wrapper.update();
      await act(async () => {
        wrapper.setProps({ options: NEW_OPTIONS });
      });
      wrapper.update();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should reset the value when loadOptions prop is changed and new options do not include the value', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} input={{ ...initialProps.input, value: 1 }} />);
      });
      wrapper.update();

      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });
      wrapper.update();

      expect(changeSpy).toHaveBeenCalledWith(undefined);
    });

    it('should not reset the value when loadOptions prop is changed and new options do not include the value - noValueUpdates is set', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} noValueUpdates loadOptions={asyncLoading} input={{ ...initialProps.input, value: 1 }} />);
      });
      wrapper.update();

      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });
      wrapper.update();

      expect(changeSpy).not.toHaveBeenCalledWith();
    });

    it('should not reset the value when loadOptions prop is changed and new options include the value', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} loadOptions={asyncLoading} input={{ ...initialProps.input, value: 2 }} />);
      });
      wrapper.update();
      wrapper.update();
      await act(async () => {
        wrapper.setProps({ loadOptions: asyncLoadingNew });
      });
      wrapper.update();

      expect(changeSpy).not.toHaveBeenCalled();
    });

    it('should pick correct value for single select when passed array', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} input={{ ...initialProps.input, value: [2] }} />);
      });
      wrapper.update();
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([{ value: 2, label: 'option 2' }]);
    });

    it('should pick correct array value for single select when passed array', async () => {
      await act(async () => {
        wrapper = mount(<Wrapper {...initialProps} input={{ ...initialProps.input, value: [2] }} pluckSingleValue={false} />);
      });
      wrapper.update();
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([]);

      await act(async () => {
        wrapper = mount(
          <Wrapper
            {...initialProps}
            options={[...initialProps.options, { label: 'array options', value: [2] }]}
            input={{ ...initialProps.input, value: [2] }}
            pluckSingleValue={false}
          />
        );
      });
      wrapper.update();
      expect(wrapper.find(ReactSelect).instance().state.value).toEqual([{ label: 'array options', value: [2] }]);
    });

    describe('searcheable', () => {
      let isSearchableProps;
      beforeEach(() => {
        isSearchableProps = {
          ...initialProps,
          input: {
            name: 'searchable',
            onChange: jest.fn()
          },
          meta: {},
          isSearchable: true,
          placeholder: 'searchable'
        };
      });
      it('should componse isSearchable variant correctly', async () => {
        await act(async () => {
          wrapper = mount(<SelectField {...isSearchableProps} />);
        });
        wrapper.update();
        expect(wrapper.find(DropdownButton)).toHaveLength(1);
      });

      it('should correctly assign dropdown text', async () => {
        await act(async () => {
          wrapper = mount(<SelectField {...isSearchableProps} input={{ ...isSearchableProps.input, value: 1 }} />);
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('option 1');

        await act(async () => {
          wrapper.setProps({ input: { ...isSearchableProps.input, value: { label: 'Foo', value: 'Foo' } } });
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('Foo');
        await act(async () => {
          wrapper.setProps({ input: { ...isSearchableProps.input, value: [1, 2] } });
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('option 1, option 2');
        await act(async () => {
          wrapper.setProps({ input: { ...isSearchableProps.input, value: isSearchableProps.options } });
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('option 1, option 2');
        await act(async () => {
          wrapper.setProps({ input: { ...isSearchableProps.input, value: undefined } });
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('searchable');
        await act(async () => {
          wrapper.setProps({ input: { ...isSearchableProps.input, value: [] } });
        });
        wrapper.update();
        expect(wrapper.find(`span.${initialProps.classNamePrefix}-value`).text()).toEqual('searchable');
      });

      it('should open dropdown search in options', async () => {
        await act(async () => {
          wrapper = mount(<SelectField {...isSearchableProps} />);
        });
        wrapper.update();
        await act(async () => {
          wrapper.find('button#searchable').simulate('click');
        });
        wrapper.update();
        expect(wrapper.find(DataDrivenSelect)).toHaveLength(1);
        expect(wrapper.find('.ddorg__pf3-component-mapper__select__option')).toHaveLength(2);
        const input = wrapper.find('input.form-control');
        input.getDOMNode().value = '1';
        await act(async () => {
          input.simulate('change');
        });
        wrapper.update();
        expect(wrapper.find('.ddorg__pf3-component-mapper__select__option')).toHaveLength(1);
      });

      it('should clear the select value', async () => {
        const onChange = jest.fn();
        await act(async () => {
          wrapper = mount(<SelectField {...isSearchableProps} isClearable input={{ ...isSearchableProps.input, value: 1, onChange }} />);
        });
        wrapper.update();
        await act(async () => {
          wrapper.find(`div.${initialProps.classNamePrefix}-searchebale-clear`).simulate('click');
        });
        wrapper.update();
        expect(onChange).toHaveBeenCalledWith(undefined);
      });
    });
  });
});
