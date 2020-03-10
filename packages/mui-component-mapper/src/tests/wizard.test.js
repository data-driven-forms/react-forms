import React from 'react';
import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';
import Button from '@material-ui/core/Button';

import { componentMapper, FormTemplate } from '../index';
import WizardStep from '../components/wizard/wizard-step';

describe('wizard', () => {
  let initialProps;
  let schema;
  let onSubmit;

  beforeEach(() => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          title: 'A title',
          description: 'A description',
          fields: [
            {
              name: 'first-step',
              title: 'AWS step',
              description: 'This is a AWS step',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }]
                }
              ]
            },
            {
              name: 'summary',
              title: 'Summary',
              description: 'Review your progress',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary'
                }
              ]
            }
          ]
        }
      ]
    };
    onSubmit = jest.fn();
    initialProps = {
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} showFormControls={false} />,
      schema,
      onSubmit: (values) => onSubmit(values)
    };
  });

  it('simple next and back', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('AWS step');

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('AWS step');

    wrapper.find('input').instance().value = 'something';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('Summary');

    wrapper
      .find(Button)
      .first()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('AWS step');
  });

  it('conditional next', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          title: 'A title',
          description: 'A description',
          fields: [
            {
              name: 'first-step',
              title: 'AWS step',
              description: 'This is a AWS step',
              nextStep: {
                when: 'aws',
                stepMapper: {
                  aws: 'summary',
                  google: 'google'
                }
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }]
                }
              ]
            },
            {
              name: 'summary',
              title: 'Summary',
              description: 'Review your progress',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary'
                }
              ]
            },
            {
              name: 'google',
              title: 'Google',
              description: 'Some google stuff',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'googlesummary'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('AWS step');

    wrapper.find('input').instance().value = 'aws';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('Summary');

    wrapper
      .find(Button)
      .first()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('AWS step');

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find(WizardStep)
        .find('h5')
        .text()
    ).toEqual('Google');
  });

  it('conditional submit', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          title: 'A title',
          description: 'A description',
          fields: [
            {
              name: 'first-step',
              title: 'AWS step',
              description: 'This is a AWS step',
              nextStep: {
                when: 'aws',
                stepMapper: {
                  aws: 'summary',
                  google: 'google'
                }
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  validate: [{ type: validatorTypes.REQUIRED }]
                }
              ]
            },
            {
              name: 'summary',
              title: 'Summary',
              description: 'Review your progress',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary'
                }
              ]
            },
            {
              name: 'google',
              title: 'Google',
              description: 'Some google stuff',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'googlesummary'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    wrapper.find('input').instance().value = 'aws';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    wrapper
      .find('textarea')
      .first()
      .instance().value = 'summary';
    wrapper
      .find('textarea')
      .first()
      .simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'aws',
      summary: 'summary'
    });
    onSubmit.mockClear();

    wrapper
      .find(Button)
      .first()
      .simulate('click');
    wrapper.update();

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    wrapper
      .find('textarea')
      .first()
      .instance().value = 'google summary';
    wrapper
      .find('textarea')
      .first()
      .simulate('change');
    wrapper.update();

    wrapper
      .find(Button)
      .last()
      .simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'google',
      googlesummary: 'google summary'
    });
    onSubmit.mockClear();
  });
});
