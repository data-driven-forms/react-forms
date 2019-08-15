import React from 'react';
import PropTypes from 'prop-types';
import { TimesCircleIcon } from '@patternfly/react-icons';
import { Button, ButtonVariant } from '@patternfly/react-core';

const ClearIndicator = ({
  clearValue,
  innerProps: { ref, ...restInnerProps },
}) =>(
  <Button { ...restInnerProps } onClick={ clearValue } variant={ ButtonVariant.plain }>
    <TimesCircleIcon />
  </Button>
);

ClearIndicator.propTypes = {
  innerProps: PropTypes.object.isRequired,
  clearValue: PropTypes.func,
};

ClearIndicator.defaultProps = {
  clearValue: () => undefined,
};

export default ClearIndicator;
