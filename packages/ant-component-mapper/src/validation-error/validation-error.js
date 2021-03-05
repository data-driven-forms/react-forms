export const validationError = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.error || meta.submitError;
  }

  return meta.touched && (meta.error || meta.submitError);
};
