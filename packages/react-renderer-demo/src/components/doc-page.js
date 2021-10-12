import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';

import makeStyles from '@mui/styles/makeStyles';

import ListOfContents from '../helpers/list-of-contents';
import ListOfContentsMobile from '../helpers/list-of-contents-select';

const useStyles = makeStyles((theme) => ({
  hidden: {
    height: '100%',
  },
  wrapper: {
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  content: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 768,
    },
  },
}));

const DocPage = ({ children }) => {
  const router = useRouter();
  const classes = useStyles();

  const text = require(`!raw-loader!@docs/pages/${router.pathname.replace('/', '')}.md`).default;

  const regex = /^#+ .*/gm;
  const found = text.match(regex) || [];

  return (
    <Grid container item className={classes.wrapper}>
      <Grid item xs={12} md={10} className={classes.content}>
        {children}
      </Grid>
      <Grid item xs={12} md={2}>
        <Hidden mdUp>
          <ListOfContentsMobile found={found} />
        </Hidden>
        <Hidden mdDown className={classes.hidden}>
          <ListOfContents found={found} />
        </Hidden>
      </Grid>
    </Grid>
  );
};

DocPage.propTypes = {
  children: PropTypes.node,
};

export default DocPage;
