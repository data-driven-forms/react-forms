import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'next/link';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  toExampleLink: {
    textDecoration: 'none',
  },
});

const ExampleLink = ({ to, text = 'To example' }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div style={{ float: 'right' }}>
        <RouterLink href={`/provided-mappers/${to}?mapper=mui`}>
          <a className={classes.toExampleLink} href={`/provided-mappers/${to}?mapper=mui`}>
            <Button color="primary">{text}</Button>
          </a>
        </RouterLink>
      </div>
      <br />
    </React.Fragment>
  );
};

ExampleLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.node,
};

export default ExampleLink;
