import reducer from '../../wizard/reducer';

describe('wizard reducer', () => {
  let fields;
  const getState = () => ({
    values: {
      field1: 'x',
      field2: 'step5',
    },
  });

  beforeEach(() => {
    fields = [
      {
        name: 'step1',
        nextStep: 'step2',
        title: 'step1',
      },
      {
        name: 'step2',
        substepOf: { title: 'title', name: 'eaa' },
        nextStep: 'step3',
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
      },
      { name: 'step4', nextStep: ({ values }) => values.field2 },
      { name: 'step5' },
    ];
  });

  describe('finishLoading', () => {
    it('creates schema', () => {
      const formOptions = { getState };

      expect(reducer({}, { type: 'finishLoading', payload: { fields, formOptions } })).toEqual({
        loading: false,
        navSchema: [
          { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
          { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
          { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
        ],
      });
    });
  });

  describe('handleNext', () => {
    it('calls next when dynamic', () => {
      const state = {
        activeStepIndex: 1,
        activeStep: 'step2',
        prevSteps: ['step1'],
        registeredFields: { step1: ['field1'] },
        maxStepIndex: 1,
        isDynamic: true,
        navSchema: [{ index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' }],
      };
      const nextStep = 'step3';
      const formOptions = { getState, getRegisteredFields: () => ['field3'] };

      expect(reducer(state, { type: 'handleNext', payload: { nextStep, formOptions, fields } })).toEqual({
        activeStep: 'step3',
        activeStepIndex: 2,
        isDynamic: true,
        maxStepIndex: 2,
        navSchema: [
          { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
          { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
          { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
        ],
        prevSteps: ['step1', 'step2'],
        registeredFields: { step1: ['field1'] },
        registeredFieldsHistory: { step2: ['field3'] },
      });
    });

    it('calls next when static', () => {
      const state = {
        activeStepIndex: 1,
        activeStep: 'step2',
        prevSteps: ['step1'],
        registeredFields: { step1: ['field1'] },
        maxStepIndex: 1,
        isDynamic: false,
        navSchema: [{ index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' }],
      };
      const nextStep = 'step3';
      const formOptions = { getState, getRegisteredFields: () => ['field3'] };

      expect(reducer(state, { type: 'handleNext', payload: { nextStep, formOptions, fields } })).toEqual({
        activeStep: 'step3',
        activeStepIndex: 2,
        isDynamic: false,
        maxStepIndex: 2,
        navSchema: [{ index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' }],
        prevSteps: ['step1', 'step2'],
        registeredFields: { step1: ['field1'] },
        registeredFieldsHistory: { step2: ['field3'] },
      });
    });

    it('calls next when going back from visited', () => {
      const state = {
        activeStepIndex: 0,
        activeStep: 'step1',
        prevSteps: ['step1', 'step2'],
        registeredFields: { step1: ['field1'] },
        maxStepIndex: 1,
        isDynamic: true,
        navSchema: [{ index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' }],
      };
      const nextStep = 'step2';
      const formOptions = { getState, getRegisteredFields: () => ['field3'] };

      expect(reducer(state, { type: 'handleNext', payload: { nextStep, formOptions, fields } })).toEqual({
        activeStep: 'step2',
        activeStepIndex: 1,
        isDynamic: true,
        maxStepIndex: 1,
        navSchema: [
          { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
          { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
          { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
        ],
        prevSteps: ['step1', 'step2'],
        registeredFields: { step1: ['field1'] },
        registeredFieldsHistory: { step1: ['field3'] },
      });
    });
  });

  describe('jumpToStep', () => {
    let index;
    let valid;
    let crossroads;
    let formOptions;

    beforeEach(() => {
      index = 1;
      valid = true;
      crossroads = [];
      formOptions = { getState };
    });

    it('click on the same step', () => {
      expect(reducer({ activeStepIndex: 1 }, { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } })).toEqual({
        activeStepIndex: 1,
      });
    });

    it('click on the step that is not visited yet', () => {
      index = 5;

      expect(
        reducer(
          { activeStepIndex: 2, isDynamic: false, prevSteps: ['step1', 'step2'], activeStep: 'step3' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({ activeStepIndex: 2, isDynamic: false, prevSteps: ['step1', 'step2'], activeStep: 'step3' });
    });

    it('previous step', () => {
      expect(
        reducer(
          { activeStepIndex: 2, isDynamic: false, prevSteps: ['step1', 'step2'], activeStep: 'step3' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({ activeStep: 'step2', activeStepIndex: 1, isDynamic: false, prevSteps: ['step1', 'step2', 'step3'] });
    });

    it('previous step included in prevSteps', () => {
      expect(
        reducer(
          { activeStepIndex: 2, isDynamic: false, prevSteps: ['step1', 'step2', 'step3'], activeStep: 'step3' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({ activeStep: 'step2', activeStepIndex: 1, isDynamic: false, prevSteps: ['step1', 'step2', 'step3'] });
    });

    it('dynamic step', () => {
      crossroads = undefined;
      index = 2;
      expect(
        reducer(
          { activeStepIndex: 4, maxStepIndex: 4, isDynamic: true, prevSteps: ['step1', 'step2', 'step3'], activeStep: 'step4' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({
        activeStep: 'step3',
        activeStepIndex: 2,
        isDynamic: true,
        maxStepIndex: 2,
        navSchema: [
          { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
          { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
          { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
        ],
        prevSteps: ['step1', 'step2'],
      });
    });

    it('disable forward jumping', () => {
      index = 2;
      fields[index].disableForwardJumping = true;

      expect(
        reducer(
          { activeStepIndex: 4, maxStepIndex: 4, isDynamic: false, prevSteps: ['step1', 'step2', 'step3'], activeStep: 'step4' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({ activeStep: 'step3', activeStepIndex: 2, isDynamic: false, maxStepIndex: 2, prevSteps: ['step1', 'step2'] });
    });

    it('invalid step', () => {
      valid = false;
      expect(
        reducer(
          { activeStepIndex: 2, isDynamic: false, prevSteps: ['step1', 'step2'], activeStep: 'step3' },
          { type: 'jumpToStep', payload: { index, valid, fields, crossroads, formOptions } }
        )
      ).toEqual({ activeStep: 'step2', activeStepIndex: 1, isDynamic: false, maxStepIndex: 2, prevSteps: ['step1', 'step2', 'step3'] });
    });
  });

  describe('setPrevSteps', () => {
    it('regenerate navSchema', () => {
      const formOptions = { getState };

      expect(
        reducer(
          { maxStepIndex: 2, activeStepIndex: 1, prevSteps: ['step1', 'step2', 'step3'] },
          { type: 'setPrevSteps', payload: { formOptions, fields } }
        )
      ).toEqual({
        activeStepIndex: 1,
        maxStepIndex: 1,
        navSchema: [
          { index: 0, name: 'step1', primary: true, substepOf: undefined, substepOfTitle: undefined, title: 'step1' },
          { index: 1, name: 'step2', primary: true, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 2, name: 'step3', primary: false, substepOf: 'eaa', substepOfTitle: 'title', title: undefined },
          { index: 3, name: 'step4', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
          { index: 4, name: 'step5', primary: true, substepOf: undefined, substepOfTitle: undefined, title: undefined },
        ],
        prevSteps: ['step1'],
      });
    });
  });

  describe('default', () => {
    it('does nothing', () => {
      expect(reducer({ state: '123' }, { type: 'nonsense' })).toEqual({ state: '123' });
    });
  });
});
