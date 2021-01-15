export const validationError = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.error || meta.submitError;
  }

  return meta.touched && (meta.error || meta.submitError);
};

export const validationWarning = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.warning;
  }

  return meta.touched && meta.warning;
};
