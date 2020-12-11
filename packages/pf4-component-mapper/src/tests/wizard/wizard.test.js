import React from 'react';
import { mount } from 'enzyme';
import toJSon from 'enzyme-to-json';
import { TextInput, Button, WizardNavItem } from '@patternfly/react-core';
import { act } from 'react-dom/test-utils';

import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import * as enterHandle from '@data-driven-forms/common/src/wizard/enter-handler';

import { componentMapper, FormTemplate } from '../../index';
import reducer from '../../files/wizard/reducer';
import commonReducer from '@data-driven-forms/common/src/wizard/reducer';
import WizardToggle from '../../files/wizard/wizard-toggle';

describe('<Wizard />', () => {
  let initialProps;
  let schema;
  let nestedSchema;
  let initialValues;
  let schemaWithHeader;
  let Title;
  let Description;
  let initialValuesNestedSchema;
  let wrapper;

  const nextButtonClick = (wrapper) => {
    wrapper
      .find('.pf-c-wizard__footer')
      .find('button')
      .at(0)
      .simulate('click');

    wrapper.update();
  };

  const backButtonClick = (wrapper) => {
    wrapper
      .find('.pf-c-wizard__footer')
      .find('button')
      .at(1)
      .simulate('click');
    wrapper.update();
  };

  const cancelButtonClick = (wrapper) => {
    wrapper
      .find('.pf-c-wizard__footer')
      .find('button')
      .at(2)
      .simulate('click');
    wrapper.update();
  };

  const closeIconClickWithHeader = (wrapper) => {
    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    wrapper.update();
  };

  const changeValue = (wrapper, value) => {
    wrapper.find('input').instance().value = value;
    wrapper.find('input').simulate('change');
    wrapper.update();
  };

  beforeEach(() => {
    initialValues = {
      'foo-field': 'foo-field-value',
      'bar-field': 'bar-field-value',
      'not-visited-field': 'not-visted-field-value'
    };

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    initialProps = {
      schema,
      componentMapper,
      FormTemplate: (props) => <FormTemplate showFormControls={false} {...props} />,
      onSubmit: jest.fn(),
      onCancel: jest.fn()
    };

    nestedSchema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'nested.foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'nested.second.bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    initialValuesNestedSchema = {
      nested: {
        'foo-field': 'foo-field-value',
        second: {
          'bar-field': 'bar-field-value'
        }
      },
      'not-visited-field': 'not-visted-field-value'
    };

    Title = () => 'Title';
    Description = () => 'description';

    schemaWithHeader = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          title: <Title />,
          description: <Description />,
          inModal: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };
  });

  it('should render correctly and unmount', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should open nav', async () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find(WizardToggle).props().isOpen).toEqual(false);

    await act(async () => {
      wrapper.find('.pf-c-wizard__toggle').simulate('click');
    });
    wrapper.update();

    expect(wrapper.find(WizardToggle).props().isOpen).toEqual(true);
  });

  it('should call enter handler when pressing enter', () => {
    enterHandle.default = jest.fn();

    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(enterHandle.default).not.toHaveBeenCalled();

    const wizard = wrapper.find('.pf-c-wizard');

    const event = { someEvent: true };
    const formOptions = expect.any(Object);
    const handleNext = expect.any(Function);
    const handleSubmit = expect.any(Function);
    const findCurrentStep = expect.any(Function);

    wizard.props().onKeyDown(event);

    expect(enterHandle.default).toHaveBeenCalledWith(event, formOptions, '1', findCurrentStep, handleNext, handleSubmit);
  });

  it('should render correctly with objects as substepOf and nodes titles', () => {
    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          inModal: true,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              nextStep: 'middle-step',
              substepOf: { name: 'summary', title: <h2>Custom title 2</h2> }
            },
            {
              name: 'middle-step',
              title: 'middle-step',
              fields: [],
              substepOf: 'summary',
              nextStep: 'end'
            },
            {
              name: 'end',
              title: <h3>Custom title 3</h3>,
              fields: []
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(
      wrapper
        .find(WizardNavItem)
        .first()
        .props().content
    ).toEqual(<h2>Custom title 2</h2>);

    expect(
      wrapper
        .find(WizardNavItem)
        .first()
        .children()
        .find(WizardNavItem)
    ).toHaveLength(2);

    expect(
      wrapper
        .find(WizardNavItem)
        .last()
        .props().content
    ).toEqual(<h3>Custom title 3</h3>);
  });

  it('should render correctly with custom StepTemplate on field', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              StepTemplate
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(StepTemplate)).toHaveLength(1);
  });

  it('should render correctly with custom StepTemplate on wizard', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          StepTemplate,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: []
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(StepTemplate)).toHaveLength(1);
  });

  it('should render correctly with custom StepTemplate on wizard and step', () => {
    const StepTemplate = () => <h1>Custom StepTemplate</h1>;
    const StepTemplateField = () => <h1>Custom Field StepTemplate</h1>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          StepTemplate,
          fields: [
            {
              title: <h1>Custom title</h1>,
              name: 'first-step',
              fields: [],
              StepTemplate: StepTemplateField
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(StepTemplate)).toHaveLength(0);
    expect(wrapper.find(StepTemplateField)).toHaveLength(1);
  });

  it('should render correctly in modal and unmount', () => {
    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          inModal: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with custom title and description', () => {
    const wrapper = mount(<FormRenderer {...initialProps} schema={schemaWithHeader} />);

    expect(wrapper.find(Title)).toHaveLength(1);
    expect(wrapper.find(Description)).toHaveLength(1);
  });

  it('should render correctly with custom buttons', () => {
    const Buttons = () => <div>Hello</div>;

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              buttons: Buttons,
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(Buttons)).toHaveLength(1);
  });

  it('should call submit function', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<FormRenderer {...initialProps} onSubmit={onSubmit} />);

    nextButtonClick(wrapper);
    nextButtonClick(wrapper);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should go to next step correctly and submit data and formOptions', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<FormRenderer {...initialProps} onSubmit={onSubmit} initialValues={initialValues} />);

    expect(wrapper.find('.pf-m-current').text()).toEqual('foo-step');

    nextButtonClick(wrapper);

    expect(wrapper.find('.pf-m-current').text()).toEqual('bar-step');

    nextButtonClick(wrapper);

    const formOptions = expect.any(Object);
    const state = {
      activeStep: '2',
      activeStepIndex: 1,
      isDynamic: false,
      loading: false,
      maxStepIndex: 1,
      navSchema: [
        { index: 0, name: '1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'foo-step' },
        { index: 1, name: '2', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'bar-step' }
      ],
      prevSteps: ['1'],
      registeredFieldsHistory: { 1: ['foo-field'] }
    };

    expect(onSubmit).toHaveBeenCalledWith(
      {
        'foo-field': 'foo-field-value',
        'bar-field': 'bar-field-value'
      },
      formOptions,
      state
    );
  });

  it('should pass values and state to cancel button', () => {
    const onCancel = jest.fn();

    const wrapper = mount(<FormRenderer {...initialProps} onCancel={(values, state) => onCancel(values, state)} initialValues={initialValues} />);

    cancelButtonClick(wrapper);

    const state = expect.objectContaining({
      activeStep: expect.any(String),
      activeStepIndex: expect.any(Number),
      isDynamic: expect.any(Boolean),
      loading: expect.any(Boolean),
      maxStepIndex: expect.any(Number),
      navSchema: expect.any(Object),
      prevSteps: expect.any(Array)
    });

    expect(onCancel).toHaveBeenCalledWith(initialValues, state);
  });

  it('should pass values and state to cancel - close icon', () => {
    const onCancel = jest.fn();

    const wrapper = mount(
      <FormRenderer {...initialProps} onCancel={(values, state) => onCancel(values, state)} initialValues={initialValues} schema={schemaWithHeader} />
    );

    closeIconClickWithHeader(wrapper);

    const state = expect.objectContaining({
      activeStep: expect.any(String),
      activeStepIndex: expect.any(Number),
      isDynamic: expect.any(Boolean),
      loading: expect.any(Boolean),
      maxStepIndex: expect.any(Number),
      navSchema: expect.any(Object),
      prevSteps: expect.any(Array)
    });

    expect(onCancel).toHaveBeenCalledWith(initialValues, state);
  });

  it('should submit data when nested schema', () => {
    const onSubmit = jest.fn();

    const wrapper = mount(<FormRenderer {...initialProps} schema={nestedSchema} onSubmit={onSubmit} initialValues={initialValuesNestedSchema} />);

    nextButtonClick(wrapper);
    nextButtonClick(wrapper);

    const formOptions = expect.any(Object);
    const state = expect.any(Object);

    expect(onSubmit).toHaveBeenCalledWith(
      {
        nested: {
          'foo-field': 'foo-field-value',
          second: {
            'bar-field': 'bar-field-value'
          }
        }
      },
      formOptions,
      state
    );
  });

  it('should build simple navigation', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(2);
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .first()
        .childAt(0)
        .text()
    ).toEqual('foo-step');
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .text()
    ).toEqual('bar-step');
  });

  it('should jump when click simple navigation', () => {
    const wrapper = mount(<FormRenderer {...initialProps} />);

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    nextButtonClick(wrapper);

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');

    // click on first nav link
    wrapper
      .find('.pf-c-wizard__nav-item')
      .first()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    // go back
    wrapper
      .find('.pf-c-wizard__nav-item')
      .last()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');
  });

  it('should not fail when click on the first step', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} />);
    });
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    // click on first nav link
    await act(async () => {
      wrapper
        .find('.pf-c-wizard__nav-item')
        .first()
        .childAt(0)
        .simulate('click');
    });
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');
  });

  it('should build simple navigation with substeps', () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find('.pf-c-wizard__nav-list')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .at(1)
        .childAt(0)
        .text()
    ).toEqual('barbar');
    expect(
      wrapper
        .find('.pf-c-wizard__nav-list')
        .last()
        .childAt(0)
        .childAt(0)
        .text()
    ).toEqual('bar-step');
  });

  it('should jump with substeps', () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    nextButtonClick(wrapper);

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');

    // click on first nav link
    wrapper
      .find('.pf-c-wizard__nav-item')
      .first()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    // go back through the primary step
    wrapper
      .find('.pf-c-wizard__nav-item')
      .at(1)
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');

    backButtonClick(wrapper);

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');

    // go back through the substep
    wrapper
      .find('.pf-c-wizard__nav-item')
      .last()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');
  });

  it('should jump with substeps and dynamic', () => {
    schema = {
      fields: [
        {
          component: 'wizard',
          name: 'wizard',
          isDynamic: true,
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field'
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
    expect(wrapper.find('.pf-c-wizard__nav-link.pf-m-disabled')).toHaveLength(2); // steps + substep

    nextButtonClick(wrapper);

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-link.pf-m-disabled')).toHaveLength(0);

    // click on first nav link
    wrapper
      .find('.pf-c-wizard__nav-item')
      .first()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    expect(wrapper.find(TextInput).props().name).toEqual('foo-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);

    nextButtonClick(wrapper);

    expect(wrapper.find(TextInput).props().name).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
  });

  it('should disabled button when validating', async () => {
    jest.useFakeTimers();
    const asyncValidator = () => new Promise((res) => setTimeout(() => res(), 100));

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: 'foo',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  validate: [asyncValidator]
                }
              ],
              nextStep: 'ba'
            },
            {
              title: 'bar-step',
              name: 'bar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    let wrapper;

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
    });
    wrapper.update();

    expect(
      wrapper
        .find(Button)
        .first()
        .props().isDisabled
    ).toEqual(true);

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.update();

    expect(
      wrapper
        .find(Button)
        .first()
        .props().isDisabled
    ).toEqual(false);

    jest.useRealTimers();
  });

  it('should disabled navigation when validating - this fails locally, not on CI', async () => {
    jest.useFakeTimers();

    const asyncValidator = jest.fn().mockImplementation(() => new Promise((res) => setTimeout(() => res(), 50)));

    schema = {
      fields: [
        {
          name: 'wizard',
          component: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: 'foo',
              fields: [
                {
                  name: 'foo-field',
                  component: 'text-field',
                  validate: [asyncValidator]
                }
              ],
              nextStep: 'bar'
            },
            {
              title: 'bar-step',
              name: 'bar',
              fields: [
                {
                  name: 'bar-field',
                  component: 'text-field'
                }
              ]
            }
          ]
        }
      ]
    };

    await act(async () => {
      wrapper = mount(<FormRenderer {...initialProps} schema={schema} />);
      jest.advanceTimersByTime(100);
    });
    wrapper.update();

    await act(async () => {
      wrapper
        .find(Button)
        .first()
        .simulate('click');
      jest.advanceTimersByTime(100);
    });
    wrapper.update();

    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(null);

    await act(async () => {
      wrapper
        .find(Button)
        .at(1)
        .simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').instance().value = 'asdsa';
      wrapper.find('input').simulate('change');
    });
    wrapper.update();

    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(true);

    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    wrapper.update();

    await act(async () => {
      jest.runAllTimers();
    });
    wrapper.update();

    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(null);

    jest.useRealTimers();
  });

  it('should disable steps when invalid', () => {
    const schema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              title: 'foo-step',
              name: '1',
              fields: [
                {
                  name: 'foo-field',
                  label: 'foo',
                  component: componentTypes.TEXT_FIELD
                }
              ],
              nextStep: '2'
            },
            {
              name: '2',
              title: 'bar-step',
              substepOf: 'barbar',
              nextStep: '3',
              fields: [
                {
                  name: 'bar-field',
                  label: 'bar',
                  component: componentTypes.TEXT_FIELD,
                  validate: [
                    {
                      type: validatorTypes.REQUIRED
                    }
                  ]
                }
              ]
            },
            {
              name: '3',
              title: 'conan-step',
              substepOf: 'barbar',
              fields: [
                {
                  name: 'conan-field',
                  label: 'conan',
                  component: componentTypes.TEXT_FIELD
                }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = mount(
      <FormRenderer
        schema={schema}
        componentMapper={componentMapper}
        FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
        onSubmit={jest.fn()}
        onCancel={jest.fn()}
      />
    );

    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('foo ');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(4);

    nextButtonClick(wrapper);

    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('bar ');

    nextButtonClick(wrapper);

    // however, it is not possible because form is invalid
    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('bar ');

    changeValue(wrapper, 'hello');
    nextButtonClick(wrapper);

    // voila
    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('conan ');
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(null);

    backButtonClick(wrapper);

    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('bar ');

    changeValue(wrapper, '');
    nextButtonClick(wrapper);

    // it is invalid :(
    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('bar ');

    // let's look if last nav item is disabled (click event is working with 'disabled' <a> element)
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(true);

    // go to first step
    wrapper
      .find('.pf-c-wizard__nav-item')
      .first()
      .childAt(0)
      .simulate('click');
    wrapper.update();

    // still invalid :(
    expect(
      wrapper
        .find('.pf-c-wizard__main-body')
        .children()
        .last()
        .childAt(0)
        .text()
    ).toEqual('foo ');
    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(true);

    // make form valid again
    nextButtonClick(wrapper);
    changeValue(wrapper, 'hello');
    nextButtonClick(wrapper);

    expect(
      wrapper
        .find('.pf-c-wizard__nav-item')
        .last()
        .childAt(0)
        .prop('aria-disabled')
    ).toEqual(null);
  });

  describe('predicting steps', () => {
    const FIRST_TITLE = 'Get started with adding source';
    const SECOND_TITLE_AWS = 'Configure AWS';
    const SECOND_TITLE_GOOLE = 'Configure google';
    const THIRD_TITLE = 'Summary';

    const wizardSchema = {
      fields: [
        {
          component: componentTypes.WIZARD,
          name: 'wizard',
          fields: [
            {
              title: FIRST_TITLE,
              name: 1,
              nextStep: {
                when: 'source.source-type',
                stepMapper: {
                  aws: 'aws',
                  google: 'google'
                }
              },
              fields: [
                {
                  name: 'source.source-type',
                  label: 'Source type',
                  component: componentTypes.TEXT_FIELD
                }
              ]
            },
            {
              title: SECOND_TITLE_AWS,
              name: 'aws',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'aws-field',
                  label: 'Aws field part'
                }
              ]
            },
            {
              title: SECOND_TITLE_GOOLE,
              name: 'google',
              nextStep: 'summary',
              fields: [
                {
                  component: componentTypes.TEXT_FIELD,
                  name: 'google.google-field',
                  label: 'Google field part'
                }
              ]
            },
            {
              title: THIRD_TITLE,
              fields: [],
              name: 'summary'
            }
          ]
        }
      ]
    };

    it('predict steps with dynamic wizard', () => {
      const wrapper = mount(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      expect(wrapper.find(WizardNavItem)).toHaveLength(1);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .text()
      ).toEqual(FIRST_TITLE);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(3);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .text()
      ).toEqual(FIRST_TITLE);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .text()
      ).toEqual(SECOND_TITLE_AWS);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(2)
          .text()
      ).toEqual(THIRD_TITLE);
    });

    it('disable nav when jumped into compileMapper step', () => {
      const wrapper = mount(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(3);

      backButtonClick(wrapper);

      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(2)
          .props().isDisabled
      ).toEqual(true);
    });

    it('disable nav when jumped into compileMapper step', () => {
      const wrapper = mount(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(3);

      backButtonClick(wrapper);

      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(2)
          .props().isDisabled
      ).toEqual(true);
    });

    it('disable nav when jumped into compileMapper step from invalid step', () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws'
                  }
                },
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD
                  }
                ]
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part',
                    validate: [{ type: validatorTypes.REQUIRED }]
                  }
                ]
              }
            ]
          }
        ]
      };

      const wrapper = mount(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(false);

      changeValue(wrapper, undefined);
      backButtonClick(wrapper);

      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
    });

    it('disable nav when jumped into step with function nextStep', () => {
      const NEXTSTEP_FUNCTION = jest.fn().mockReturnValue('aws');
      const wizardSchemaWithNextStepFunction = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: NEXTSTEP_FUNCTION,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD
                  }
                ]
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part'
                  }
                ]
              }
            ]
          }
        ]
      };

      const EXPECTED_VALUES = {
        source: {
          'source-type': 'aws'
        }
      };

      const wrapper = mount(
        <FormRenderer
          schema={wizardSchemaWithNextStepFunction}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);

      backButtonClick(wrapper);

      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);

      const firstArgumentOfLastNextStepCall = NEXTSTEP_FUNCTION.mock.calls[NEXTSTEP_FUNCTION.mock.calls.length - 1][0];
      expect(firstArgumentOfLastNextStepCall).toEqual({ values: EXPECTED_VALUES });
    });

    it('disable nav when jumped into disableForwardJumping step', () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            fields: [
              {
                title: FIRST_TITLE,
                name: 1,
                nextStep: 'aws',
                disableForwardJumping: true,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD
                  }
                ]
              },
              {
                title: SECOND_TITLE_AWS,
                name: 'aws',
                nextStep: 'summary',
                fields: [
                  {
                    component: componentTypes.TEXT_FIELD,
                    name: 'aws-field',
                    label: 'Aws field part'
                  }
                ]
              }
            ]
          }
        ]
      };

      const wrapper = mount(
        <FormRenderer
          schema={wizardSchema}
          componentMapper={componentMapper}
          FormTemplate={(props) => <FormTemplate {...props} showFormControls={false} />}
          onSubmit={jest.fn()}
          onCancel={jest.fn()}
        />
      );

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(false);

      backButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
    });

    it('crossroads variable predicts in realtime', () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            crossroads: ['source.source-type'],
            fields: [
              {
                title: 'first-step',
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws',
                    google: 'summary'
                  }
                },
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD
                  }
                ]
              },
              {
                title: 'second-step',
                name: 'aws',
                nextStep: 'summary',
                fields: []
              },
              {
                title: 'summary',
                name: 'summary',
                fields: []
              }
            ]
          }
        ]
      };

      const wrapper = mount(<FormRenderer {...initialProps} schema={wizardSchema} />);

      expect(wrapper.find(WizardNavItem)).toHaveLength(1);

      changeValue(wrapper, 'aws');

      // predict steps for aws
      expect(wrapper.find(WizardNavItem)).toHaveLength(3);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(2)
          .props().isDisabled
      ).toEqual(true);

      changeValue(wrapper, 'google');

      // predict steps for google
      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);

      nextButtonClick(wrapper);

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(false);

      // click on first nav link
      wrapper
        .find('.pf-c-wizard__nav-item')
        .first()
        .childAt(0)
        .simulate('click');
      wrapper.update();

      // keep the second step enabled
      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(false);

      changeValue(wrapper, 'aws');

      expect(wrapper.find(WizardNavItem)).toHaveLength(3);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(2)
          .props().isDisabled
      ).toEqual(true);

      changeValue(wrapper, 'google');

      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
    });

    it('crossroads variable predicts in realtime - disableForwardJumping', () => {
      const wizardSchema = {
        fields: [
          {
            component: componentTypes.WIZARD,
            name: 'wizard',
            crossroads: ['source.source-type'],
            fields: [
              {
                title: 'first-step',
                name: 1,
                nextStep: {
                  when: 'source.source-type',
                  stepMapper: {
                    aws: 'aws',
                    google: 'summary'
                  }
                },
                disableForwardJumping: true,
                fields: [
                  {
                    name: 'source.source-type',
                    label: 'Source type',
                    component: componentTypes.TEXT_FIELD
                  }
                ]
              },
              {
                title: 'second-step',
                name: 'aws',
                nextStep: 'summary',
                fields: []
              },
              {
                title: 'summary',
                name: 'summary',
                fields: []
              }
            ]
          }
        ]
      };

      const wrapper = mount(<FormRenderer {...initialProps} schema={wizardSchema} />);

      expect(wrapper.find(WizardNavItem)).toHaveLength(1);

      changeValue(wrapper, 'google');

      // predict steps for google
      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);

      nextButtonClick(wrapper);

      // click on first nav link
      wrapper
        .find('.pf-c-wizard__nav-item')
        .first()
        .childAt(0)
        .simulate('click');
      wrapper.update();

      // keep the second step enabled
      expect(wrapper.find(WizardNavItem)).toHaveLength(2);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(0)
          .props().isDisabled
      ).toEqual(false);
      expect(
        wrapper
          .find(WizardNavItem)
          .at(1)
          .props().isDisabled
      ).toEqual(true);
    });
  });

  describe('reducer', () => {
    it('returns default', () => {
      const initialState = { aa: 'aa' };
      expect(reducer(initialState, { type: 'nonsense' })).toEqual(initialState);
    });

    it('closes nav', () => {
      const initialState = { openNav: true };
      expect(reducer(initialState, { type: 'closeNav' })).toEqual({ openNav: false });
    });

    it('returns default', () => {
      const initialState = { openNav: false };
      expect(reducer(initialState, { type: 'openNav' })).toEqual({ openNav: true });
    });

    it('common reducer - correctly assigns substepOf title when node', () => {
      const initialState = {};
      const formOptions = { getState: () => ({}) };
      const customTitle = <span>Custom title</span>;
      const fields = [
        {
          name: 'security',
          title: 'Security',
          nextStep: 'credentials',
          substepOf: { name: 'Configuration', title: customTitle },
          fields: []
        },
        {
          name: 'credentials',
          title: 'Credentials',
          nextStep: 'summary',
          substepOf: 'Configuration',
          fields: []
        },
        {
          name: 'summary',
          title: 'Summary',
          nextStep: 'pepa-step',
          fields: []
        },
        {
          name: 'pepa-step',
          nextStep: 'pepa-step-2',
          title: 'title',
          substepOf: { name: 'pepa', title: 'pepa-title' },
          fields: []
        },
        {
          name: 'pepa-step-2',
          title: 'title 2',
          fields: [],
          substepOf: 'pepa'
        }
      ];

      expect(commonReducer(initialState, { type: 'finishLoading', payload: { formOptions, fields } })).toEqual({
        loading: false,
        navSchema: [
          { index: 0, name: 'security', primary: true, substepOf: 'Configuration', substepOfTitle: customTitle, title: 'Security' },
          {
            index: 1,
            name: 'credentials',
            primary: false,
            substepOf: 'Configuration',
            substepOfTitle: customTitle,
            title: 'Credentials'
          },
          { index: 2, name: 'summary', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'Summary' },
          { index: 3, name: 'pepa-step', primary: true, substepOf: 'pepa', substepOfTitle: 'pepa-title', title: 'title' },
          { index: 4, name: 'pepa-step-2', primary: false, substepOf: 'pepa', substepOfTitle: 'pepa-title', title: 'title 2' }
        ]
      });
    });
  });
});
