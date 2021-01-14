import AnyObject from '../types/any-object';

const justFocusable = (el: any) => el?.focus;

const focusError = (errors: AnyObject, name?: string): void => {
  if (document) {
    const formInputs = name && document.forms[name as any]?.elements;

    const allInputs = formInputs
      ? Array.from(formInputs).filter(justFocusable)
      : Array.from(document.forms)
          .reduce((acc: any, curr: any) => [...acc, ...curr.elements], [])
          .filter(justFocusable);

    const errorKeys = Object.keys(errors);

    const firstError = allInputs.find((inp) => errorKeys.includes(inp.name) && errors[inp.name]);

    firstError && firstError.focus();
  }
};

export default focusError;
