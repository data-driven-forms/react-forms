import React from 'react';

import { Tooltip } from 'carbon-components-react';

const WithDescription = ({ labelText, description }) => <Tooltip triggerText={labelText}>{description}</Tooltip>;

export default WithDescription;
