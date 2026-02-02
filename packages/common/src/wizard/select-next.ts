import get from 'lodash/get';
import { AnyObject } from "@data-driven-forms/react-form-renderer";

export type NextStepContext = {
  values: AnyObject;
}

export type NextStep = string | ((context: NextStepContext) => string) | ((context: NextStepContext) => Promise<string>) | AnyObject & {
  stepMapper: {
    [key: string]: string;
    [key: number]: string;
  };
  when: string[] | string
}

const selectNext = <T extends NextStep>(nextStep: T, getState: () => AnyObject & {values: AnyObject}): T extends (...args: any[]) => infer U ? U : string => {
  if (typeof nextStep === 'string') {
    return nextStep as T extends (...args: any[]) => infer U ? U : string;
  }

  if (typeof nextStep === 'function') {
    return nextStep({ values: getState().values }) as T extends (...args: any[]) => infer U ? U : string;
  }

  const selectedValue = get(getState().values, nextStep.when);

  return nextStep.stepMapper[selectedValue] as T extends (...args: any[]) => infer U ? U : string;
};

export default selectNext;
