import React from 'react';
import { mount } from 'enzyme';
import WizardToggle from '../../wizard/wizard/wizard-toggle';

describe('WizardToggle', () => {
  let initialProps;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    initialProps = {
      activeStepIndex: 0,
      currentStep: {
        title: 'Title',
        name: 1
      },
      dispatch,
      isOpen: false,
      navSchema: [
        {
          name: 1,
          title: 'Title',
          substepOf: undefined,
          substepOfTitle: undefined,
          index: 0,
          primary: true
        }
      ]
    };
  });

  it('opens dropdown', () => {
    const wrapper = mount(<WizardToggle {...initialProps} />);

    expect(wrapper.find('.pf-m-expanded')).toHaveLength(0);
    expect(dispatch).not.toHaveBeenCalled();

    wrapper.find('.pf-c-wizard__toggle').simulate('click');

    expect(dispatch).toHaveBeenCalledWith({ type: 'openNav' });
  });

  it('closes dropdown', () => {
    initialProps = {
      ...initialProps,
      isOpen: true
    };

    const wrapper = mount(<WizardToggle {...initialProps} />);

    expect(wrapper.find('.pf-m-expanded')).toHaveLength(1);
    expect(dispatch).not.toHaveBeenCalled();

    wrapper.find('.pf-c-wizard__toggle').simulate('click');

    expect(dispatch).toHaveBeenCalledWith({ type: 'closeNav' });
  });

  it('renders correctly', () => {
    const wrapper = mount(<WizardToggle {...initialProps} />);

    expect(wrapper.find('.pf-c-wizard__toggle-list-item').text()).toEqual('1 Title');
  });

  it('renders on substep', () => {
    initialProps = {
      ...initialProps,
      currentStep: {
        title: 'Title special',
        name: 3
      },
      navSchema: [
        {
          name: 1,
          title: 'Title',
          substepOf: undefined,
          substepOfTitle: undefined,
          index: 0,
          primary: true
        },
        {
          name: 2,
          title: 'Title',
          substepOf: 'substep',
          substepOfTitle: 'substep title',
          index: 1,
          primary: true
        },
        {
          name: 3,
          title: 'Title special',
          substepOf: 'substep',
          substepOfTitle: 'substep title',
          index: 2,
          primary: true
        }
      ]
    };

    const wrapper = mount(<WizardToggle {...initialProps} />);

    expect(
      wrapper
        .find('.pf-c-wizard__toggle-list-item')
        .first()
        .text()
    ).toEqual('2 substep title');
    expect(
      wrapper
        .find('.pf-c-wizard__toggle-list-item')
        .last()
        .text()
    ).toEqual('Title special');
  });
});
