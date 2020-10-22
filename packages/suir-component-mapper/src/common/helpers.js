export const validationError = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.error;
  }

  return meta.touched && meta.error;
};

export const validationWarning = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.warning;
  }

  return meta.touched && meta.warning;
};
