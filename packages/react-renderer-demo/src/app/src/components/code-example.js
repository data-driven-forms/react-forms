import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import CodeIcon from '@material-ui/icons/Code';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import grey from '@material-ui/core/colors/grey';

import GhIcon from './common/gh-svg-icon';

const CodeEditor = dynamic(import('./code-editor'), {
  ssr: false
});

const reqSource = require.context('!raw-loader!@docs/examples', true, /\.js/);
const req = require.context('@docs/examples', true, /\.js/);

const useStyles = makeStyles((theme) => ({
  codeWrapper: {
    background: '#1D1F21',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 4
  },
  componentPanel: {
    padding: 16
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    flexGrow: 1
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  expansionPanel: {
    border: 'none',
    boxShadow: 'none',
    background: 'none',
    padding: 0
  },
  expansionPanelSummary: {
    padding: 0
  }
}));

const CodeExample = ({ source, mode }) => {
  const classes = useStyles();
  const codeSource = reqSource(`./${source}.js`).default;
  let Component;
  if (mode === 'preview') {
    Component = req(`./${source}.js`).default;

    return (
      <Grid container spacing={0} className="DocRawComponent">
        <Grid item xs={12}>
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary className={classes.expansionPanelSummary} expandIcon={<CodeIcon />}>
              {Component && <Typography className={classes.heading}>{Component.name}</Typography>}
              <Box display="flex">
                <Link
                  href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/app/examples/${source}.js`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <GhIcon style={{ color: grey[700] }} />
                </Link>
              </Box>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={clsx(classes.expansionPanelDetail, classes.codeWrapper)}>
              <CodeEditor value={codeSource} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        {Component && (
          <Grid className={classes.formContainer} item xs={12}>
            <Paper className={classes.componentPanel}>
              <Component />
            </Paper>
          </Grid>
        )}
      </Grid>
    );
  }

  return (
    <Grid container spacing={0} className="DocRawComponent">
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Link
            href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/app/examples/${source}.js`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Typography variant="subtitle1" component="h1">
              View source on github
            </Typography>
          </Link>
        </Box>
      </Grid>
      <Grid item xs={12} className={classes.codeWrapper}>
        <CodeEditor value={codeSource} />
      </Grid>
    </Grid>
  );
};

CodeExample.propTypes = {
  source: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['code', 'preview'])
};

CodeExample.defaultProps = {
  mode: 'code'
};

export default CodeExample;
