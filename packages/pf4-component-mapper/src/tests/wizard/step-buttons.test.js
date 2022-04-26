import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import handleEnter from '@data-driven-forms/common/wizard/enter-handler';

import RenderWithProvider from '../../../../../__mocks__/with-provider';

import WizardStepButtons from '../../wizard/wizard-components/step-buttons';
import componentTypes from '@data-driven-forms/react-form-renderer/component-types';
import { CONDITIONAL_SUBMIT_FLAG } from '@data-driven-forms/common/wizard';
import validatorTypes from '@data-driven-forms/react-form-renderer/validator-types';
import { FormRenderer } from '@data-driven-forms/react-form-renderer';
import FormTemplate from '../../form-template';
import componentMapper from '../../component-mapper';

describe('<WizardSTepButtons', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      conditionalSubmitFlag: 'submit',
      buttonLabels: {
        cancel: 'Cancel',
        next: 'Next',
        submit: 'Submit',
        back: 'Back',
      },
      formOptions: {
        onCancel: jest.fn(),
        handleSubmit: jest.fn(),
        submit: jest.fn(),
        valid: true,
        getState: () => ({
          validating: false,
        }),
      },
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
    };
  });

  it('should render correctly', () => {
    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} />
      </RenderWithProvider>
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('should add custom className to toolbar', () => {
    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} buttonsClassName="foo-class" />
      </RenderWithProvider>
    );

    expect(screen.getByText('Cancel').closest('.foo-class')).toBeInTheDocument();
  });

  it('should call next with correct arguments when next step is string', async () => {
    const handleNext = jest.fn();

    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} handleNext={handleNext} nextStep="next-step" />
      </RenderWithProvider>
    );

    await userEvent.click(screen.getByText('Next'));

    expect(handleNext).toHaveBeenCalledWith('next-step');
  });

  it('should call next with correct arguments when next step is condition', async () => {
    const handleNext = jest.fn();

    render(
      <RenderWithProvider>
        <WizardStepButtons
          {...initialProps}
          handleNext={handleNext}
          formOptions={{
            ...initialProps.formOptions,
            getState: () => ({ values: { foo: 'foo' } }),
          }}
          nextStep={{
            when: 'foo',
            stepMapper: {
              foo: 'bar',
              qux: 'quaxx',
            },
          }}
        />
      </RenderWithProvider>
    );

    await userEvent.click(screen.getByText('Next'));

    expect(handleNext).toHaveBeenCalledWith('bar');
  });

  it('should call submit functions if no next step is defined', async () => {
    const handleSubmit = jest.fn();
    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} formOptions={{ ...initialProps.formOptions, handleSubmit }} nextStep={undefined} />
      </RenderWithProvider>
    );

    await userEvent.click(screen.getByText('Submit'));

    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should call cancel function', async () => {
    const VALUES = { aws: 'yes', password: '123456643' };
    const onCancel = jest.fn();
    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} formOptions={{ ...initialProps.formOptions, onCancel, getState: () => ({ values: VALUES }) }} />
      </RenderWithProvider>
    );

    await userEvent.click(screen.getByText('Cancel'));

    expect(onCancel).toHaveBeenCalled();
  });

  it('should call prev function', async () => {
    const handlePrev = jest.fn();
    render(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} handlePrev={handlePrev} disableBack={false} />
      </RenderWithProvider>
    );

    await userEvent.click(screen.getByText('Back'));

    expect(handlePrev).toHaveBeenCalled();
  });

  describe('.handleEnter', () => {
    let event;
    let formOptions;
    let activeStep;
    let findCurrentStep;
    let handleNext;
    let handleSubmit;

    let nextStep;
    let getRegisteredFields;

    beforeEach(() => {
      nextStep = 'cosi';
      getRegisteredFields = jest.fn();

      event = {
        target: {
          type: 'notbutton',
        },
        key: 'Enter',
        preventDefault: jest.fn(),
      };
      formOptions = {
        valid: true,
        getRegisteredFields,
        getState: () => ({ validating: false }),
      };
      activeStep = 'active-step';
      findCurrentStep = jest.fn().mockImplementation(() => ({ nextStep }));
      handleNext = jest.fn();
      handleSubmit = jest.fn();
    });

    it('should call next', () => {
      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).toHaveBeenCalledWith(nextStep, getRegisteredFields);
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should call submit', () => {
      findCurrentStep = jest.fn().mockImplementation(() => ({}));

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should be prevented if step has custom buttons', () => {
      findCurrentStep = jest.fn().mockImplementation(() => ({ buttons: true }));

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should be prevented if form is not valid', () => {
      formOptions = {
        valid: false,
        getRegisteredFields,
        getState: () => ({ validating: false }),
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('should be prevented if form is validating', () => {
      formOptions = {
        valid: true,
        getRegisteredFields,
        getState: () => ({ validating: true }),
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when key is not enter', () => {
      event = {
        ...event,
        key: 'Spacebar',
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when ctrl is pressed', () => {
      event = {
        ...event,
        ctrlKey: true,
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when shift is pressed', () => {
      event = {
        ...event,
        shiftKey: true,
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when target is button', () => {
      event = {
        ...event,
        target: {
          ...event.target,
          type: 'button',
        },
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it('conditional submit step', async () => {
    const submit = jest.fn();
    const schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              name: 'first-step',
              nextStep: {
                when: 'name',
                stepMapper: {
                  aws: 'summary',
                  submit: CONDITIONAL_SUBMIT_FLAG,
                },
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'name',
                  validate: [{ type: validatorTypes.REQUIRED }],
                  label: 'Name',
                },
              ],
            },
          ],
        },
      ],
    };

    render(
      <FormRenderer
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
        onSubmit={submit}
        schema={schema}
      />
    );

    await userEvent.type(screen.getByLabelText('Name'), 'bla');

    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(() => screen.getByText('Submit')).toThrow();

    await userEvent.clear(screen.getByLabelText('Name'));
    await userEvent.type(screen.getByLabelText('Name'), 'submit');

    expect(() => screen.getByText('Next')).toThrow();
    expect(screen.getByText('Submit')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Submit'));

    expect(submit).toHaveBeenCalledWith({ name: 'submit' }, expect.any(Object), expect.any(Object));
  });
});
