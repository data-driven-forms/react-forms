import React from 'react';
import { HelpBlock } from 'patternfly-react';

const renderHelperText = (error, description) =>
  error ? ( // eslint-disable-line no-nested-ternary
    <HelpBlock>{error}</HelpBlock>
  ) : description ? (
    <HelpBlock>{description}</HelpBlock>
  ) : null;

export default renderHelperText;
