import type { FieldMetaState } from 'react-final-form';

export interface ExtendedFieldMeta extends FieldMetaState<any>, Record<string, unknown> {
  warning?: any;
}

export const validationError = (meta: ExtendedFieldMeta, validateOnMount?: boolean): string | undefined => {
  if (validateOnMount) {
    return meta.error || meta.submitError;
  }

  return meta.touched && (meta.error || meta.submitError);
};

export default validationError;
