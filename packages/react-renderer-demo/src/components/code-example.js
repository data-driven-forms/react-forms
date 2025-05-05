/* eslint-disable react/prop-types */
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import CodeIcon from '@mui/icons-material/Code';
import CodeOffIcon from '@mui/icons-material/CodeOff';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import { getParameters } from 'codesandbox/lib/api/define';
import Tooltip from '@mui/material/Tooltip';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import GhIcon from './common/gh-svg-icon';

import CodesandboxIcon from './common/code-sandbox-svg-icon';
import CodeEditor from './code-editor';
import { headerToId } from '../helpers/list-of-contents';
import ShareButton from './mdx/share-button';
import { grey } from '@mui/material/colors';
import ErrorBoundary from './error-boundary';

const HeadingRoot = styled('div')(({ theme }) => ({
  '& .anchor': {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 'inherit',
  },
  '&.wrapper': {
    flexGrow: 1,
    display: 'flex',
  },
  '& .heading': {
    paddingTop: 4,
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
    display: 'flex',
    alignItems: 'center',
    '& button': {
      visibility: 'hidden',
    },
    '&:hover button': {
      visibility: 'initial',
    },
  },
}));

export const Heading = ({ level, children, component }) => {
  const router = useRouter();
  const id = headerToId(children);
  const path = `${router.asPath}#${id}`;
  return (
    <HeadingRoot id={id} className={'wrapper'} data-scroll="true">
      <Typography id={`heading-${id}`} className={'heading'} variant={`h${level}`} component={component}>
        <a href={path} className={'anchor'} data-mdlink="md-heading">
          {children}
          <ShareButton path={path} />
        </a>
      </Typography>
    </HeadingRoot>
  );
};

const ExampleRoot = styled(Grid)(({ theme }) => ({
  '&.container': {
    [theme.breakpoints.down('md')]: {
      maxWidth: 'calc(100vw - 64px)',
    },
  },
  '& .codeWrapper': {
    background: '#1D1F21',
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 4,
  },
  '& .componentPanel': {
    padding: 16,
  },
  '& .accordion': {
    border: 'none',
    boxShadow: 'none',
    background: 'none',
    padding: 0,
  },
  '& .accordionSummary': {
    padding: 0,
    width: '100%',
  },
}));

const index = `<!DOCTYPE html>
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
  </head>

  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root" style="padding: 16px;"></div>
  </body>
</html>
`;

const getPayload = (code, sourceFiles = {}) =>
  getParameters({
    files: {
      ...sourceFiles,
      'public/index.html': {
        content: index,
      },
      'package.json': {
        content: {
          name: 'data-driven-forms-example',
          version: '1.0.0',
          description: '',
          keywords: [],
          main: 'src/index.js',
          dependencies: {
            '@data-driven-forms/mui-component-mapper': 'latest',
            '@data-driven-forms/react-form-renderer': 'latest',
            '@mui/material': 'latest',
            '@mui/icons-material': 'latest',
            react: '^18.2.0',
            'react-dom': '^18.2.0',
            'react-scripts': '5.0.1',
          },
          devDependencies: {
            '@types/react': '18.2.38',
            '@types/react-dom': '18.2.15',
            'loader-utils': '3.2.1',
            typescript: '4.4.4',
          },
          scripts: {
            start: 'react-scripts start',
            build: 'react-scripts build',
            test: 'react-scripts test --env=jsdom',
            eject: 'react-scripts eject',
          },
          browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
        },
      },
      'src/index.js': {
        content: `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
        
import App from "./App";
        
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);        
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
`,
      },
      'src/App.js': {
        content: code,
      },
    },
  });
const AccordionSummary = styled((props) => {
  const [codeExpand, setCodeExpand] = useState(false);
  return (
    <MuiAccordionSummary
      sx={{
        pointerEvents: 'none',
      }}
      expandIcon={
        <Tooltip title="Expand code example">
          <IconButton size="small" display="flex" sx={{ pointerEvents: 'auto' }} onClick={() => setCodeExpand(!codeExpand)}>
            {codeExpand ? <CodeOffIcon /> : <CodeIcon />}
          </IconButton>
        </Tooltip>
      }
      {...props}
    />
  );
})(({ theme }) => ({
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'none',
  },
  '& .MuiAccordionSummary-content': {
    flexDirection: 'row-reverse',
  },
}));
const CodeExample = ({ source, mode = 'code' }) => {
  const [name, setName] = useState('');
  const [codeSource, setCodeSource] = useState('');
  const { current: Component } = useRef(
    mode === 'preview'
      ? dynamic(
          import(`@docs/examples/${source}`).then((mod) => {
            setName(mod.default?.displayName || '');
            return mod;
          })
        )
      : Fragment
  );
  const sourceFiles = [];
  useEffect(() => {
    import(`!raw-loader!@docs/examples/${source}`).then((file) => {
      setCodeSource(file.default);
    });
  }, [source]);
  if (mode === 'preview') {
    return (
      <ErrorBoundary>
        <ExampleRoot container spacing={0} className={clsx('DocRawComponent', 'container')}>
          {Component && (
            <Heading component="h3" level="5">
              {name}
            </Heading>
          )}
          {Component && (
            <Grid className={'formContainer'} item xs={12}>
              <Paper className={'componentPanel'}>
                <Component />
              </Paper>
            </Grid>
          )}
          <Grid item xs={12}>
            <Accordion className={'accordion'}>
              <AccordionSummary className={'accordionSummary'}>
                <Box display="flex">
                  <form action="https://codesandbox.io/api/v1/sandboxes/define" method="POST" target="_blank">
                    <input type="hidden" name="parameters" value={getPayload(codeSource, sourceFiles)} />
                    <Tooltip title="Edit in codesandbox">
                      <IconButton
                        disableFocusRipple
                        type="submit"
                        sx={{ pointerEvents: 'auto' }}
                        onClick={(event) => event.stopPropagation()}
                        size="small"
                      >
                        <CodesandboxIcon />
                      </IconButton>
                    </Tooltip>
                  </form>
                  <Link
                    href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/examples/${source}.js`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Tooltip title="View source on github">
                      <IconButton sx={{ pointerEvents: 'auto' }} size="small">
                        <GhIcon style={{ color: grey[700] }} />
                      </IconButton>
                    </Tooltip>
                  </Link>
                </Box>
              </AccordionSummary>
              <AccordionDetails className={clsx('accordionDetail', 'codeWrapper')}>
                <CodeEditor value={codeSource} inExample />
              </AccordionDetails>
            </Accordion>
          </Grid>
        </ExampleRoot>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <ExampleRoot container spacing={0} className="DocRawComponent">
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Link
              href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/react-renderer-demo/src/app/examples/${source}.js`}
              target="_blank"
              rel="noopener noreferrer"
              variant="subtitle1"
            >
              View source on github
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} className={'codeWrapper'}>
          <CodeEditor value={codeSource} />
        </Grid>
      </ExampleRoot>
    </ErrorBoundary>
  );
};

export default CodeExample;
