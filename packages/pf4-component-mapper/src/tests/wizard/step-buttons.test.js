import React from 'react';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import selectNext from '@data-driven-forms/common/wizard/select-next';
import handleEnter from '@data-driven-forms/common/wizard/enter-handler';

import RenderWithProvider from '../../../../../__mocks__/with-provider';

import WizardStepButtons from '../../wizard/wizard-components/step-buttons';

describe('<WizardSTepButtons', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
      buttonLabels: {
        cancel: 'Cancel',
        next: 'Next',
        submit: 'Submit',
        back: 'Back'
      },
      formOptions: {
        onCancel: jest.fn(),
        handleSubmit: jest.fn(),
        submit: jest.fn(),
        valid: true,
        getState: () => ({
          validating: false
        })
      },
      handlePrev: jest.fn(),
      handleNext: jest.fn()
    };
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} />
      </RenderWithProvider>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('should add custom className to toolbar', () => {
    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} buttonsClassName="foo-class" />
      </RenderWithProvider>
    );
    expect(mountToJson(wrapper)).toMatchSnapshot();
  });

  it('should call next with correct arguments when next step is string', () => {
    const handleNext = jest.fn();

    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} handleNext={handleNext} nextStep="next-step" />
      </RenderWithProvider>
    );

    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleNext).toHaveBeenCalledWith('next-step');
  });

  it('should call next with correct arguments when next step is condition', () => {
    const handleNext = jest.fn();

    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons
          {...initialProps}
          handleNext={handleNext}
          formOptions={{
            ...initialProps.formOptions,
            getState: () => ({ values: { foo: 'foo' } })
          }}
          nextStep={{
            when: 'foo',
            stepMapper: {
              foo: 'bar',
              qux: 'quaxx'
            }
          }}
        />
      </RenderWithProvider>
    );

    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleNext).toHaveBeenCalledWith('bar');
  });

  it('should call submit functions if no next step is defined', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} formOptions={{ ...initialProps.formOptions, handleSubmit }} nextStep={undefined} />
      </RenderWithProvider>
    );
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should call cancel function', () => {
    const VALUES = { aws: 'yes', password: '123456643' };
    const onCancel = jest.fn();
    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} formOptions={{ ...initialProps.formOptions, onCancel, getState: () => ({ values: VALUES }) }} />
      </RenderWithProvider>
    );
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call prev function', () => {
    const handlePrev = jest.fn();
    const wrapper = mount(
      <RenderWithProvider>
        <WizardStepButtons {...initialProps} handlePrev={handlePrev} disableBack={false} />
      </RenderWithProvider>
    );
    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(handlePrev).toHaveBeenCalled();
  });

  describe('.selectNext', () => {
    const VALUE = 'value';
    const EXPECTED_NEXT_STEP = 'barisko';

    const GET_STATE = () => ({
      values: {
        foo: VALUE
      }
    });

    it('should return string nextstep', () => {
      const NEXTSTEP = EXPECTED_NEXT_STEP;

      expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
    });

    it('should return stepmapper nextstep', () => {
      const NEXTSTEP = {
        when: 'foo',
        stepMapper: {
          [VALUE]: EXPECTED_NEXT_STEP
        }
      };

      expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
    });

    it('should return custom func nextstep', () => {
      const NEXTSTEP = ({ values }) => {
        if (values.foo === VALUE) {
          return EXPECTED_NEXT_STEP;
        }
      };

      expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
    });
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
          type: 'notbutton'
        },
        key: 'Enter',
        preventDefault: jest.fn()
      };
      formOptions = {
        valid: true,
        getRegisteredFields,
        getState: () => ({ validating: false })
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
        getState: () => ({ validating: false })
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
        getState: () => ({ validating: true })
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when key is not enter', () => {
      event = {
        ...event,
        key: 'Spacebar'
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when ctrl is pressed', () => {
      event = {
        ...event,
        ctrlKey: true
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('nothing happen when shift is pressed', () => {
      event = {
        ...event,
        shiftKey: true
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
          type: 'button'
        }
      };

      handleEnter(event, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(handleNext).not.toHaveBeenCalled();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
