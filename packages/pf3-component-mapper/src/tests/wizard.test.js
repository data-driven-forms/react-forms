import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import MockFieldProvider from './mock-field-provider';
import Wizard from '../form-fields/wizzard/wizzard';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { formFieldsMapper, layoutMapper } from '../';

describe('<Wizard />', () => {
  const cancelSpy = jest.fn();
  const submitSpy = jest.fn();

  const props = {
    name: 'Wizard',
    FieldProvider: MockFieldProvider,
    fields: [
      {
        title: 'Step 1',
        name: 'step-1',
        stepKey: 1,
        nextStep: 'step-2',
        fields: [],
      },
      {
        title: 'Step 2',
        name: 'step-2',
        stepKey: 'step-2',
        fields: [],
      },
    ],
    formOptions: {
      onSubmit: submitSpy,
      onCancel: cancelSpy,
      valid: true,
      getState: () => ({ values: { a: 10 }}),
      submit: () => {},
    },
  };

  const conditionalProps = {
    ...props,
    fields: [
      {
        title: 'Step 1',
        name: 'step-1',
        stepKey: 1,
        nextStep: {
          when: 'step',
          stepMapper: {
            step: 'step-2',
          },
        },
        fields: [],
      },
      {
        title: 'Step 2',
        name: 'step-2',
        stepKey: 'step-2',
        fields: [],
      },
    ],
  };

  const conditionalSchema = {
    fields: [{
      component: componentTypes.WIZARD,
      name: 'wizzard',
      fields: [{
        name: 'step-1',
        stepKey: 1,
        nextStep: {
          when: 'source-type',
          stepMapper: {
            aws: 'aws-step',
            google: 'google-step',
          },
        },
        fields: [{
          component: componentTypes.TEXTAREA_FIELD,
          name: 'source-name',
          type: 'text',
          label: 'Source name',
        }, {
          component: componentTypes.SELECT_COMPONENT,
          name: 'source-type',
          label: 'Source type',
          options: [{
            label: 'Please Choose',
          }, {
            value: 'aws',
            label: 'Aws',
          }, {
            value: 'google',
            label: 'Google',
          }],
          validate: [{
            type: validatorTypes.REQUIRED,
          }],
        }],
      }, {
        name: 'step-2',
        stepKey: 'aws-step',
        fields: [{
          component: componentTypes.TEXT_FIELD,
          name: 'aws-field',
          label: 'Aws field part',
        }],
      }, {
        stepKey: 'google-step',
        name: 'step-3',
        fields: [{
          component: componentTypes.TEXT_FIELD,
          name: 'google-field',
          label: 'Google field part',
        }],
      }],
    }],
  };

  afterEach(() => {
    cancelSpy.mockReset();
    submitSpy.mockReset();
  });

  it('should render Wizard correctly', () => {
    const wrapper = mount(
      <Wizard { ...props } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with conditional steps correctly', () => {
    const wrapper = mount(
      <Wizard { ...conditionalProps } />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with title correctly', () => {
    const wrapper = mount(
      <Wizard { ...props } title={ 'Wizard title' }/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with stepsInfo correctly', () => {
    const wrapper = mount(
      <Wizard { ...props } stepsInfo={ [{ title: 'step1' }, { title: 'step2' }] }/>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call cancel', () => {
    const wrapper = mount(
      <Wizard { ...props } />
    );
    wrapper.find('button').first().simulate('click');
    wrapper.update();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should step when clicked on next button', () => {
    const wrapper = mount(
      <Wizard { ...props } />
    );
    expect(wrapper.instance().state.activeStep).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    expect(wrapper.instance().state.activeStep).toEqual('step-2');
  });

  it('should not step when clicked on button with false valid', () => {
    const wrapper = mount(
      <Wizard { ...props } formOptions={{ ...props.formOptions, valid: false }}  />
    );
    expect(wrapper.instance().state.activeStep).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    expect(wrapper.instance().state.activeStep).toEqual(1);
  });

  it('should submit when clicked on next button 2x', () => {
    const wrapper = mount(
      <Wizard { ...props } />
    );
    expect(submitSpy).not.toHaveBeenCalled();

    let nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    expect(submitSpy).toHaveBeenCalled();
  });

  it('should stepBack when clicked on back button', () => {
    const wrapper = mount(
      <Wizard { ...props } />
    );
    expect(wrapper.instance().state.activeStep).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    expect(wrapper.instance().state.activeStep).toEqual('step-2');

    const backButton = wrapper.find('button').at(1);
    backButton.simulate('click');

    expect(wrapper.instance().state.activeStep).toEqual(1);
  });

  it('should step to google-step when clicked on next button in conditional schema', () => {
    const wrapper = mount(
      <FormRenderer
        schema={ conditionalSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onCancel={ () => {} }
        showFormControls={ false }
        onSubmit={ jest.fn() }
        schemaType="default"
        initialValues={{ 'source-type': 'google' }}
      />
    );

    const wizzardField = wrapper.find(Wizard).instance();
    expect(wizzardField.state.activeStep).toEqual(1);
    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    expect(wizzardField.state.activeStep).toEqual('google-step');
  });
});
