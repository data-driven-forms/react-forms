import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';

import MenuContext from '../navigation/menu-context';
import useMapperLink from '../../hooks/use-mapper-link';

const useStyles = makeStyles((theme) => ({
  linksContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 64,
    marginBottom: 16,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 'calc((100% - (768px + 17%)) / 2)',
      paddingRight: 'calc((100% - (768px + 17%)) / 2)',
    },
  },
  link: {
    textDecoration: 'none',
  },
}));

const ConnectedLinks = () => {
  const { prev, next } = useContext(MenuContext);
  const classNames = useStyles();
  const prevLink = `/${useMapperLink(prev && prev.link)}`;
  const nextLink = `/${useMapperLink(next && next.link)}`;
  return (
    <Grid container justifyContent="space-between" className={classNames.linksContainer}>
      <Grid item>
        {prev && prev.link && (
          <Link href={prevLink}>
            <a className={classNames.link} href={prevLink}>
              <Button>
                <ChevronLeft />
                {prev.label}
              </Button>
            </a>
          </Link>
        )}
      </Grid>
      <Grid item>
        {next && next.link && (
          <Link href={nextLink}>
            <a className={classNames.link} href={nextLink}>
              <Button>
                {next.label}
                <ChevronRight />
              </Button>
            </a>
          </Link>
        )}
      </Grid>
    </Grid>
  );
};

export default ConnectedLinks;
