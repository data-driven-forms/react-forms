import { AnyObject } from "@data-driven-forms/react-form-renderer";

export type NextStep = string | ((values: AnyObject) => string) | AnyObject & {
  stepMapper: {
    [key: string]: string;
    [key: number]: string;
  };
  when: string[] | string
}

declare const selectNext: (nextStep: NextStep, getState: (() => AnyObject & {values: AnyObject})) => string;
export default selectNext;
