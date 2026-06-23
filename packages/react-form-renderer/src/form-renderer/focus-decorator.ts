import { FormApi, getIn } from 'final-form';

type FocusableInput = { name: string; focus: () => void };
type GetInputs = () => FocusableInput[];
type FindInput = (inputs: FocusableInput[], errors: Record<string, any>) => FocusableInput | undefined;

const isFocusableInput = (el: any): boolean => !!(el && typeof el.focus === 'function');

const defaultGetInputs: GetInputs = () => {
  if (typeof document === 'undefined') return [];
  return Array.prototype.slice
    .call(document.forms)
    .reduce((acc: FocusableInput[], form: HTMLFormElement) => {
      return acc.concat(Array.prototype.slice.call(form).filter(isFocusableInput));
    }, []);
};

const defaultFindInput: FindInput = (inputs, errors) =>
  inputs.find((input) => input.name && getIn(errors, input.name));

const createFocusDecorator = (getInputs?: GetInputs, findInputFn?: FindInput) => {
  return (form: FormApi) => {
    const focusOnFirstError = (errors: Record<string, any>) => {
      const inputs = (getInputs || defaultGetInputs)();
      const firstInput = (findInputFn || defaultFindInput)(inputs, errors);
      if (firstInput) firstInput.focus();
    };

    const originalSubmit = form.submit;
    let state: { errors?: Record<string, any>; submitErrors?: Record<string, any> } = {};

    const unsubscribe = form.subscribe(
      (nextState) => { state = nextState; },
      { errors: true, submitErrors: true }
    );

    const afterSubmit = () => {
      if (state.errors && Object.keys(state.errors).length) {
        focusOnFirstError(state.errors);
      } else if (state.submitErrors && Object.keys(state.submitErrors).length) {
        focusOnFirstError(state.submitErrors);
      }
    };

    form.submit = () => {
      const result = originalSubmit.call(form);
      if (result && typeof result.then === 'function') {
        result.then(afterSubmit, () => {});
      } else {
        afterSubmit();
      }
      return result;
    };

    return () => {
      unsubscribe();
      form.submit = originalSubmit;
    };
  };
};

export default createFocusDecorator;
