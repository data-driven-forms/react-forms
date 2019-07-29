import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const ExampleLink = ({ to, text = 'To example' }) => (
  <React.Fragment>
    <div style={{ float: 'right' }}>
      <Button><Link component={ NavLink } to={ `/component-example/${to}` }>{ text }</Link></Button>
    </div>
    <br/>
  </React.Fragment>
);

ExampleLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.node,
};

export default ExampleLink;
