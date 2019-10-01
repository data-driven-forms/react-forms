import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const PlainText = ({ label, name }) => label.split('\n').map((paragraph, index) =>
  <Typography key={ `${index}-${name}` } gutterBottom variant="body1">{ paragraph }</Typography>
);

PlainText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default PlainText;
