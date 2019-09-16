import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import Router from 'next/router';

import GhIcon from './common/gh-svg-icon';
import Navigation from './navigation/app-navigation';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  mainGradient: {
    backgroundImage: 'linear-gradient(135deg, #41108E 0%, rgba(165, 37, 193, 1) 44.76%, #FC9957 100%)',
    backgroundSize: '100vw 100vh',
    backgroundRepeat: 'no-repeat',
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainGradientShift: {
    width: `calc(100vw - ${drawerWidth}px)`,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  root: {
    display: 'flex',
  },
  appBar: {
    position: 'fixed',
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  menuIcons: {
    fill: theme.palette.common.white,
  },
  rightAppBar: {
    right: 0,
    width: '100%',
    backgroundImage: 'linear-gradient(135deg, #41108E 0%, rgba(165, 37, 193, 1) 44.76%, #FC9957 100%)',
    backgroundSize: '100vw 100vh',
    backgroundRepeat: 'no-repeat',
    zIndex: 900,
  },
  toolbarOverride: {
    zIndex: 1000,
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create([ 'margin', 'width' ], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const Layout = ({ children }) => {
  const classes = useStyles();
  const [ open, setOpen ] = useState(false);
  const searchRef = useRef(null);

  const handleDrawerOpen = () => {
    setOpen(true);
    // setTimeout(() => searchRef.current.focus(), 500);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const pathname = Router && Router.router && Router.router.pathname;
  return (
    <React.Fragment>
      <div className={ classes.root }>
        <Toolbar
          className={ clsx(classes.appBar, classes.toolbarOverride, {
            [classes.appBarShift]: open,
          }) }>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={ handleDrawerOpen }
            edge="start"
            className={ clsx(classes.menuButton, open && classes.hide) }
          >
            <MenuIcon className={ classes.menuIcons } />
          </IconButton>
        </Toolbar>
        <Drawer
          className={ classes.drawer }
          variant="persistent"
          anchor="left"
          open={ open }
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Navigation searchRef={ searchRef } closeNav={ handleDrawerClose }/>
          <Divider />
        </Drawer>

        <main
          className={ clsx(classes.content, {
            [classes.contentShift]: open,
            [classes.mainGradient]: pathname === '/',
            [classes.mainGradientShift]: pathname === '/' && open,
          }) }
        >
          <div className={ clsx(classes.drawerHeader, classes.appBar, classes.rightAppBar, {
            [classes.appBarShift]: open,
          }) }>
            <a href="https://github.com/data-driven-forms/react-forms" rel="noopener noreferrer" target="_blank">
              <IconButton
                color="inherit"
                aria-label="gh repository"
                edge="start"
                className={ clsx(classes.menuButton) }
              >
                <SvgIcon>
                  <GhIcon className={ classes.menuIcons } />
                </SvgIcon>
              </IconButton>
            </a>
          </div>
          { children }
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
