import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import dynamic from 'next/dynamic';
const CodeEditor = dynamic(import('../code-editor'), {
  ssr: false,
});

const reqSource = require.context(
  '!raw-loader!@docs/doc-components',
  true,
  /\.js/,
);
const req = require.context(
  '@docs/doc-components',
  true,
  /\.js/,
);

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formWrapper: {
    padding: 16,
  },
  formContainer: {
    marginTop: 16,
  },
}));

const RawComponent = (props) => {
  const [ content, setContent ] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const foo = req(`./${props.source}.js`).default;
    const text = reqSource(`./${props.source}.js`).default;
    setContent({ text, Component: foo });
  }, [ props.source ]);

  return (
    <Grid container spacing={ 0 }>
      { content.text && (
        <Grid item xs={ 12 }>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={ <CodeIcon /> }>
              { content.Component && <Typography className={ classes.heading }>{ content.Component.name }</Typography> }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: 0 }}>
              <CodeEditor value={ content.text } />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      ) }
      { content.Component && (
        <Grid className={ classes.formContainer } item xs={ 12 }>
          <Paper className={ classes.formWrapper } style={{ padding: 16 }}>
            <content.Component />
          </Paper>
        </Grid>
      ) }
    </Grid>
  );
};

export default RawComponent;
