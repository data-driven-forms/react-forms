import React from 'react';
import toJson from 'enzyme-to-json';
import { mount } from 'enzyme';
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import FormTemplate from '../files/form-template';
import componentMapper from '../files/component-mapper';
import WizardStep from '../files/wizard/wizard-step';

describe('<Wizard />', () => {
  const cancelSpy = jest.fn();
  const submitSpy = jest.fn();

  const props = {
    name: 'Wizard',
    component: componentTypes.WIZARD,
    fields: [
      {
        title: 'Step 1',
        name: 1,
        nextStep: 'step-2',
        fields: []
      },
      {
        title: 'Step 2',
        name: 'step-2',
        fields: []
      }
    ]
  };

  const conditionalProps = {
    ...props,
    fields: [
      {
        title: 'Step 1',
        name: 1,
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
            name: 1,
            nextStep: {
              when: 'source-type',
              stepMapper: {
                aws: 'aws-step',
                google: 'google-step'
              }
            },
            fields: [
              {
                component: componentTypes.TEXTAREA,
                name: 'source-name',
                type: 'text',
                label: 'Source name'
              },
              {
                component: componentTypes.SELECT,
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
            name: 'asw-step',
            fields: [
              {
                component: componentTypes.TEXT_FIELD,
                name: 'aws-field',
                label: 'Aws field part'
              }
            ]
          },
          {
            name: 'google-step',
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
      <FormRenderer
        schema={{ fields: [props] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with conditional steps correctly', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [conditionalProps] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with title correctly', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [{ ...props, title: 'Wizard title' }] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render Wizard with stepsInfo correctly', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [{ ...props, stepsInfo: [{ title: 'step1' }, { title: 'step2' }] }] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call cancel', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [props] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={cancelSpy}
        onSubmit={jest.fn()}
      />
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
      <FormRenderer
        schema={{ fields: [props] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(wrapper.find(WizardStep).props().name).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().name).toEqual('step-2');
  });

  it('should not step when clicked on button with false valid', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{
          fields: [
            {
              name: 'Wizard',
              component: componentTypes.WIZARD,
              fields: [
                {
                  title: 'Step 1',
                  name: 1,
                  nextStep: 'step-2',
                  fields: [
                    {
                      component: 'text-field',
                      name: 'required',
                      validate: [{ type: validatorTypes.REQUIRED }]
                    }
                  ]
                },
                {
                  title: 'Step 2',
                  name: 'step-2',
                  fields: []
                }
              ]
            }
          ]
        }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
      />
    );
    expect(wrapper.find(WizardStep).props().name).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().name).toEqual(1);
  });

  it('should submit when clicked on next button 2x', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [props] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={submitSpy}
      />
    );
    expect(submitSpy).not.toHaveBeenCalled();

    let nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();
    nextButton = wrapper.find('button').last();
    nextButton.simulate('click');

    expect(submitSpy).toHaveBeenCalled();
  });

  it('should stepBack when clicked on back button', () => {
    const wrapper = mount(
      <FormRenderer
        schema={{ fields: [props] }}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={submitSpy}
      />
    );
    expect(wrapper.find(WizardStep).props().name).toEqual(1);

    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().name).toEqual('step-2');

    const backButton = wrapper.find('button').at(1);
    backButton.simulate('click');
    wrapper.update();

    expect(wrapper.find(WizardStep).props().name).toEqual(1);
  });

  it('should step to google-step when clicked on next button in conditional schema', () => {
    const wrapper = mount(
      <FormRenderer
        schema={conditionalSchema}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate showFormControls={false} {...props} />}
        onCancel={() => {}}
        onSubmit={jest.fn()}
        initialValues={{ 'source-type': 'google' }}
      />
    );

    expect(wrapper.find(WizardStep).props().name).toEqual(1);
    const nextButton = wrapper.find('button').last();
    nextButton.simulate('click');
    wrapper.update();
    expect(wrapper.find(WizardStep).props().name).toEqual('google-step');
  });
});
