import React from 'react';
import PropTypes from 'prop-types';
import RouterLink from 'next/link';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

const ExampleLink = ({ to, text = 'To example' }) => (
  <React.Fragment>
    <div style={{ float: 'right' }}>
      <RouterLink href={ `/component-example/${to}` }>
        <Button><Link>{ text }</Link></Button>
      </RouterLink>
    </div>
    <br/>
  </React.Fragment>
);

ExampleLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.node,
};

export default ExampleLink;
