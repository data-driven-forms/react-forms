import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Link from 'next/link';

import MenuContext from '../navigation/menu-context';

const useStyles = makeStyles(() => ({
  linksContainer: {
    paddingLeft: 32,
    paddingRight: 32,
    marginTop: 64,
    marginBottom: 16
  },
  link: {
    textDecoration: 'none'
  }
}));

const ConnectedLinks = () => {
  const { prev, next } = useContext(MenuContext);
  const classNames = useStyles();
  return (
    <Grid container justify="space-between" className={classNames.linksContainer}>
      <Grid item>
        {prev && prev.link && (
          <Link href={`/${prev.link}`}>
            <a className={classNames.link} href={`/${prev.link}`}>
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
          <Link href={`/${next.link}`}>
            <a className={classNames.link} href={`/${next.link}`}>
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
