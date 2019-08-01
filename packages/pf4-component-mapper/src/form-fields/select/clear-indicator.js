import React from 'react';
import PropTypes from 'prop-types';
import { TimesCircleIcon } from '@patternfly/react-icons';

const ClearIndicator = ({
  clearValue,
  innerProps: { ref, ...restInnerProps },
}) => <TimesCircleIcon { ...restInnerProps } onClick={ clearValue } />;

ClearIndicator.propTypes = {
  innerProps: PropTypes.object.isRequired,
  clearValue: PropTypes.func,
};

ClearIndicator.defaultProps = {
  clearValue: () => undefined,
};

export default ClearIndicator;
