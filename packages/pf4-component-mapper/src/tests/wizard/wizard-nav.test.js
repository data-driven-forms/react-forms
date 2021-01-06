import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import WizardNavigation from '../../wizard/wizard-components/wizard-nav';

describe('WizardNav', () => {
  class ClassWrapper extends React.Component {
    render() {
      return <WizardNavigation {...this.props} />;
    }
  }

  it('WizardNavigationClass rerender nav schema only when values are changed', async () => {
    const initialProps = {
      activeStepIndex: 0,
      valid: true,
      validating: true,
      maxStepIndex: 0,
      jumpToStep: jest.fn(),
      navSchema: [{ title: 'step' }],
      setPrevSteps: jest.fn(),
      values: { name: 'value 1' },
      crossroads: ['name']
    };

    const wrapper = mount(<ClassWrapper {...initialProps} />);

    expect(initialProps.setPrevSteps).not.toHaveBeenCalled();

    await act(async () => {
      wrapper.setProps({ values: { name: 'different value' } });
    });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    await act(async () => {
      wrapper.setProps({ values: { name: 'different value' } });
    });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    await act(async () => {
      wrapper.setProps({ values: { name: 'another value' } });
    });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);

    await act(async () => {
      wrapper.setProps({ values: { name: 'another value', password: 'do not render nav' } });
    });

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);
  });
});
