import React from 'react';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Link as RouterLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { navStyles } from './nav-styles';
import Menu from './menu-renderer/menu-renderer';
import schema from './menu-renderer/schema-demo';

const useStyles = makeStyles(navStyles);

const Navigation = ({ closeNav, searchRef }) => {
  const classes = useStyles();

  return (
    <List
      component="nav"
      subheader={ (
        <ListSubheader className={ classes.navHeader } component="div">
          <span style={{ flexGrow: 1 }}>
            <Link component={ RouterLink } to="/">
              Data driven forms
            </Link>
          </span>
          <IconButton edge="end" onClick={ closeNav }>
            <ChevronLeftIcon />
          </IconButton>
        </ListSubheader>) }
      className={ classes.listRoot }
    >
      <Menu searchRef={ searchRef } schema={ schema } />
    </List>
  );
};

export default Navigation;
