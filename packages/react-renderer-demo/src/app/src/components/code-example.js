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
import { getParameters } from 'codesandbox/lib/api/define';

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

const payload = getParameters({
  files: {
    'public/index.html': {
      content:
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <meta\n      name="viewport"\n      content="width=device-width, initial-scale=1, shrink-to-fit=no"\n    />\n    <meta name="theme-color" content="#000000" />\n    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />\n    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />\n    <title>Data driven forms example</title>\n\n    <!--<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">-->\n\n    <!--<link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-base.css"/>-->\n    <!--<link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-addons.css"/>-->\n  </head>\n\n  <body>\n    <noscript>\n      You need to enable JavaScript to run this app.\n    </noscript>\n    <div id="root"></div>\n  </body>\n</html>\n'
    },
    'package.json': {
      content: {
        name: 'data-driven-forms-example',
        version: '1.0.0',
        description: '',
        keywords: [],
        main: 'src/index.js',
        dependencies: {
          '@data-driven-forms/mui-component-mapper': '2.1.2',
          '@data-driven-forms/pf4-component-mapper': '2.1.2',
          '@data-driven-forms/react-form-renderer': '2.1.2',
          react: '16.12.0',
          'react-dom': '16.12.0',
          'react-scripts': '3.0.1'
        },
        devDependencies: { typescript: '3.8.3' },
        scripts: { start: 'react-scripts start', build: 'react-scripts build', test: 'react-scripts test --env=jsdom', eject: 'react-scripts eject' },
        browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
      }
    },
    'src/index.js': {
      content:
        'import React from "react";\nimport ReactDOM from "react-dom";\n\nimport App from "./App";\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  rootElement\n);\n'
    },
    'src/App.js': {
      content: 'import React from "react";\n\nexport default function App() {\n  return <div>there will be dragons</div>;\n}\n'
    }
  }
});

console.log(payload);

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
                <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
                  <input type="hidden" name="parameters" value={payload} />
                  <input type="submit" value="Open in sandbox" />
                </form>
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
