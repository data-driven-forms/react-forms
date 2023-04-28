import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import Hidden from '@mui/material/Hidden';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SvgIcon from '@mui/material/SvgIcon';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { flatSchema } from './navigation/schemas/schema';
import GhIcon from './common/gh-svg-icon';
import Navigation from './navigation/app-navigation';
import MenuContext from './navigation/menu-context';
import findConnectedLinks from './navigation/find-connected-links';
import ConnectedLinks from './common/connected-links';
import Footer from './footer';

import dynamic from 'next/dynamic';
import NotificationPanel from './notification-panel';
const DocSearch = dynamic(import('./docsearch'), {
  ssr: false,
});

export const drawerWidth = 240;

const Root = styled('div')(({ theme }) => ({
  '& .mainGradient': {
    backgroundImage: 'linear-gradient(135deg, #41108E 0%, rgba(165, 37, 193, 1) 44.76%, #FC9957 100%)',
    backgroundSize: '100% 100vh',
    backgroundRepeat: 'no-repeat',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  '& .mainGradientShift': {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '&.root': {
    display: 'flex',
    minHeight: 'calc(100vh - 16px)',
  },
  '& .appBar': {
    position: 'fixed',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& .contentWrapper': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100%',
    paddingTop: 86,
  },
  '& .menuButton': {
    marginRight: theme.spacing(2),
  },
  '& .hide': {
    display: 'none',
  },
  '& .drawer': {
    width: drawerWidth,
    flexShrink: 0,
  },
  '& .drawerPaper': {
    width: drawerWidth,
  },
  '& .drawerHeader': {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  '& .content': {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -drawerWidth,
    },
  },
  '& .contentShift': {
    [theme.breakpoints.up('md')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  },
  '& .menuIcons': {
    fill: theme.palette.common.white,
  },
  '& .rightAppBar': {
    right: 0,
    width: '100%',
    backgroundImage: 'linear-gradient(135deg, #41108E 0%, rgba(165, 37, 193, 1) 44.76%, #FC9957 100%)',
    backgroundSize: '100% 100vh',
    backgroundRepeat: 'no-repeat',
    zIndex: 900,
    paddingLeft: 48,
  },
  '& .toolbarOverride': {
    zIndex: 1000,
  },
  '& .appBarShift': {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  },
}));

const Layout = ({ children }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [links, setLinks] = useState({});
  const searchRef = useRef(null);
  const anchorRef = useRef(null);
  const [openNotification, setOpenNotifiation] = useState(false);
  const [newMessages, setNewMessages] = useState(0);

  useEffect(() => {
    setLinks(findConnectedLinks(router.asPath, flatSchema) || {});
  }, [router.asPath]);

  useEffect(() => {
    if (window && window.innerWidth > 960 && router.pathname !== '/') {
      setOpen(true);
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
    if (searchRef && searchRef.current) {
      setTimeout(() => searchRef.current.focus(), 500);
    }
  };

  function handleDrawerClose() {
    setOpen(false);
  }

  const handleToggle = () => {
    setNewMessages(0);
    setOpenNotifiation(!openNotification);
  };

  return (
    <MenuContext.Provider value={links}>
      <Root className="root">
        <Toolbar
          className={clsx('appBar', {
            toolbarOverride: !open,
            appBarShift: open,
          })}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx('menuButton', open && 'hide')}
            size="large"
          >
            <MenuIcon className="menuIcons" />
          </IconButton>
        </Toolbar>
        <Hidden mdDown implementation="css">
          <Drawer
            className="drawer"
            variant="persistent"
            anchor="left"
            open={open && window && window.innerWidth > 960}
            classes={{
              paper: 'drawerPaper',
            }}
          >
            <Navigation searchRef={searchRef} closeNav={handleDrawerClose} />
            <Divider />
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation="css">
          <Drawer
            className="drawer"
            variant="temporary"
            anchor="left"
            open={open && window && window.innerWidth < 960}
            classes={{
              paper: 'drawerPaper',
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <Navigation closeNav={handleDrawerClose} />
            <Divider />
          </Drawer>
        </Hidden>
        <div
          className={clsx('drawerHeader', 'appBar', 'rightAppBar', {
            appBarShift: open,
          })}
        >
          <DocSearch />
          <IconButton aria-label="show new notifications" onClick={handleToggle} color="inherit" ref={anchorRef} className="menuButton" size="large">
            <Badge badgeContent={newMessages} color="secondary">
              <NotificationsIcon className="menuIcons" />
            </Badge>
          </IconButton>
          <NotificationPanel
            setNewMessages={setNewMessages}
            isOpen={openNotification}
            anchorRef={anchorRef}
            onClose={() => setOpenNotifiation(false)}
          />
          <a href="https://github.com/data-driven-forms/react-forms" rel="noopener noreferrer" target="_blank">
            <IconButton color="inherit" aria-label="gh repository" edge="start" className="menuButton" size="large">
              <SvgIcon>
                <GhIcon className="menuIcons" />
              </SvgIcon>
            </IconButton>
          </a>
        </div>
        <main
          className={clsx('content', {
            contentShift: open,
            mainGradient: router.pathname === '/',
            mainGradientShift: router.pathname === '/' && open,
          })}
        >
          <div className="contentWrapper">
            <div
              className="DocSearch-content"
              style={{
                paddingRight: 32,
                paddingLeft: 32,
              }}
            >
              {children}
            </div>
            <div>
              <ConnectedLinks />
              <Footer />
            </div>
          </div>
        </main>
      </Root>
    </MenuContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};

export default Layout;
