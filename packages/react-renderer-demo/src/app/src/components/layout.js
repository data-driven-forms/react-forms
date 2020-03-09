import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SvgIcon from '@material-ui/core/SvgIcon';
import { useRouter } from 'next/router';
import { componentTypes } from '@data-driven-forms/react-form-renderer';

import { flatSchema } from './navigation/schema';
import GhIcon from './common/gh-svg-icon';
import Navigation from './navigation/app-navigation';
import MapperContext from './mappers-context';
import MuiWizzard from '../components/missing-demo-fields/mui-wizard/mui-wizard';
import MenuContext from './navigation/menu-context';
import findConnectedLinks from './navigation/find-connected-links';
import ConnectedLinks from './common/connected-links';
import Footer from './footer';

import dynamic from 'next/dynamic';
const DocSearch = dynamic(import('./docsearch'), {
  ssr: false,
});

export const drawerWidth = 240;

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
  contentWrapper: {
    paddingTop: 86,
    paddingBottom: 32,
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
  const router = useRouter();
  const classes = useStyles();
  const [ open, setOpen ] = useState(router.pathname !== '/');
  const [ mappers, setMappers ] = useState({ loaded: false, mappers: {}});
  const [ links, setLinks ] = useState({});
  const searchRef = useRef(null);

  useEffect(() => {
    const promises = [
      import('@data-driven-forms/pf3-component-mapper'),
      import('@data-driven-forms/pf4-component-mapper'),
      import('@data-driven-forms/mui-component-mapper'),
    ];

    Promise.all(promises).then(([ pf3, pf4, mui ]) => setMappers({ loaded: true, mappers: { pf3: {
      ...pf3,
      formFieldsMapper: {
        ...pf3.formFieldsMapper,
        summary: () => <div>Pf3 summary</div>,
        'dual-list-select': () => <div>Not implemented yet</div>,
      },
    }, pf4: {
      ...pf4,
      formFieldsMapper: { ...pf4.formFieldsMapper, summary: () => <div>Pf4 summary</div> },
    }, mui: {
      ...mui,
      formFieldsMapper: { ...mui.formFieldsMapper,
        [componentTypes.WIZARD]: MuiWizzard,
        summary: () => <div>Mui summary</div>,
        'dual-list-select': () => <div>Not implemented yet</div>,
      },
    }}}));
  }, []);

  useEffect(() => {
    setLinks(findConnectedLinks(router.asPath, flatSchema) || {});
  }, [ router.asPath ]);

  const handleDrawerOpen = () => {
    setOpen(true);
    setTimeout(() => searchRef.current.focus(), 500);
  };

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <MapperContext.Provider value={ mappers }>
      <MenuContext.Provider value={ links }>
        <div className={ classes.root }>
          <Toolbar
            className={ clsx(classes.appBar, {
              [classes.toolbarOverride]: !open,
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
          <div className={ clsx(classes.drawerHeader, classes.appBar, classes.rightAppBar, {
            [classes.appBarShift]: open,
          }) }>
            <DocSearch />
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

          <main
            className={ clsx(classes.content, {
              [classes.contentShift]: open,
              [classes.mainGradient]: router.pathname === '/',
              [classes.mainGradientShift]: router.pathname === '/' && open,
            }) }
          >
            <div className={ classes.contentWrapper }>
              <div
                className="DocSearch-content"
                style={{
                  paddingRight: 32,
                  paddingLeft: 32,

                }}>
                { children }
              </div>
              <ConnectedLinks />
              <Footer />
            </div>
          </main>
        </div>
      </MenuContext.Provider>

    </MapperContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]),
};

export default Layout;
