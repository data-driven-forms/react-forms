import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/styles/makeStyles';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import PropTypes from 'prop-types';

import MenuContext from '../menu-renderer/menu-context';

const useStyles = makeStyles(() => ({
  linksContainer: {
    paddingLeft: 32,
    paddingRight: 32,
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

const ConnectedLinks = ({ location: { pathname }}) => {
  const { prev, next } = useContext(MenuContext);
  const classNames = useStyles();
  return (
    <Grid container justify="space-between" className={ clsx(classNames.linksContainer, {
      [classNames.withSideNav]: pathname.includes('/renderer/'),
    }) }>
      <Grid item>
        { prev && (
          <Link className={ classNames.link } to={ prev.link }>
            <Button>
              <ChevronLeft />
              { prev.label }
            </Button>
          </Link>
        ) }
      </Grid>
      <Grid item>
        { next && (
          <Link className={ classNames.link } to={ next.link }>
            <Button>
              { next.label }
              <ChevronRight />
            </Button>
          </Link>
        ) }
      </Grid>
    </Grid>
  );
};

ConnectedLinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(ConnectedLinks);
