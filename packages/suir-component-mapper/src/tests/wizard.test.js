import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';

describe('wizard', () => {
  let initialProps;
  let schema;
  let onSubmit;
  let onCancel;

  beforeEach(() => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          stepsInfo: [
            {
              title: 'AWS step'
            },
            {
              title: 'Summary'
            }
          ],
          fields: [
            {
              name: 'first-step',
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
    onCancel = jest.fn();
    initialProps = {
      componentMapper,
      FormTemplate: (props) => <FormTemplate {...props} showFormControls={false} />,
      schema,
      onSubmit: (values) => onSubmit(values),
      onCancel: (values) => onCancel(values)
    };
  });

  it('simple next and back', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('AWS step');

    wrapper
      .find('button')
      .last()
      .simulate('click'); // disabled next
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('AWS step');

    wrapper.find('input').instance().value = 'something';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button')
      .last()
      .simulate('click'); // next
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('Summary');

    wrapper
      .find('button')
      .at(1)
      .simulate('click'); // back
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
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
          stepsInfo: [
            {
              title: 'First step'
            },
            {
              title: 'Last step'
            }
          ],
          fields: [
            {
              name: 'first-step',
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
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'summary'
                }
              ]
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
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
        .find('.active.step')
        .first()
        .text()
    ).toEqual('First step');

    wrapper.find('input').instance().value = 'aws';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button')
      .last()
      .simulate('click'); // next
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('Last step');
    expect(wrapper.find('input').instance().name).toEqual('summary');

    wrapper
      .find('button')
      .at(1) // back
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('First step');

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button')
      .last() // next
      .simulate('click');
    wrapper.update();

    expect(
      wrapper
        .find('.active.step')
        .first()
        .text()
    ).toEqual('Last step');
    expect(wrapper.find('input').instance().name).toEqual('googlesummary');
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
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary'
                }
              ]
            },
            {
              name: 'google',
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
      .find('button')
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
      .find('button')
      .last()
      .simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'aws',
      summary: 'summary'
    });
    onSubmit.mockClear();

    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    wrapper.update();

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button')
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
      .find('button')
      .last()
      .simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'google',
      googlesummary: 'google summary'
    });
    onSubmit.mockClear();
  });

  it('sends values to cancel', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    wrapper.find('input').instance().value = 'something';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button')
      .first()
      .simulate('click'); // disabled next
    wrapper.update();

    expect(onCancel).toHaveBeenCalledWith({
      aws: 'something'
    });
  });
});
