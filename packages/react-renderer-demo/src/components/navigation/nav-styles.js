const drawerWidth = 240;

export const navStyles = theme => ({
  root: {
    display: 'flex !important',
  },
  navHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    top: 'initial',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  listRoot: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    padding: '8px 16px !important',
    justifyContent: 'flex-start !important',
  },
  listItem: {
    padding: '8px 16px !important',
    justifyContent: 'flex-start !important',
  },
  searchButton: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
});
