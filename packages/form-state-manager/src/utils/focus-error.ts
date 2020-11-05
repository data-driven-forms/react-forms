import AnyObject from '../types/any-object';

const focusError = (errors: AnyObject) => {
  if (document) {
    const allInputs = Array.from(document.forms)
      .reduce((acc: any, curr: any) => [...acc, ...curr.elements], [])
      .filter((el: HTMLElement) => el.focus);

    const errorKeys = Object.keys(errors);

    const firstError = allInputs.find((inp) => errorKeys.includes(inp.name));

    firstError && firstError.focus();
  }
};

export default focusError;
