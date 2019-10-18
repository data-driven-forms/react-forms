import React, { useContext } from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MenuContext from '../navigation/menu-context';

const useStyles = makeStyles(() => ({
  linksContainer: {
    paddingLeft: 32,
    paddingRight: 64,
    marginTop: 16,
    marginBottom: 16,
  },
  withSideNav: {
    width: 'calc(100% - 240px)',
  },
  link: {
    textDecoration: 'none',
  },
}));

const ConnectedLinks = () => {
  const { prev, next } = useContext(MenuContext);
  const { pathname } = useRouter();
  const classNames = useStyles();
  return (
    <Grid container justify="space-between" className={ clsx(classNames.linksContainer, {
      [classNames.withSideNav]: pathname.includes('/renderer/') && !(pathname === '/renderer/installation' || pathname === '/renderer/get-started'),
    }) }>
      <Grid item>
        { prev && prev.link && (
          <Link href={ `/${prev.link.replace(/component-example\//, 'component-example?')}` }>
            <a className={ classNames.link }>
              <Button>
                <ChevronLeft />
                { prev.label }
              </Button>
            </a>
          </Link>
        ) }
      </Grid>
      <Grid item>
        { next && next.link && (
          <Link href={ `/${next.link.replace(/component-example\//, 'component-example?')}` }>
            <a className={ classNames.link }>
              <Button >
                { next.label }
                <ChevronRight />
              </Button>
            </a>
          </Link>
        ) }
      </Grid>
    </Grid>
  );
};

export default ConnectedLinks;
