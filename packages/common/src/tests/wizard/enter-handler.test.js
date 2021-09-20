import enterHandler from '../../wizard/enter-handler';

describe('enterHandler', () => {
  let e;
  let formOptions;
  let activeStep;
  let findCurrentStep;
  let handleNext;
  let handleSubmit;

  const getRegisteredFields = () => [];

  beforeEach(() => {
    e = { key: 'Enter', target: { type: 'input' }, preventDefault: jest.fn() };
    formOptions = { valid: true, getState: () => ({ validating: false }), getRegisteredFields };
    activeStep = 'activeStep';
    findCurrentStep = jest.fn().mockImplementation(() => ({
      nextStep: 'nextStep',
    }));
    handleNext = jest.fn();
    handleSubmit = jest.fn();
  });

  it('pressed not enter', () => {
    e = { ...e, key: 'A' };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter on button', () => {
    e = { ...e, target: { type: 'button' } };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter with ctrl', () => {
    e = { ...e, ctrlKey: true };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter with shift', () => {
    e = { ...e, shiftKey: true };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter and submit', () => {
    findCurrentStep = jest.fn().mockImplementation(() => ({
      nextStep: undefined,
    }));

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter and go to next step', () => {
    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).toHaveBeenCalledWith('nextStep', getRegisteredFields);
  });

  it('pressed enter when not valid', () => {
    formOptions = { ...formOptions, valid: false };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter when validating', () => {
    formOptions = { ...formOptions, getState: () => ({ validating: true }) };

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });

  it('pressed enter with custom buttons', () => {
    findCurrentStep = jest.fn().mockImplementation(() => ({
      nextStep: undefined,
      buttons: 'something',
    }));

    enterHandler(e, formOptions, activeStep, findCurrentStep, handleNext, handleSubmit);

    expect(handleSubmit).not.toHaveBeenCalled();
    expect(handleNext).not.toHaveBeenCalled();
  });
});
