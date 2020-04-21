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
import IconButton from '@material-ui/core/IconButton';
import { getParameters } from 'codesandbox/lib/api/define';
import Tooltip from '@material-ui/core/Tooltip';

import GhIcon from './common/gh-svg-icon';
import CodesandboxIcon from './common/code-sandbox-svg-icon';

const CodeEditor = dynamic(import('./code-editor'), {
  ssr: false
});

const reqSource = require.context('!raw-loader!@docs/examples', true, /\.js/);
const reqCss = require.context('!raw-loader!@docs/examples', true, /\.css/);
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
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
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

/**
 * Generates html markup for the sandbox
 * @param {String} type either MUI or PF4
 */
const generateIndex = (type) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
    <title>Data driven forms example</title>
    ${type === 'mui' ? '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">' : ''}
    ${
      type === 'pf4'
        ? `
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-base.css"/>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/@patternfly/patternfly@4.0.5/patternfly-addons.css"/>
    `
        : ''
    }    
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root" style="padding: 16px;"></div>
  </body>
</html>
`;

const getPayload = (type, code, sourceFiles = {}) =>
  getParameters({
    files: {
      ...sourceFiles,
      'public/index.html': {
        content: generateIndex(type)
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
            '@patternfly/react-core': 'latest',
            '@patternfly/react-icons': 'latest',
            '@material-ui/core': 'latest',
            '@material-ui/icons': 'latest',
            react: '16.12.0',
            'react-dom': '16.12.0',
            'react-scripts': '3.0.1'
          },
          devDependencies: { typescript: '3.8.3' },
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test --env=jsdom',
            eject: 'react-scripts eject'
          },
          browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all']
        }
      },
      'src/index.js': {
        content:
          'import React from "react";\nimport ReactDOM from "react-dom";\n\nimport App from "./App";\n\nconst rootElement = document.getElementById("root");\nReactDOM.render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n  rootElement\n);\n'
      },
      'src/App.js': {
        content: code
      }
    }
  });

const CodeExample = ({ source, mode, mapper, additionalSources }) => {
  const classes = useStyles();
  const codeSource = reqSource(`./${source}.js`).default;
  let Component;
  if (mode === 'preview') {
    Component = req(`./${source}.js`).default;
    const sourceFiles = additionalSources.split(',').reduce(
      (acc, curr) => ({
        ...acc,
        [`src/${curr.split('/').pop()}`]: {
          content: curr.match(/\.css$/) ? reqCss(`./${curr}`).default : reqSource(`./${curr}`).default
        }
      }),
      {}
    );

    return (
      <Grid container spacing={0} className="DocRawComponent">
        <Grid item xs={12}>
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              className={classes.expansionPanelSummary}
              expandIcon={
                <Tooltip title="Expand code example">
                  <IconButton>
                    <CodeIcon />
                  </IconButton>
                </Tooltip>
              }
            >
              {Component && (
                <Typography className={classes.heading} component="h4" variant="h3">
                  {Component.name}
                </Typography>
              )}
              <Box display="flex">
                <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
                  <input type="hidden" name="parameters" value={getPayload(mapper, codeSource, sourceFiles)} />
                  <Tooltip title="Edit in codesandbox">
                    <IconButton disableFocusRipple type="submit">
                      <CodesandboxIcon />
                    </IconButton>
                  </Tooltip>
                </form>
                <Link
                  component="button"
                  href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/app/examples/${source}.js`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  <Tooltip title="View source on github">
                    <IconButton>
                      <GhIcon style={{ color: grey[700] }} />
                    </IconButton>
                  </Tooltip>
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
  mode: PropTypes.oneOf(['code', 'preview']),
  mapper: PropTypes.oneOf(['pf4', 'mui']),
  additionalSources: PropTypes.string // this has to be a string, MDX does not pass objects/arrays
};

CodeExample.defaultProps = {
  mode: 'code',
  mapper: 'pf4',
  additionalSources: ''
};

export default CodeExample;
