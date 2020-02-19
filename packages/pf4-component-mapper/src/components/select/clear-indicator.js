import React from 'react';
import PropTypes from 'prop-types';

import { Button, ButtonVariant } from '@patternfly/react-core/dist/js/components/Button/Button';

import TimesCircleIcon from '@patternfly/react-icons/dist/js/icons/times-circle-icon';

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
