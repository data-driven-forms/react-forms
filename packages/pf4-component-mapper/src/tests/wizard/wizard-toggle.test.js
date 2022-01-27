import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import WizardToggle from '../../wizard/wizard-components/wizard-toggle';

describe('WizardToggle', () => {
  let initialProps;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn();
    initialProps = {
      activeStepIndex: 0,
      currentStep: {
        title: 'Title',
        name: 1,
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
          primary: true,
        },
      ],
    };
  });

  it('opens dropdown', () => {
    render(<WizardToggle {...initialProps} />);

    const toggle = screen.getByLabelText('Wizard Toggle');

    expect(toggle).not.toHaveClass('pf-m-expanded');
    expect(dispatch).not.toHaveBeenCalled();

    userEvent.click(toggle);

    expect(dispatch).toHaveBeenCalledWith({ type: 'openNav' });
  });

  it('closes dropdown', () => {
    initialProps = {
      ...initialProps,
      isOpen: true,
    };

    render(<WizardToggle {...initialProps} />);

    const toggle = screen.getByLabelText('Wizard Toggle');

    expect(toggle).toHaveClass('pf-m-expanded');
    expect(dispatch).not.toHaveBeenCalled();

    userEvent.click(toggle);

    expect(dispatch).toHaveBeenCalledWith({ type: 'closeNav' });
  });

  it('renders correctly', () => {
    render(<WizardToggle {...initialProps} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders on substep', () => {
    initialProps = {
      ...initialProps,
      currentStep: {
        title: 'Title special',
        name: 3,
      },
      navSchema: [
        {
          name: 1,
          title: 'Title',
          substepOf: undefined,
          substepOfTitle: undefined,
          index: 0,
          primary: true,
        },
        {
          name: 2,
          title: 'Title',
          substepOf: 'substep',
          substepOfTitle: 'substep title',
          index: 1,
          primary: true,
        },
        {
          name: 3,
          title: 'Title special',
          substepOf: 'substep',
          substepOfTitle: 'substep title',
          index: 2,
          primary: true,
        },
      ],
    };

    render(<WizardToggle {...initialProps} />);

    expect(screen.getByText('substep title')).toBeInTheDocument();
    expect(screen.getByText('Title special')).toBeInTheDocument();
  });
});
