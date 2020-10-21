const showError = ({ error, touched, warning }) => {
  if (touched && error) {
    return { validated: 'error' };
  }

  if (touched && warning) {
    return { validated: 'warning' };
  }

  return { validated: 'default' };
};

export default showError;
