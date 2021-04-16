import React from 'react';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';
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

GenericMuiComponent.propTypes = {
  activeMapper: PropTypes.string,
  component: PropTypes.string
};

export default GenericMuiComponent;
