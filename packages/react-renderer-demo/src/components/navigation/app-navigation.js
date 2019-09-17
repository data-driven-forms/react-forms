import React from 'react';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import RouterLink from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { navStyles } from './nav-styles';
import MenuRenderer from './menu-renderer';
import schema from './schema';

const useStyles = makeStyles(navStyles);

const Navigation = ({ closeNav, searchRef }) => {
  const classes = useStyles();
  return (
    <List
      component="nav"
      subheader={ (
        <ListSubheader className={ classes.navHeader } component="div">
          <span style={{ flexGrow: 1 }}>
            <RouterLink href="/">
              <Link style={{ cursor: 'pointer' }}>
                Data driven forms
              </Link>
            </RouterLink>
          </span>
          <IconButton edge="end" onClick={ closeNav }>
            <ChevronLeftIcon />
          </IconButton>
        </ListSubheader>) }
      className={ classes.listRoot }
    >
      <MenuRenderer searchRef={ searchRef } schema={ schema } />
    </List>
  );
};

export default Navigation;
