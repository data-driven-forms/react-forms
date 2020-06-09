const showError = ({ error, touched }) => ({ validated: touched && error ? 'error' : 'default' });

export default showError;
