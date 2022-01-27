import React from 'react';
import { render as rtlRender, screen } from '@testing-library/react';

import WizardStep, { RenderTitle } from '../../wizard/wizard-components/wizard-step';
import { Form } from '@data-driven-forms/react-form-renderer';

const render = (children) => rtlRender(<Form onSubmit={jest.fn()}>{() => children}</Form>);

describe('<WizardStep />', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      fields: ['foo'],
      formOptions: {
        renderForm: (item) => <div key={item}>{item}</div>,
        onCancel: jest.fn(),
        handleSubmit: jest.fn(),
        getState: jest.fn(),
      },
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
      buttonLabels: {
        cancel: 'Cancel',
        next: 'Next',
        submit: 'Submit',
        back: 'Back',
      },
      title: 'title',
      conditionalSubmitFlag: 'submit',
    };
  });

  it('should render correctly', () => {
    render(<WizardStep {...initialProps} />);

    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should render title with showTitle', () => {
    render(<WizardStep {...initialProps} showTitle title={<div>title</div>} />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('should render title with showTitles', () => {
    render(<WizardStep {...initialProps} showTitles title={<div>title</div>} />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });

  it('should not render title with showTitles and showTitle = false', () => {
    render(<WizardStep {...initialProps} showTitles showTitle={false} title={<div>title</div>} />);

    expect(() => screen.getByText('title')).toThrow();
  });

  describe('<RenderTitle />', () => {
    const TITLE = 'I am a title';
    const CUSTOM_TITLE = 'Custom title';
    const CustomTitle = <h3>{CUSTOM_TITLE}</h3>;

    it('should render title', () => {
      render(<RenderTitle title={TITLE} />);

      expect(screen.getByText(TITLE)).toBeInTheDocument();
    });

    it('should render custom title', () => {
      render(<RenderTitle title={TITLE} customTitle={CustomTitle} />);

      expect(screen.getByText(CUSTOM_TITLE)).toBeInTheDocument();
      expect(() => screen.getByText(TITLE)).toThrow();
    });
  });
});
