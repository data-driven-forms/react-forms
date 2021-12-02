import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

import IconButton from '@mui/material/IconButton';

import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';

const PREFIX = 'ComponentMapperBar';

const classes = {
  root: `${PREFIX}-root`,
  npm: `${PREFIX}-npm`,
};

const Root = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: 'flex',
    flexDirection: 'row-reverse',
    marginTop: -48,
    [theme.breakpoints.down('sm')]: {
      marginTop: 'initial',
      flexDirection: 'row',
    },
  },

  [`& .${classes.npm}`]: {
    display: 'grid',
    '& img': {
      margin: 'auto',
    },
  },
}));

const ComponentMapperBar = ({ prefix, href }) => {
  return (
    <Root className={classes.root}>
      <a
        href={`https://badge.fury.io/js/%40data-driven-forms%2F${prefix}-component-mapper`}
        rel="noopener noreferrer"
        target="_blank"
        className={classes.npm}
      >
        <img src={`https://badge.fury.io/js/%40data-driven-forms%2F${prefix}-component-mapper.svg`} alt="current version" />
      </a>
      <IconButton aria-label="web" title="Library web" href={href} rel="noopener noreferrer" target="_blank" size="large">
        <LanguageIcon />
      </IconButton>
      <IconButton
        aria-label="github"
        title="Git Hub package"
        href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/${prefix}-component-mapper`}
        rel="noopener noreferrer"
        target="_blank"
        size="large"
      >
        <GitHubIcon />
      </IconButton>
    </Root>
  );
};

ComponentMapperBar.propTypes = {
  prefix: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default ComponentMapperBar;
