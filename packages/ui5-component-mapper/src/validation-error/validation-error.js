import React from 'react';
import { Text } from '@ui5/webcomponents-react';

const prepareStateProps = (meta) => ({
  ...((meta.error || meta.submitError) && { valueState: 'Error', valueStateMessage: <Text>{meta.error || meta.submitError}</Text> }),
  ...(meta.warning && { valueState: 'Warning', valueStateMessage: <Text>{meta.warning}</Text> }),
});

const validationError = (meta, validateOnMount) => {
  if (validateOnMount || meta.touched) {
    return prepareStateProps(meta);
  }

  return {};
};

export default validationError;
