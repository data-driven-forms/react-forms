import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import RouterLink from 'next/link';
import Button from '@mui/material/Button';

const PREFIX = 'ExampleLink';

const classes = {
  toExampleLink: `${PREFIX}-toExampleLink`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')({
  [`& .${classes.toExampleLink}`]: {
    textDecoration: 'none',
  },
});

const ExampleLink = ({ to, text = 'To example' }) => (
  <React.Fragment>
    <Root style={{ float: 'right' }}>
      <RouterLink legacyBehavior href={`/provided-mappers/${to}?mapper=mui`}>
        <a className={classes.toExampleLink} href={`/provided-mappers/${to}?mapper=mui`}>
          <Button color="primary">{text}</Button>
        </a>
      </RouterLink>
    </Root>
    <br />
  </React.Fragment>
);

ExampleLink.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.node,
};

export default ExampleLink;
