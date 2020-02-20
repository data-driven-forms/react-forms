import React from 'react';
import { mount } from 'enzyme';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { NavItem } from 'patternfly-react';
import toJson from 'enzyme-to-json';
import FormTabs from '../components/tabs';

describe('<FormTabs />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      fields: [{
        component: componentTypes.TABS,
        title: 'Tab 1',
        name: 'tab1',
        fields: [{
          name: 'foo',
          component: 'foo',
        }],
      }, {
        component: componentTypes.TABS,
        title: 'Tab 2',
        name: 'tab2',
        fields: [],
      }],
      formOptions: {
        renderForm: ({ name, component }) => <div key={ name }>{ component }</div>,
        getState: () => ({
          errors: {},
        }),
      },
    };
  });

  it('should render form tabs', () => {
    const wrapper = mount(<FormTabs { ...initialProps } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render form tabs with error state', () => {
    const validationSchema = {
      ...initialProps,
      fields: [{
        component: componentTypes.TABS,
        title: 'Tab 1',
        name: 'tab1',
        validateFields: [ 'foo', 'nested.field' ],
        fields: [{
          name: 'foo',
          component: 'foo',
        }, {
          name: 'nested.field',
          component: 'foo',
        }],
      }],
      formOptions: {
        renderForm: ({ name, component }) => <div key={ name }>{ component }</div>,
        getState: () => ({
          errors: { foo: true, nested: { field: true }},
        }),
      },
    };
    const wrapper = mount(<FormTabs { ...validationSchema } />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should switch form tabs on click', () => {
    const wrapper = mount(<FormTabs { ...initialProps } />);
    expect(wrapper.find(NavItem).first().instance().props.active).toEqual(true);
    expect(wrapper.find(NavItem).last().instance().props.active).toEqual(false);

    wrapper.find('a').last().simulate('click');
    expect(wrapper.find(NavItem).first().instance().props.active).toEqual(false);
    expect(wrapper.find(NavItem).last().instance().props.active).toEqual(true);
  });
});
