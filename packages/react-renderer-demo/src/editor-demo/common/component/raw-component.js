import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import brace from 'brace';
import AceEditor from 'react-ace';

import { makeStyles } from '@material-ui/core/styles';
import CodeIcon from '@material-ui/icons/Code';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import 'brace/mode/jsx';
import 'brace/theme/tomorrow_night';

const reqSource = require.context(
  '!raw-loader!docs/components/',
  true,
  /\.js/,
);
const req = require.context(
  'docs/components/',
  true,
  /\.js/,
);

const getRawJsx = text =>
  `
\`\`\`jsx
${text}
\`\`\`
`;

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

const renderers = {
  code: ({ value, language }) =>(
    <div style={{ width: '100%', paddingTop: 10, background: '#1d1f21' }}>
      <AceEditor
        readOnly
        mode={ typeof language === 'string' ? language.toLowerCase() : 'jsx' }
        theme="tomorrow_night"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={ value }
        fontSize={ 14 }
        maxLines={ Infinity }
        showPrintMargin={ false }
        showGutter={ true }
        highlightActiveLine={ false }
        style={{ width: '100%', paddingTop: 10 }}
        setOptions={{
          showLineNumbers: true,
        }}
        onLoad={ (editor) => {
          editor.getSession().setUseWorker(false);
        } }
      />
    </div>),
};

const MdRenderer = props => <ReactMarkdown renderers={ renderers } { ...props } />;

const RawComponent = (props) => {
  const [ content, setContent ] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const foo = req(`./${props.source}.js`).default;
    const text = getRawJsx(reqSource(`./${props.source}.js`).default);
    setContent({ md: text, Component: foo });
  }, [ props.source ]);
  return (
    <Grid container spacing={ 0 }>
      { content.md && (
        <Grid item xs={ 12 }>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={ <CodeIcon /> }>
              { content.Component && <Typography className={ classes.heading }>{ content.Component.displayName }</Typography> }
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ padding: 0 }}>
              <MdRenderer style={{ width: '100%' }} source={ content.md } />
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
