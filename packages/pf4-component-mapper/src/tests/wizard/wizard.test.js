import React from 'react';
import { mount } from 'enzyme';
import toJSon from 'enzyme-to-json';

import FormRenderer, { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

import { formFieldsMapper, layoutMapper } from '../../index';
import Wizard from '../../form-fields/wizard/wizard';
import FieldProvider from '../../../../../__mocks__/mock-field-provider';

describe('<Wizard />', () => {
  let initialProps;
  let schema;
  let nestedSchema;
  let getRegisteredFieldsSchemaMock;
  let getRegisteredFieldsNestedSchemaMock;
  let getValuesNestedSchema;

  const nextButtonClick = (wrapper) =>  {
    wrapper.find('button').at(0).simulate('click');
    wrapper.update();
  };

  const nextButtonClickWithHeader = (wrapper) =>  {
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();
  };

  const backButtonClick = (wrapper) =>  {
    wrapper.find('button').at(1).simulate('click');
    wrapper.update();
  };

  const backButtonClickWithHeader = (wrapper) =>  {
    wrapper.find('button').at(2).simulate('click');
    wrapper.update();
  };

  const changeValue = (wrapper, value) => {
    wrapper.find('input').instance().value = value;
    wrapper.find('input').simulate('change');
    wrapper.update();
  };

  beforeEach(() => {
    initialProps = {
      FieldProvider,
      title: 'Wizard',
      description: 'wizard description',
      formOptions: {
        renderForm: ([{ name }]) => <div key={ name }>{ name }</div>,
        getState: () => ({
          values: {
            'foo-field': 'foo-field-value',
            'bar-field': 'bar-field-value',
            'not-visited-field': 'not-visted-field-value',
          },
        }),
        onCancel: jest.fn(),
        onSubmit: jest.fn(),
        submit: jest.fn(),
        valid: true,
        getRegisteredFields: jest.fn(),
      },
      fields: [{
        stepKey: '1',
        name: 'foo',
        fields: [],
      }],
    };

    schema = [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      fields: [{
        name: 'bar-field',
      }],
    }];

    getRegisteredFieldsSchemaMock = jest.fn();

    getRegisteredFieldsSchemaMock
    .mockReturnValueOnce('foo-field')
    .mockReturnValueOnce('bar-field');

    nestedSchema = [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'nested.foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      fields: [{
        name: 'nested.second.bar-field',
      }],
    }];

    getRegisteredFieldsNestedSchemaMock = jest.fn();

    getRegisteredFieldsNestedSchemaMock
    .mockReturnValueOnce('nested.foo-field')
    .mockReturnValueOnce('nested.second.bar-field');

    getValuesNestedSchema = () => ({
      values: {
        'nested.foo-field': 'foo-field-value',
        'nested.second.bar-field': 'bar-field-value',
        'not-visited-field': 'not-visted-field-value',
      },
    });
  });

  afterEach(() => {
    getRegisteredFieldsSchemaMock.mockReset();
    getRegisteredFieldsNestedSchemaMock.mockReset();
  });

  it('should render correctly and unmount', () => {
    const wrapper = mount(<Wizard { ...initialProps } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly in modal and unmount', () => {
    const wrapper = mount(<Wizard inModal { ...initialProps } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
    wrapper.unmount();
    wrapper.update();
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with custom title and description', () => {
    const wrapper = mount(<Wizard { ...initialProps } title={ <div>Title</div> } description={ <div>description</div> } />);
    expect(toJSon(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with custom buttons', () => {
    const Buttons = () => <div>Hello</div>;

    const wrapper = mount(<Wizard { ...initialProps } fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      buttons: Buttons,
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }] }/>);
    expect(wrapper.find(Buttons).length).toEqual(1);
  });

  it('should call submit function', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard { ...initialProps } formOptions={{ ...initialProps.formOptions, onSubmit }} />);
    nextButtonClickWithHeader(wrapper);

    expect(onSubmit).toHaveBeenCalled();
  });

  it('should go to next step correctly and submit data', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard
      { ...initialProps }
      formOptions={{ ...initialProps.formOptions, onSubmit, getRegisteredFields: getRegisteredFieldsSchemaMock }}
      fields={ schema }
    />);
    nextButtonClickWithHeader(wrapper);

    expect(wrapper.children().instance().state.activeStep).toEqual('2');
    expect(wrapper.children().instance().state.prevSteps).toEqual([ '1' ]);

    nextButtonClickWithHeader(wrapper);

    expect(onSubmit).toHaveBeenCalledWith({
      'foo-field': 'foo-field-value',
      'bar-field': 'bar-field-value',
    });
  });

  it('should submit data when nested schema', () => {
    const onSubmit = jest.fn();
    const wrapper = mount(<Wizard
      { ...initialProps }
      formOptions={{ ...initialProps.formOptions, onSubmit, getRegisteredFields: getRegisteredFieldsNestedSchemaMock, getState: getValuesNestedSchema }}
      fields={ nestedSchema }
    />);

    nextButtonClickWithHeader(wrapper);
    nextButtonClickWithHeader(wrapper);

    expect(onSubmit).toHaveBeenCalledWith({
      nested: {
        'foo-field': 'foo-field-value',
        second: {
          'bar-field': 'bar-field-value',
        },
      },
    });
  });

  it('should build simple navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ schema } />);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).text()).toEqual('foo-step');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).text()).toEqual('bar-step');
  });

  it('should build progressive navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } isDynamic fields={ schema }  />);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);
    expect(wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).text()).toEqual('foo-step');

    nextButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).text()).toEqual('bar-step');
  });

  it('should jump when click simple navigation', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ schema } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    nextButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back
    wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
  });

  it('should build simple navigation with substeps', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__nav-list')).toHaveLength(2);
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
    expect(wrapper.find('.pf-c-wizard__nav-item').at(1).childAt(0).text()).toEqual('barbar');
    expect(wrapper.find('.pf-c-wizard__nav-list').last().childAt(0).childAt(0).text()).toEqual('bar-step');

  });

  it('should jumb with substeps', () => {
    const wrapper = mount(<Wizard { ...initialProps } fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    nextButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back through the primary step
    wrapper.find('.pf-c-wizard__nav-item').at(1).childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');

    backButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');

    // go back through the substep
    wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
  });

  it('should jumb with substeps and dynamic', () => {
    const wrapper = mount(<Wizard { ...initialProps } isDynamic fields={ [{
      title: 'foo-step',
      stepKey: '1',
      name: 'foo',
      fields: [{
        name: 'foo-field',
      }],
      nextStep: '2',
    }, {
      stepKey: '2',
      title: 'bar-step',
      name: 'bar',
      substepOf: 'barbar',
      fields: [{
        name: 'bar-field',
      }],
    }] } />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);

    nextButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);

    // click on first nav link
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo-field');
    // visited step perished from navigation
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(1);

    nextButtonClickWithHeader(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar-field');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(3);
  });

  it('should disable steps when invalid', () => {
    const schema = { fields: [{
      component: componentTypes.WIZARD,
      name: 'wizard',
      fields: [{
        title: 'foo-step',
        stepKey: '1',
        name: 'foo',
        fields: [{
          name: 'foo-field',
          label: 'foo',
          component: componentTypes.TEXT_FIELD,
        }],
        nextStep: '2',
      }, {
        stepKey: '2',
        title: 'bar-step',
        name: 'bar',
        substepOf: 'barbar',
        nextStep: '3',
        fields: [{
          name: 'bar-field',
          label: 'bar',
          component: componentTypes.TEXT_FIELD,
          validate: [{
            type: validatorTypes.REQUIRED,
          }],
        }],
      }, {
        stepKey: '3',
        title: 'conan-step',
        name: 'conan',
        substepOf: 'barbar',
        fields: [{
          name: 'conan-field',
          label: 'conan',
          component: componentTypes.TEXT_FIELD,
        }],
      }],
    }],
    };

    const wrapper = mount(<FormRenderer
      schema={ schema }
      formFieldsMapper={ formFieldsMapper }
      layoutMapper={ layoutMapper }
      onSubmit={ jest.fn() }
      onCancel={ jest.fn() }
      showFormControls={ false }
    />);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo');
    expect(wrapper.find('.pf-c-wizard__nav-item')).toHaveLength(4);

    nextButtonClick(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    nextButtonClick(wrapper);

    // however, it is not possible because form is invalid
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    changeValue(wrapper, 'hello');
    nextButtonClick(wrapper);

    // voila
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('conan');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(false);

    backButtonClick(wrapper);

    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    changeValue(wrapper, '');
    nextButtonClick(wrapper);

    // it is invalid :(
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('bar');

    // let's look if last nav item is disabled (click event is working with 'disabled' <a> element)
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(true);

    // go to first step
    wrapper.find('.pf-c-wizard__nav-item').first().childAt(0).simulate('click');
    wrapper.update();

    // still invalid :(
    expect(wrapper.find('.pf-c-wizard__main-body').children().last().childAt(0).text()).toEqual('foo');
    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(true);

    // make form valid again
    nextButtonClick(wrapper);
    changeValue(wrapper, 'hello');
    nextButtonClick(wrapper);

    expect(wrapper.find('.pf-c-wizard__nav-item').last().childAt(0).prop('aria-disabled')).toEqual(false);
  });

  describe('predicting steps', () => {
    const FIRST_TITLE = 'Get started with adding source';
    const SECOND_TITLE_AWS = 'Configure AWS';
    const SECOND_TITLE_GOOLE = 'Configure google';
    const THIRD_TITLE = 'Summary';

    const wizardSchema = {
      fields: [{
        component: componentTypes.WIZARD,
        name: 'wizard',
        predictSteps: true,
        fields: [{
          title: FIRST_TITLE,
          stepKey: 1,
          nextStep: {
            when: 'source.source-type',
            stepMapper: {
              aws: 'aws',
              google: 'google',
            },
          },
          fields: [{
            name: 'source.source-type',
            label: 'Source type',
            component: componentTypes.TEXT_FIELD,
          }],
        }, {
          title: SECOND_TITLE_AWS,
          stepKey: 'aws',
          nextStep: 'summary',
          fields: [{
            component: componentTypes.TEXT_FIELD,
            name: 'aws-field',
            label: 'Aws field part',
          }],
        }, {
          title: SECOND_TITLE_GOOLE,
          stepKey: 'google',
          nextStep: 'summary',
          fields: [{
            component: componentTypes.TEXT_FIELD,
            name: 'google.google-field',
            label: 'Google field part',
          }],
        }, {
          title: THIRD_TITLE,
          fields: [],
          stepKey: 'summary',
        }],
      }],
    };

    it('predict steps with dynamic wizard', () => {
      const wrapper = mount(<FormRenderer
        schema={ wizardSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      expect(wrapper.find('WizardNavItem')).toHaveLength(1);
      expect(wrapper.find('WizardNavItem').at(0).text()).toEqual(FIRST_TITLE);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(3);
      expect(wrapper.find('WizardNavItem').at(0).text()).toEqual(FIRST_TITLE);
      expect(wrapper.find('WizardNavItem').at(1).text()).toEqual(SECOND_TITLE_AWS);
      expect(wrapper.find('WizardNavItem').at(2).text()).toEqual(THIRD_TITLE);
    });

    it('disable nav when jumped into compileMapper step', () => {
      const wrapper = mount(<FormRenderer
        schema={ wizardSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(3);

      backButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(true);
      expect(wrapper.find('WizardNavItem').at(2).props().isDisabled).toEqual(true);
    });

    it('disable nav when jumped into compileMapper step', () => {
      const wrapper = mount(<FormRenderer
        schema={ wizardSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(3);

      backButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(true);
      expect(wrapper.find('WizardNavItem').at(2).props().isDisabled).toEqual(true);
    });

    it('disable nav when jumped into compileMapper step from invalid step', () => {
      const wizardSchema = {
        fields: [{
          component: componentTypes.WIZARD,
          name: 'wizard',
          predictSteps: true,
          fields: [{
            title: FIRST_TITLE,
            stepKey: 1,
            nextStep: {
              when: 'source.source-type',
              stepMapper: {
                aws: 'aws',
              },
            },
            fields: [{
              name: 'source.source-type',
              label: 'Source type',
              component: componentTypes.TEXT_FIELD,
            }],
          }, {
            title: SECOND_TITLE_AWS,
            stepKey: 'aws',
            nextStep: 'summary',
            fields: [{
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
              validate: [{ type: validatorTypes.REQUIRED }],
            }],
          }],
        }],
      };

      const wrapper = mount(<FormRenderer
        schema={ wizardSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(2);
      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(false);

      changeValue(wrapper, undefined);
      backButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(true);
    });

    it('disable nav when jumped into step with function nextStep', () => {
      const NEXTSTEP_FUNCTION = jest.fn().mockReturnValue('aws');
      const wizardSchemaWithNextStepFunction = {
        fields: [{
          component: componentTypes.WIZARD,
          name: 'wizard',
          predictSteps: true,
          fields: [{
            title: FIRST_TITLE,
            stepKey: 1,
            nextStep: NEXTSTEP_FUNCTION,
            fields: [{
              name: 'source.source-type',
              label: 'Source type',
              component: componentTypes.TEXT_FIELD,
            }],
          }, {
            title: SECOND_TITLE_AWS,
            stepKey: 'aws',
            nextStep: 'summary',
            fields: [{
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
            }],
          }],
        }],
      };

      const EXPECTED_VALUES = { source: {
        'source-type': 'aws',
      }};

      const wrapper = mount(<FormRenderer
        schema={ wizardSchemaWithNextStepFunction }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(2);

      backButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(true);

      const firstArgumentOfLastNextStepCall = NEXTSTEP_FUNCTION.mock.calls[NEXTSTEP_FUNCTION.mock.calls.length - 1][0];
      expect(firstArgumentOfLastNextStepCall).toEqual({ values: EXPECTED_VALUES });
    });

    it('disable nav when jumped into disableForwardJumping step', () => {
      const wizardSchema = {
        fields: [{
          component: componentTypes.WIZARD,
          name: 'wizard',
          predictSteps: true,
          fields: [{
            title: FIRST_TITLE,
            stepKey: 1,
            nextStep: 'aws',
            disableForwardJumping: true,
            fields: [{
              name: 'source.source-type',
              label: 'Source type',
              component: componentTypes.TEXT_FIELD,
            }],
          }, {
            title: SECOND_TITLE_AWS,
            stepKey: 'aws',
            nextStep: 'summary',
            fields: [{
              component: componentTypes.TEXT_FIELD,
              name: 'aws-field',
              label: 'Aws field part',
            }],
          }],
        }],
      };

      const wrapper = mount(<FormRenderer
        schema={ wizardSchema }
        formFieldsMapper={ formFieldsMapper }
        layoutMapper={ layoutMapper }
        onSubmit={ jest.fn() }
        onCancel={ jest.fn() }
        showFormControls={ false }
      />);

      changeValue(wrapper, 'aws');
      nextButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(2);
      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(false);

      backButtonClick(wrapper);

      expect(wrapper.find('WizardNavItem')).toHaveLength(2);
      expect(wrapper.find('WizardNavItem').at(0).props().isDisabled).toEqual(false);
      expect(wrapper.find('WizardNavItem').at(1).props().isDisabled).toEqual(true);
    });
  });
});
