import React from 'react';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';

import ListOfContents from '../helpers/list-of-contents';
import ListOfContentsMobile from '../helpers/list-of-contents-select';

const PREFIX = 'DocPage';

const classes = {
  hidden: `${PREFIX}-hidden`,
  wrapper: `${PREFIX}-wrapper`,
  content: `${PREFIX}-content`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.hidden}`]: {
    height: '100%',
  },

  [`&.${classes.wrapper}`]: {
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },

  [`& .${classes.content}`]: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 768,
    },
  },
}));

const DocPage = ({ children }) => {
  const router = useRouter();
  const text = require(`!raw-loader!@docs/pages/${router.pathname.replace('/', '')}.md`).default;

  const regex = /^#+ .*/gm;
  const found = text.match(regex) || [];

  return (
    <StyledGrid container item className={classes.wrapper}>
      <Grid item xs={12} md={10} className={classes.content}>
        {children}
      </Grid>
      <Grid item xs={12} md={2}>
        <Hidden mdUp>
          <ListOfContentsMobile found={found} />
        </Hidden>
        <Hidden mdDown>
          <ListOfContents found={found} />
        </Hidden>
      </Grid>
    </StyledGrid>
  );
};

export default DocPage;
