import React from 'react';
import { Label, Text } from '@ui5/webcomponents-react';

const convertProps = ({ isRequired, isDisabled, helperText, description, ...rest }) => ({
  required: isRequired,
  disabled: isDisabled,
  ...rest,
  ...(isRequired && { label: <Label required>{rest.label}</Label> }),
  ...((helperText || description) && {
    valueState: 'Information',
    valueStateMessage: <Text>{helperText || description}</Text>,
  }),
});

export default convertProps;
