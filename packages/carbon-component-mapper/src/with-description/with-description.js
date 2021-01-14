import React from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from 'carbon-components-react';

const WithDescription = ({ labelText, description }) => <Tooltip triggerText={labelText}>{description}</Tooltip>;

WithDescription.propTypes = {
  labelText: PropTypes.node,
  description: PropTypes.node
};

export default WithDescription;
