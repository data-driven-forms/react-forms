const showError = ({ error, touched, warning, submitError }) => {
  if (touched && error) {
    return { validated: 'error' };
  }

  if (touched && submitError) {
    return { validated: 'error' };
  }

  if (touched && warning) {
    return { validated: 'warning' };
  }

  return { validated: 'default' };
};

export default showError;
