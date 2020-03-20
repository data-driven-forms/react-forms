import React from 'react';
import { mount } from 'enzyme';

import WizardNavigation from '../../files/wizard/wizard-nav';

describe('WizardNav', () => {
  class ClassWrapper extends React.Component {
    render() {
      return <WizardNavigation {...this.props} />;
    }
  }

  it('WizardNavigationClass rerender nav schema only when values are changed', () => {
    const initialProps = {
      activeStepIndex: 0,
      formOptions: { valid: true },
      maxStepIndex: 0,
      jumpToStep: jest.fn(),
      navSchema: [{ title: 'step' }],
      setPrevSteps: jest.fn(),
      values: { name: 'value 1' },
      crossroads: ['name']
    };

    const wrapper = mount(<ClassWrapper {...initialProps} />);

    expect(initialProps.setPrevSteps).not.toHaveBeenCalled();

    wrapper.setProps({ values: { name: 'different value' } });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    wrapper.setProps({ values: { name: 'different value' } });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    wrapper.setProps({ values: { name: 'another value' } });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);

    wrapper.setProps({ values: { name: 'another value', password: 'do not render nav' } });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);
  });
});
