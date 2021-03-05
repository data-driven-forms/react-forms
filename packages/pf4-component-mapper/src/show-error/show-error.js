const showError = ({ error, touched, warning, submitError }, validateOnMount) => {
  if ((touched || validateOnMount) && error) {
    return { validated: 'error' };
  }

  if ((touched || validateOnMount) && submitError) {
    return { validated: 'error' };
  }

  if ((touched || validateOnMount) && warning) {
    return { validated: 'warning' };
  }

  return { validated: 'default' };
};

export default showError;
