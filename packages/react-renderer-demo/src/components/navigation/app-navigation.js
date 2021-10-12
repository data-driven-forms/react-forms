/* eslint-disable react/prop-types */
import React from 'react';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import RouterLink from 'next/link';
import makeStyles from '@mui/styles/makeStyles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { navStyles } from './nav-styles';
import MenuRenderer from './menu-renderer';
import schema from './schemas/schema';

const useStyles = makeStyles(navStyles);

const Navigation = ({ closeNav, searchRef }) => {
  const classes = useStyles();
  return (
    <List
      component="nav"
      subheader={
        <ListSubheader className={classes.navHeader} component="div">
          <span style={{ flexGrow: 1 }}>
            <RouterLink href="/">
              <Link style={{ cursor: 'pointer' }}>Data driven forms</Link>
            </RouterLink>
          </span>
          <IconButton edge="end" onClick={closeNav} size="large">
            <ChevronLeftIcon />
          </IconButton>
        </ListSubheader>
      }
      className={classes.listRoot}
    >
      <MenuRenderer searchRef={searchRef} schema={schema} />
    </List>
  );
};

export default Navigation;
