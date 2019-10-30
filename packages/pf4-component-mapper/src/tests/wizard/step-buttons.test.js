import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import WizardStepButtons, { selectNext } from '../../form-fields/wizard/step-buttons';

describe('<WizardSTepButtons', () => {
  let initialProps;
  beforeEach(() => {
    initialProps = {
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
      },
      handlePrev: jest.fn(),
      handleNext: jest.fn(),
    };
  });

  it('should render correctly', () => {
    const wrapper = shallow(<WizardStepButtons { ...initialProps } />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should add custom className to toolbar', () => {
    const wrapper = shallow(<WizardStepButtons { ...initialProps } buttonsClassName="foo-class" />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should call next with correct arguments when next step is string', () => {
    const handleNext = jest.fn();
    const wrapper = mount(<WizardStepButtons { ...initialProps } handleNext={ handleNext }  nextStep="next-step" />);
    wrapper.find('button').at(0).simulate('click');
    expect(handleNext).toHaveBeenCalledWith('next-step');
  });

  it('should call next with correct arguments when next step is condition', () => {
    const handleNext = jest.fn();
    const wrapper = mount(
      <WizardStepButtons
        { ...initialProps }
        handleNext={ handleNext }
        formOptions={{
          ...initialProps.formOptions,
          getState: () => ({ values: { foo: 'foo' }}),
        }}
        nextStep={{
          when: 'foo',
          stepMapper: {
            foo: 'bar',
            qux: 'quaxx',
          },
        }} />);
    wrapper.find('button').at(0).simulate('click');
    expect(handleNext).toHaveBeenCalledWith('bar');
  });

  it('should call submit functions if no next step is defined', () => {
    const handleSubmit = jest.fn();
    const wrapper = mount(<WizardStepButtons
      { ...initialProps }
      formOptions={{ ...initialProps.formOptions, handleSubmit }}
      nextStep={ undefined }
    />);
    wrapper.find('button').at(0).simulate('click');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should call cancel function', () => {
    const onCancel = jest.fn();
    const wrapper = mount(<WizardStepButtons { ...initialProps } formOptions={{ ...initialProps.formOptions, onCancel }} />);
    wrapper.find('button').last().simulate('click');
    expect(onCancel).toHaveBeenCalled();
  });

  it('should call prev function', () => {
    const handlePrev = jest.fn();
    const wrapper = mount(<WizardStepButtons { ...initialProps } handlePrev={ handlePrev } disableBack={ false }/>);
    wrapper.find('button').at(1).simulate('click');
    expect(handlePrev).toHaveBeenCalled();
  });

  describe('.selectNext', () => {
    const VALUE = 'value';
    const EXPECTED_NEXT_STEP = 'barisko';

    const GET_STATE = () => ({
      values: {
        foo: VALUE,
      },
    });

    it('should return string nextstep', () => {
      const NEXTSTEP = EXPECTED_NEXT_STEP;

      expect(selectNext(NEXTSTEP, GET_STATE)).toEqual(EXPECTED_NEXT_STEP);
    }),

    it('should return stepmapper nextstep', () => {
      const NEXTSTEP = {
        when: 'foo',
        stepMapper: {
          [VALUE]: EXPECTED_NEXT_STEP,
        },
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
});
