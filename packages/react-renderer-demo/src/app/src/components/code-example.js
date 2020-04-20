import React from 'react';
import Grid from '@material-ui/core/Grid';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const CodeEditor = dynamic(import('./code-editor'), {
  ssr: false
});

const reqSource = require.context('!raw-loader!@data-driven-forms/examples', true, /\.js/);

const CodeExample = ({ source }) => {
  const codeSource = reqSource(`./src/${source}.js`).default;
  return (
    <Grid container spacing={0} className="DocRawComponent">
      <Grid item xs={12}>
        <CodeEditor value={codeSource} />
      </Grid>
    </Grid>
  );
};

CodeExample.propTypes = {
  source: PropTypes.string.isRequired
};

export default CodeExample;
