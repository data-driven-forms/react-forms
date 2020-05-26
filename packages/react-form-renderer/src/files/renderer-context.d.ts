import { ReactNode } from 'react';
import { FormApi } from 'final-form';
import ComponentMapper from './component-mapper';
import ValidatorMapper from './validator-mapper';
import ActionMapper from './action-mapper';
import Field from './field';

export interface FormOptions extends FormApi {
  registerInputFile: (name: string) => void;
  unRegisterInputFile: (name: string) => void;
  onCancel: (values: object, ...args: any[]) => void;
  onReset: () => void;
  clearedValue: any;
  renderForm: (fields: Field[]) => ReactNode[];
}

export interface RendererContextValue {
  componentMapper: ComponentMapper;
  validatorMapper: ValidatorMapper;
  actionMapper: ActionMapper;
  formOptions: FormOptions;
}

interface RendererContext {
  value: object;
}

export default RendererContext;
