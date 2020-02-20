export const validationError = (meta, validateOnMount) => {
  if (validateOnMount) {
    return meta.error;
  }

  return meta.touched && meta.error;
};
