import React from 'react';
import { render } from '@testing-library/react';

import WizardNavigation from '../../wizard/wizard-components/wizard-nav';

describe('WizardNav', () => {
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
      crossroads: ['name'],
    };

    const { rerender } = render(<WizardNavigation {...initialProps} />);

    expect(initialProps.setPrevSteps).not.toHaveBeenCalled();

    rerender(<WizardNavigation {...initialProps} values={{ name: 'different value' }} />);

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    rerender(<WizardNavigation {...initialProps} values={{ name: 'different value' }} />);

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(1);

    rerender(<WizardNavigation {...initialProps} values={{ name: 'another value' }} />);

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);

    rerender(<WizardNavigation {...initialProps} values={{ name: 'another value', password: 'do not render nav' }} />);

    expect(initialProps.setPrevSteps.mock.calls).toHaveLength(2);
  });
});
