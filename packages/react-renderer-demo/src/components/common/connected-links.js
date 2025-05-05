'use client';

import React, { useContext } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import DocLink from './doc-link';

import MenuContext from '../navigation/menu-context';
import useMapperLink from '../../hooks/use-mapper-link';
import { grey } from '@mui/material/colors';

const PREFIX = 'ConnectedLinks';

const classes = {
  linksContainer: `${PREFIX}-linksContainer`,
  link: `${PREFIX}-link`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.linksContainer}`]: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 64,
    marginBottom: 16,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 'calc((100% - (768px + 17%)) / 2)',
      paddingRight: 'calc((100% - (768px + 17%)) / 2)',
    },
  },

  [`& .${classes.link}`]: {
    textDecoration: 'none',
    '& button': {
      color: `${grey[900]} !important`,
    },
  },
}));

const ConnectedLinks = () => {
  const { prev, next } = useContext(MenuContext);

  const prevLink = `/${useMapperLink(prev && prev.link)}`;
  const nextLink = `/${useMapperLink(next && next.link)}`;
  return (
    <StyledGrid container justifyContent="space-between" className={classes.linksContainer}>
      <Grid item>
        {prev && prev.link && (
          <DocLink className={classes.link} href={prevLink}>
            <Button>
              <ChevronLeft />
              {prev.label}
            </Button>
          </DocLink>
        )}
      </Grid>
      <Grid item>
        {next && next.link && (
          <DocLink className={classes.link} href={nextLink}>
            <Button>
              {next.label}
              <ChevronRight />
            </Button>
          </DocLink>
        )}
      </Grid>
    </StyledGrid>
  );
};

export default ConnectedLinks;
