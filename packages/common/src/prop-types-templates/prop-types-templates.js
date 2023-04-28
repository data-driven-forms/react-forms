import PropTypes from 'prop-types';

export const optionsPropType = PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.node.isRequired, value: PropTypes.any }));

export const meta = PropTypes.shape({
  active: PropTypes.bool,
  dirty: PropTypes.bool,
  dirtySinceLastSubmit: PropTypes.bool,
  error: PropTypes.any,
  initial: PropTypes.any,
  invalid: PropTypes.bool,
  modified: PropTypes.bool,
  pristine: PropTypes.bool,
  submitError: PropTypes.any,
  submitFailed: PropTypes.bool,
  submitSucceeded: PropTypes.bool,
  submitting: PropTypes.bool,
  touched: PropTypes.bool,
  valid: PropTypes.bool,
  validating: PropTypes.bool,
  visited: PropTypes.bool,
});

export const formGroup = {
  isRequired: PropTypes.bool,
  label: PropTypes.node,
  helperText: PropTypes.node,
  meta,
  description: PropTypes.node,
};

export const input = PropTypes.shape({
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
});

export const childrenPropTypes = PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]);
