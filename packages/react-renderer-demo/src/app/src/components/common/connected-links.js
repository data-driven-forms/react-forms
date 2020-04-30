import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Link from 'next/link';

import MenuContext from '../navigation/menu-context';
import { useRouter } from 'next/router';
import { getScopedLink, getPrefix } from '../../helpers/scoped-links';

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
  const { pathname } = useRouter();
  const activeScope = getPrefix(pathname);
  const classNames = useStyles();
  return (
    <Grid container justify="space-between" className={classNames.linksContainer}>
      <Grid item>
        {prev && prev.link && (
          <Link href={getScopedLink(`/${prev.link}`, activeScope)}>
            <a className={classNames.link} href={getScopedLink(`/${prev.link}`, activeScope)}>
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
          <Link href={getScopedLink(`/${next.link}`, activeScope)}>
            <a className={classNames.link} href={getScopedLink(`/${next.link}`, activeScope)}>
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
