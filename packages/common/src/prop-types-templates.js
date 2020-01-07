import PropTypes from 'prop-types';

export const optionsPropType = PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string.isRequired, value: PropTypes.any }));
