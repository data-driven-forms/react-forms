import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import MockFieldProvider from '../../../../__mocks__/mock-field-provider';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import formTemplate from '../components/form-template';
import componentMapper from '../components/component-mapper';
import Wizard from '../components/wizard';
import RenderWithProvider from '../../../../__mocks__/with-provider';
import WizardStep from '../components/wizard/wizard-step';

describe('<Wizard />', () => {
  const cancelSpy = jest.fn();
  const submitSpy = jest.fn();

  const formOptions = {
    onSubmit: submitSpy,
    onCancel: cancelSpy,
    valid: true,
    getState: () => ({ values: { a: 10 }}),
    submit: () => {}
  };

  const props = {
    name: 'Wizard',
    FieldProvider: MockFieldProvider,
    fields: [
      {
        title: 'Step 1',
        name: 'step-1',
        stepKey: 1,
        nextStep: 'step-2',
        fields: []
      },
      {
        title: 'Step 2',
        name: 'step-2',
        stepKey: 'step-2',
        fields: []
      }
    ]
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
            step: 'step-2'
          }
        },
        fields: []
      },
      {
        title: 'Step 2',
        name: 'step-2',
        stepKey: 'step-2',
        fields: []
      }
    ]
  };

  const conditionalSchema = {
    fields: [
      {
        component: componentTypes.WIZARD,
        name: 'wizzard',
        fields: [
          {
            name: 'step-1',
            stepKey: 1,
            nextStep: {
              when: 'source-type',
              stepMapper: {
                aws: 'aws-step',
                google: 'google-step'
              }
            },
            fields: [
              {
                component: componentTypes.TEXTAREA_FIELD,
                name: 'source-name',
                type: 'text',
                label: 'Source name'
              },
              {
                component: componentTypes.SELECT_COMPONENT,
                name: 'source-type',
                label: 'Source type',
                options: [
                  {
                    label: 'Please Choose'
                  },
                  {
                    value: 'aws',
                    label: 'Aws'
                  },
                  {
                    value: 'google',
                    label: 'Google'
                  }
                ],
                validate: [
                  {
                    type: validatorTypes.REQUIRED
                  }
                ]
              }
            ]
          },
          {
            name: 'step-2',
            stepKey: 'aws-step',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'aws-field',
                label: 'Aws field part'
              }
            ]
          },
          {
            stepKey: 'google-step',
            name: 'step-3',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'google-field',
                label: 'Google field part'
              }
            ]
          }
        ]
      }
    ]
  };

  afterEach(() => {
    cancelSpy.mockReset();
    submitSpy.mockReset();
  });

  it('should render Wizard correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with conditional steps correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...conditionalProps} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with title correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} title={'Wizard title'} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with stepsInfo correctly', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} stepsInfo={[{ title: 'step1' }, { title: 'step2' }]} />
      </RenderWithProvider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call cancel', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    wrapper
    .find('button')
    .first()
    .simulate('click');
    wrapper.update();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should step when clicked on next button', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().stepKey).toEqual('step-2');
  });

  it('should not step when clicked on button with false valid', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions: { ...formOptions, valid: false }}}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);
  });

  it('should submit when clicked on next button 2x', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    expect(submitSpy).not.toHaveBeenCalled();

    let nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();
    nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    console.log(nextButton.debug());

    expect(submitSpy).toHaveBeenCalled();
  });

  it('should stepBack when clicked on back button', () => {
    const wrapper = mount(
      <RenderWithProvider value={{ formOptions }}>
        <Wizard {...props} />
      </RenderWithProvider>
    );
    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().stepKey).toEqual('step-2');

    const backButton = wrapper.find('button').at(1);
    backButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);
  });

  it('should step to google-step when clicked on next button in conditional schema', () => {
    const wrapper = mount(
      <FormRenderer
        schema={conditionalSchema}
        formFieldsMapper={componentMapper}
        formTemplate={formTemplate({ showFormControls: false })}
        onCancel={() => {}}
        onSubmit={jest.fn()}
        initialValues={{ 'source-type': 'google' }}
      />
    );

    expect(wrapper.find(WizardStep).props().stepKey).toEqual(1);
    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();
    expect(wrapper.find(WizardStep).props().stepKey).toEqual('google-step');
  });
});
