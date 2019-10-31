import React from 'react';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Typography from '@material-ui/core/Typography';

import GhIcon from './common/gh-svg-icon';
import NpmSvgIcon from './common/npm-svg-icon';

const RepoLink = ({ href, label }) => {
  const classes = makeStyles(theme => ({
    listLink: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  }));
  return (
    <ListItem>
      <ListItemText
        primary={ (
          <Link
            href={ href }
            target="_blank"
            rel="noopener noreferrer"
            className={ classes.listLink }
            color="inherit"
          >
            { label }
          </Link>
        ) }
      />
    </ListItem>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: 64,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  footerShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  foooterCard: {
    backgroundColor: 'transparent',
    margin: 16,
    padding: 24,
    borderRadius: 2,
    display: 'flex',
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[800],
    fontSize: 16,
  },
}));

const Footer = ({ open }) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <footer className={ clsx(classes.footer, {
        [classes.footerShift]: open,
      }) }>
        <Grid container justify="space-between">
          <Grid xs={ 12 } md={ 4 } item>
            <Paper elevation={ 0 } className={ classes.foooterCard }>
              <div>
                <Typography variant="h5">Contribution</Typography>
                <Typography>
                      Please report any bugs, mistakes, suggestions and don't forget to contribute to the data-driven-forms/react-forms repository.
                </Typography>
              </div>
            </Paper>
          </Grid>
          <Grid xs={ 12 } md={ 4 } item>
            <Paper elevation={ 0 } className={ classes.foooterCard }>
              <List
                subheader={ <ListSubheader className={ classes.listHeader }>Links to &nbsp; <SvgIcon><GhIcon /></SvgIcon></ListSubheader> }
              >
                <RepoLink
                  href="https://github.com/data-driven-forms/react-forms"
                  label="React forms"
                />
              </List>
              <List
                subheader={ <ListSubheader className={ classes.listHeader }>Links to &nbsp; <SvgIcon><NpmSvgIcon /></SvgIcon></ListSubheader> }
              >
                <RepoLink
                  href="https://www.npmjs.com/package/@data-driven-forms/react-form-renderer"
                  label="React form renderer"
                />
                <RepoLink
                  href="https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper"
                  label="PF4 component mapper"
                />
                <RepoLink
                  href="https://www.npmjs.com/package/@data-driven-forms/pf3-component-mapper"
                  label="PF3 component mapper"
                />
                <RepoLink
                  href="https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper"
                  label="MUI component mapper"
                />
              </List>
            </Paper>
          </Grid>
        </Grid>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
