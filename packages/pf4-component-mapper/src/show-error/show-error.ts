import { FieldMeta, ShowErrorResult, ValidationState } from '../types';

/**
 * Determines validation state based on field meta information
 */
const showError = (meta: FieldMeta, validateOnMount?: boolean): ShowErrorResult => {
  if ((meta.touched || validateOnMount) && meta.error) {
    return { validated: 'error' as ValidationState };
  }

  if ((meta.touched || validateOnMount) && meta.submitError) {
    return { validated: 'error' as ValidationState };
  }

  if ((meta.touched || validateOnMount) && meta.warning) {
    return { validated: 'warning' as ValidationState };
  }

  return { validated: 'default' as ValidationState };
};

export default showError;
