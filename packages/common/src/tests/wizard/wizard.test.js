import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormRenderer, WizardContext, componentTypes, useFieldApi } from '@data-driven-forms/react-form-renderer';

import Wizard from '../../wizard';

describe('wizard test', () => {
  let state;

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
      <div onKeyDown={onKeyDown}>
        <button aria-label="handleNext" onClick={() => handleNext(selectNext(state.currentStep.nextStep, formOptions.getState))} />
        <button aria-label="handlePrev" onClick={handlePrev} />
        <button aria-label="setPrevSteps" onClick={setPrevSteps} />
        <button aria-label="jumpToStepValid" onClick={() => jumpToStep(0, true)} />
        <button aria-label="jumpToStepInvalid" onClick={() => jumpToStep(0, false)} />
        <button aria-label="handleSubmit" onClick={formOptions.handleSubmit} />
        <input aria-label="some input" />
        {formOptions.renderForm(state.currentStep?.fields || [])}
      </div>
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
    render(<FormRenderer {...rendererProps} />);

    expect(state).toEqual({
      activeStepIndex: 0,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step1', nextStep: 'step2', title: 'step1' },
      isDynamic: true,
      maxStepIndex: 0,
      navSchema,
      prevSteps: [],
    });

    await userEvent.click(screen.getByLabelText('handleNext'));

    expect(state).toEqual({
      activeStepIndex: 1,
      crossroads: undefined,
      currentStep: { fields: [], name: 'step2', nextStep: 'step3', substepOf: { name: 'eaa', title: 'title' } },
      isDynamic: true,
      maxStepIndex: 1,
      navSchema,
      prevSteps: ['step1'],
    });

    await userEvent.click(screen.getByLabelText('handlePrev'));

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
    render(<FormRenderer {...rendererProps} initialValues={{ field1: 'x', field2: 'step5' }} />);

    expect(state.navSchema).toEqual([
      { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
      { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
      { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
      { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
      { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
    ]);
  });

  it('onKeyDown - goes to the next step', async () => {
    render(<FormRenderer {...rendererProps} />);

    await userEvent.type(screen.getByLabelText('some input'), '{enter}');

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByLabelText('handleNext'));
    await userEvent.click(screen.getByLabelText('jumpToStepValid'));

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
    render(<FormRenderer {...rendererProps} />);

    await userEvent.click(screen.getByLabelText('handleNext'));
    await userEvent.click(screen.getByLabelText('jumpToStepInvalid'));

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
    render(
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

    expect(state.prevSteps).toEqual(['step1', 'step2', 'step3']);

    await userEvent.click(screen.getByLabelText('setPrevSteps'));

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
      // eslint-disable-next-line react/prop-types
      return <input {...input} aria-label={props.name} />;
    };

    const submitSpy = jest.fn();

    render(
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

    await userEvent.click(screen.getByLabelText('handleNext'));
    await userEvent.click(screen.getByLabelText('handleSubmit'));

    expect(submitSpy).toHaveBeenCalledWith({ value1: 'x', value2: 'x-value2' });
    submitSpy.mockClear();

    await userEvent.click(screen.getByLabelText('handlePrev'));
    await userEvent.clear(screen.getByLabelText('value1'));
    await userEvent.type(screen.getByLabelText('value1'), 'y');
    await userEvent.click(screen.getByLabelText('handleNext'));
    await userEvent.click(screen.getByLabelText('handleSubmit'));

    expect(submitSpy).toHaveBeenCalledWith({ value1: 'y', value3: 'x-value3' });
  });
});
