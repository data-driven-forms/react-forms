import React from 'react';
import Typography from '@mui/material/Typography';

import originalComponentLink from './original-component-link';

const GenericMuiComponent = ({ activeMapper = 'mui', component }) => (
  <Typography variant="body1" gutterBottom>
    This component also accepts all other original props, please see{' '}
    <a target="__blank" rel="noreferrer noopener" href={originalComponentLink(activeMapper, component)}>
      here
    </a>
    !
  </Typography>
);

export default GenericMuiComponent;
