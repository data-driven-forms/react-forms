import React from 'react';
import { mount } from 'enzyme';
import toJSon from 'enzyme-to-json';

import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { formFieldsMapper, layoutMapper } from '../../index';
import Wizard from '../../form-fields/wizard/wizard';
import FieldProvider from '../../../../../__mocks__/mock-field-provider';

describe('<Wizard />', () => {
  let initialProps;
  let schema;

  beforeEach(() => {
    initialProps = {
      FieldProvider,
      title: 'Wizard',
      description: 'wizard description',
      formOptions: {
        renderForm: ([{ name }]) => <div key={ name }>{ name }</div>,
        getState: () => ({
          values: {
            'foo-field': 'foo-field-value',
            'bar-field': 'bar-field-value',
            'not-visited-field': 'not-visted-field-value',
          },
        }),
        onCancel: jest.fn(),
        onSubmit: jest.fn(),
        submit: jest.fn(),
        valid: true,
      },
      fields: [{
        stepKey: '1',
        name: 'foo',
        fields: [],
      }],
    };

    schema = [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      fields: [{
        name: 'bar-field',
      }],
    }];
  });

  it('should render correctly and unmount', () => {
    const wrapper = mount(<Wizard { ...initialProps } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly in modal and unmount', () => {
    const wrapper = mount(<Wizard inModal { ...initialProps } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with custom title and description', () => {
    const wrapper = mount(<Wizard { ...initialProps } title={ <div>Title</div> } description={ <div>description</div> } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should call submit function', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard { ...initialProps } formOptions={{ ...initialProps.formOptions, onSubmit }} />);
    wrapper.find('button').at(1).simulate('click');
    expect(onSubmit).toHaveBeenCalled();
  });

  it('should go to next step correctly and submit data', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard { ...initialProps } formOptions={{ ...initialProps.formOptions, onSubmit }} fields={ schema } />);
    // go to next step
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();
    expect(wrapper.children().instance().state.activeStep).toEqual('2');
    expect(wrapper.children().instance().state.prevSteps).toEqual([ '1' ]);

    // submit wizard
    wrapper.find('button').at(1).simulate('click');
    expect(onSubmit).toHaveBeenCalledWith({
      'foo-field': 'foo-field-value',
      'bar-field': 'bar-field-value',
    });
  });

  it('should build simple navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ schema } />);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).text()).toEqual('foo-step');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).text()).toEqual('bar-step');
  });

  it('should build progressive navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } isDynamic fields={ schema }  />);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);
    expect(wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).text()).toEqual('foo-step');

    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).text()).toEqual('bar-step');
  });

  it('should jump when click simple navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ schema } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back
    wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

  });

  it('should build simple navigation with substeps', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__nav-list')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
    expect(wrapper.find('.pf-c-wizard__nav-item').at(1).childAt(0).text()).toEqual('barbar');
    expect(wrapper.find('.pf-c-wizard__nav-list').last().childAt(0).childAt(0).text()).toEqual('bar-step');

  });

  it('should jumb with substeps', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go next
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back through the primary step
    wrapper.find('.pf-c-wizard__nav-item').at(1).childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    // go back
    wrapper.find('button').at(2).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back through the substep
    wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
  });

  it('should jumb with substeps and dynamic', () => {
    const wrapper = mount(<Wizard { ...initialProps } isDynamic fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);

    // go next
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');
    // visited step perished from navigation
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);

    // go next
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
  });

  it('should disable steps when invalid', () => {
    const schema = { fields: [{
      component: componentTypes.WIZARD,
      name: 'wizard',
      fields: [{
        title: 'foo-step',
        stepKey: '1',
        name: 'foo',
        fields: [{
          name: 'foo-field',
          label: 'foo',
          component: componentTypes.TEXT_FIELD,
        }],
        nextStep: '2',
      }, {
        stepKey: '2',
        title: 'bar-step',
        name: 'bar',
        substepOf: 'barbar',
        nextStep: '3',
        fields: [{
          name: 'bar-field',
          label: 'bar',
          component: componentTypes.TEXT_FIELD,
          validate: [{
            type: validatorTypes.REQUIRED,
          }],
        }],
      }, {
        stepKey: '3',
        title: 'conan-step',
        name: 'conan',
        substepOf: 'barbar',
        fields: [{
          name: 'conan-field',
          label: 'conan',
          component: componentTypes.TEXT_FIELD,
        }],
      }],
    }],
    };

    const wrapper = mount(<FormRenderer
      schema={ schema }
      formFieldsMapper={ formFieldsMapper }
      layoutMapper={ layoutMapper }
      onSubmit={ jest.fn() }
      onCancel={ jest.fn() }
      showFormControls={ false }
    />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(4);

    // go next
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    // go next
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    // however, it is not possible because form is invalid
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    // let's write
    wrapper.find('input').instance().value = 'hello';
    wrapper.find('input').simulate('change');
    wrapper.update();

    // go next
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    // voila
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('conan');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(false);

    // go back and make it invalid
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    wrapper.find('input').instance().value = '';
    wrapper.find('input').simulate('change');
    wrapper.update();

    // go next
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    // it is invalid :(
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    // let's look if last nav item is disabled (click event is working with 'disabled' <a> element)
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(true);

    // go to first step
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    // still invalid :(
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(true);

    // make form valid again
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    wrapper.find('input').instance().value = 'hello';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper.find('button').at(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(false);
  });
});
