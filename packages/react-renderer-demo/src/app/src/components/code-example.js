import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const CodeEditor = dynamic(import('./code-editor'), {
  ssr: false
});

const reqSource = require.context('!raw-loader!@data-driven-forms/examples', true, /\.js/);

const useStyles = makeStyles(() => ({
  codeWrapper: {
    background: '#1D1F21',
    paddingTop: 16,
    paddingBottom: 16
  }
}));

const CodeExample = ({ source }) => {
  const codeSource = reqSource(`./src/${source}.js`).default;
  const classes = useStyles();
  return (
    <Grid container spacing={0} className="DocRawComponent">
      <Grid item xs={12}>
        <Box display="flex" justifyContent="flex-end">
          <Link
            href={`https://github.com/data-driven-forms/react-forms/tree/master/packages/examples/src/${source}.js`}
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
  source: PropTypes.string.isRequired
};

export default CodeExample;
