export interface ExtendedFieldMeta extends Record<string, unknown> {
  error?: string;
  submitError?: string;
  touched?: boolean;
  warning?: any;
}

export const validationError = (meta: ExtendedFieldMeta, validateOnMount?: boolean): string | false | undefined => {
  if (validateOnMount) {
    return meta.error || meta.submitError;
  }

  return meta.touched ? meta.error || meta.submitError : false;
};

export default validationError;
