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

declare const selectNext: <T extends NextStep>(nextStep: T, getState: (() => AnyObject & {values: AnyObject})) => T extends (...args: any[]) => infer U ? U : string;
export default selectNext;
