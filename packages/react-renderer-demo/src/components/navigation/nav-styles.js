const drawerWidth = 240;

export const navStyles = (theme) => ({
  root: {
    display: 'flex !important',
  },
  navHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    zIndex: 2,
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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
  },
  item: {
    padding: '8px 16px !important',
    justifyContent: 'flex-start !important',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
  },
  nested: {
    padding: '8px 16px 8px 32px !important',
  },
  listItem: {
    padding: '8px 16px 8px 16px !important',
    justifyContent: 'flex-start !important',
  },
  searchButton: {
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
  },
  listItemText: {
    '&>span': {
      fontSize: 14,
    },
  },
});
