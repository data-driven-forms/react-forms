import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'next/link';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

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
        <RouterLink href={ `/component-example/${to}` }>
          <a className={ classes.toExampleLink } href={ `/component-example/${to}` }>
            <Button color="primary" >{ text }</Button>
          </a>
        </RouterLink>
      </div>
      <br/>
    </React.Fragment>
  );};

ExampleLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.node,
};

export default ExampleLink;
