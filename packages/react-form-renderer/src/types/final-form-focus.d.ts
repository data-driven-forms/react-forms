declare module 'final-form-focus' {
  import { Config, Decorator } from 'final-form';

  export default function createFocusDecorator<FormValues = any>(
    getInputs?: () => HTMLElement[],
    findInput?: (inputs: HTMLElement[], errors: any) => HTMLElement
  ): Decorator<FormValues>;
}