import React, { useContext } from 'react';
import { act } from 'react-dom/test-utils';
import { FormRenderer, WizardContext, componentTypes, useFieldApi } from '@data-driven-forms/react-form-renderer';
import { mount } from 'enzyme';

import Wizard from '../../wizard';

describe('wizard test', () => {
  let state;
  let wrapper;

  const fields = [
    {
      name: 'step1',
      nextStep: 'step2',
      title: 'step1',
      fields: [],
    },
    {
      name: 'step2',
      substepOf: { title: 'title', name: 'eaa' },
      nextStep: 'step3',
      fields: [],
    },
    {
      name: 'step3',
      substepOf: 'eaa',
      nextStep: {
        when: 'field1',
        stepMapper: {
          x: 'step4',
        },
      },
      fields: [],
    },
    { name: 'step4', nextStep: ({ values }) => values.field2, fields: [] },
    { name: 'step5', fields: [] },
  ];

  // expected navSchema
  const navSchema = [
    { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
    { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
    { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
  ];

  const spyState = (newState) => {
    state = newState;
  };

  const Dummy = () => {
    const { handleNext, handlePrev, setPrevSteps, onKeyDown, formOptions, selectNext, jumpToStep, ...state } = useContext(WizardContext);

    spyState(state);

    return (
      <React.Fragment>
        <button id="handleNext" onClick={() => handleNext(selectNext(state.currentStep.nextStep, formOptions.getState))} />
        <button id="handlePrev" onClick={handlePrev} />
        <button id="setPrevSteps" onClick={setPrevSteps} />
        <button id="jumpToStepValid" onClick={() => jumpToStep(0, true)} />
        <button id="jumpToStepInvalid" onClick={() => jumpToStep(0, false)} />
        <button id="handleSubmit" onClick={formOptions.handleSubmit} />
        <div id="onKeyDown" onKeyDown={onKeyDown} />
        {formOptions.renderForm(state.currentStep?.fields || [])}
      </React.Fragment>
    );
  };

  const WizardTest = (props) => <Wizard Wizard={Dummy} {...props} />;

  const rendererProps = {
    onSubmit: jest.fn(),
    FormTemplate: ({ formFields }) => formFields,
    componentMapper: { [componentTypes.WIZARD]: WizardTest },
    schema: {
      fields: [
        {
          name: 'wizard',
          component: componentTypes.WIZARD,
          fields,
        },
      ],
    },
  };

  it('handle next and handle prev', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 0,
      navSchema,
      prevSteps: [],
    });

    await act(async () => {
      wrapper.find('#handleNext').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 1,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step2', nextStep: 'step3', substepOf: { name: 'eaa', title: 'title' } },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1'],
    });

    await act(async () => {
      wrapper.find('#handlePrev').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1', 'step2'],
    });
  });

  it('creates full schema', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} initialValues={{ field1: 'x', field2: 'step5' }} />);
    });
    wrapper.update();

    expect(state.navSchema).toEqual([
      { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
      { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
      { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
      { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
      { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
    ]);
  });

  it('onKeyDown - goes to the next step', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#onKeyDown').simulate('keydown', { preventDefault: jest.fn(), key: 'Enter' });
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 1,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step2', nextStep: 'step3', substepOf: { name: 'eaa', title: 'title' } },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1'],
    });
  });

  it('jumpToStep - when valid', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleNext').simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#jumpToStepValid').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1', 'step2'],
    });
  });

  it('jumpToStep - when invalid', async () => {
    await act(async () => {
      wrapper = mount(<FormRenderer {...rendererProps} />);
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleNext').simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#jumpToStepInvalid').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1', 'step2'],
    });
  });

  it('setPrevSteps - resets state according to the current path', async () => {
    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          schema={{
            fields: [
              {
                component: componentTypes.WIZARD,
                name: 'wizard',
                fields,
                initialState: {
                  prevSteps: ['step1', 'step2', 'step3'],
                },
              },
            ],
          }}
        />
      );
    });
    wrapper.update();

    expect(state.prevSteps).toEqual(['step1', 'step2', 'step3']);

    await act(async () => {
      wrapper.find('#setPrevSteps').simulate('click');
    });
    wrapper.update();

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 0,
      navSchema,
      prevSteps: [],
    });
  });

  it('submits sends only visited values', async () => {
    const DummyTextField = (props) => {
      const { input } = useFieldApi(props);
      return <input {...input} />;
    };

    const submitSpy = jest.fn();

    await act(async () => {
      wrapper = mount(
        <FormRenderer
          {...rendererProps}
          componentMapper={{
            ...rendererProps.componentMapper,
            [componentTypes.TEXT_FIELD]: DummyTextField,
          }}
          onSubmit={(values) => submitSpy(values)}
          schema={{
            fields: [
              {
                component: componentTypes.WIZARD,
                name: 'wizard',
                fields: [
                  {
                    name: 'step1',
                    nextStep: {
                      when: 'value1',
                      stepMapper: {
                        x: 'step2',
                        y: 'step3',
                      },
                    },
                    fields: [{ component: componentTypes.TEXT_FIELD, name: 'value1', initialValue: 'x' }],
                  },
                  {
                    name: 'step2',
                    fields: [{ component: componentTypes.TEXT_FIELD, name: 'value2', initialValue: 'x-value2' }],
                  },
                  {
                    name: 'step3',
                    fields: [{ component: componentTypes.TEXT_FIELD, name: 'value3', initialValue: 'x-value3' }],
                  },
                ],
              },
            ],
          }}
        />
      );
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleNext').simulate('click');
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('#handleSubmit').simulate('click');
    });
    wrapper.update();

    expect(submitSpy).toHaveBeenCalledWith({ value1: 'x', value2: 'x-value2' });
    submitSpy.mockClear();

    await act(async () => {
      wrapper.find('#handlePrev').simulate('click');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('input').instance().value = 'y';
      wrapper.find('input').simulate('change');
    });
    wrapper.update();

    await act(async () => {
      wrapper.find('#handleNext').simulate('click');
    });
    wrapper.update();
    await act(async () => {
      wrapper.find('#handleSubmit').simulate('click');
    });
    wrapper.update();

    expect(submitSpy).toHaveBeenCalledWith({ value1: 'y', value3: 'x-value3' });
  });
});
