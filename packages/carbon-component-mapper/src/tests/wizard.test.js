import React from 'react';
import { FormRenderer, componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import { componentMapper, FormTemplate } from '../index';
import { CONDITIONAL_SUBMIT_FLAG } from '@data-driven-forms/common/wizard';

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
          NextButtonProps: { id: 'next' },
          BackButtonProps: { id: 'back' },
          stepsInfo: [{ title: 'First step' }, { title: 'Summary' }],
          fields: [
            {
              name: 'first-step',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws',
                  label: 'somelabel',
                  validate: [{ type: validatorTypes.REQUIRED }]
                }
              ]
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                  label: 'somelabel'
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
        .find('.bx--progress-label')
        .first()
        .text()
    ).toEqual('First step');
    expect(
      wrapper
        .find('.bx--progress-label')
        .last()
        .text()
    ).toEqual('Summary');

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('button#next').simulate('click'); // disabled next
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('input').instance().value = 'something';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper.find('button#next').simulate('click'); // next
    wrapper.update();

    expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);

    wrapper.find('button#back').simulate('click'); // back
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('button#next').simulate('click'); // next
    wrapper.update();

    expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);

    wrapper
      .find('button.bx--progress-step-button')
      .first()
      .simulate('click'); // back in navigation
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);
  });

  it('simple next and back - vertical ', () => {
    initialProps = {
      ...initialProps,
      schema: {
        fields: [
          {
            ...initialProps.schema.fields[0],
            vertical: true
          }
        ]
      }
    };

    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(
      wrapper
        .find('.bx--progress-label')
        .first()
        .text()
    ).toEqual('First step');
    expect(
      wrapper
        .find('.bx--progress-label')
        .last()
        .text()
    ).toEqual('Summary');

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('button#next').simulate('click'); // disabled next
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('input').instance().value = 'something';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper.find('button#next').simulate('click'); // next
    wrapper.update();

    expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);

    wrapper.find('button#back').simulate('click'); // back
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('button#next').simulate('click'); // next
    wrapper.update();

    expect(wrapper.find('textarea[name="summary"]')).toHaveLength(1);

    wrapper
      .find('button.bx--progress-step-button')
      .first()
      .simulate('click'); // back in navigation
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);
  });

  it('conditional next', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          NextButtonProps: { id: 'next' },
          BackButtonProps: { id: 'back' },
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
                  validate: [{ type: validatorTypes.REQUIRED }],
                  label: 'somelabel'
                }
              ]
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'summary',
                  label: 'somelabel'
                }
              ]
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'googlesummary',
                  label: 'somelabel'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('input').instance().value = 'aws';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper.find('button#next').simulate('click'); // next
    wrapper.update();

    expect(wrapper.find('input').instance().name).toEqual('summary');

    wrapper
      .find('button#back') // back
      .simulate('click');
    wrapper.update();

    expect(wrapper.find('input[name="aws"]')).toHaveLength(1);

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper
      .find('button#next') // next
      .simulate('click');
    wrapper.update();

    expect(wrapper.find('input').instance().name).toEqual('googlesummary');
  });

  it('conditional submit', () => {
    schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          NextButtonProps: { id: 'next' },
          BackButtonProps: { id: 'back' },
          SubmitButtonProps: { id: 'submit' },
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
                  validate: [{ type: validatorTypes.REQUIRED }],
                  label: 'somelabel'
                }
              ]
            },
            {
              name: 'summary',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'summary',
                  label: 'somelabel'
                }
              ]
            },
            {
              name: 'google',
              fields: [
                {
                  component: componentTypes.TEXTAREA,
                  name: 'googlesummary',
                  label: 'somelabel'
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

    wrapper.find('button#next').simulate('click');
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

    wrapper.find('button#submit').simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'aws',
      summary: 'summary'
    });
    onSubmit.mockClear();

    wrapper.find('button#back').simulate('click');
    wrapper.update();

    wrapper.find('input').instance().value = 'google';
    wrapper.find('input').simulate('change');
    wrapper.update();

    wrapper.find('button#next').simulate('click');
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

    wrapper.find('button#submit').simulate('click');
    wrapper.update();

    expect(onSubmit).toHaveBeenCalledWith({
      aws: 'google',
      googlesummary: 'google summary'
    });
    onSubmit.mockClear();
  });

  it('conditional submit step', () => {
    const submit = jest.fn();
    schema = {
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
                  submit: CONDITIONAL_SUBMIT_FLAG
                }
              },
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'name',
                  validate: [{ type: validatorTypes.REQUIRED }]
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} onSubmit={submit} schema={schema} />);

    wrapper.find('input').instance().value = 'bla';
    wrapper.find('input').simulate('change');
    wrapper.update();

    expect(wrapper.find('button.bx--btn.bx--btn--primary').text()).toEqual('Next');

    wrapper.find('input').instance().value = 'submit';
    wrapper.find('input').simulate('change');
    wrapper.update();

    expect(wrapper.find('button.bx--btn.bx--btn--primary').text()).toEqual('Submit');
    wrapper.find('button.bx--btn.bx--btn--primary').simulate('click');
    expect(submit).toHaveBeenCalledWith({ name: 'submit' }, expect.any(Object), expect.any(Object));
  });
});
