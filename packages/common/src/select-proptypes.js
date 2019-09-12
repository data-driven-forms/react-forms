import PropTypes from 'prop-types';

export const SelectPropTypes = {
  simpleValue: PropTypes.bool,
  loadOptions: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  invalid: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.any,
    ]),
  }),
  initialValue: PropTypes.any,
  placeholder: PropTypes.string,
  rest: PropTypes.any,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  loadingMessage: PropTypes.string,
  isMulti: PropTypes.bool,
};

export const SelectDefaultProps = {
  input: {
    value: [],
  },
  loadingMessage: 'Loading...',
  simpleValue: true,
};
