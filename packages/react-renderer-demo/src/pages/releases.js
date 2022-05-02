import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Markdown from 'markdown-to-jsx';
import { Heading } from '../components/mdx/mdx-components';
import mdxComponents from '@docs/components/mdx/mdx-components';

const options = {
  overrides: {
    a: mdxComponents.link,
  },
};

const parseData = (data) =>
  data.map((release) => (
    <React.Fragment key={release.name}>
      <Markdown options={options}>{release.body}</Markdown>
    </React.Fragment>
  ));

const ReleasesPage = () => {
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch('https://api.github.com/repos/data-driven-forms/react-forms/releases?page=1')
      .then((res) => res.json())
      .then((data) => {
        setData(parseData(data));
      })
      .catch(() => {
        setData(
          <React.Fragment>
            Cannot obtain data from GitHub, please visit
            <a href="https://github.com/data-driven-forms/react-forms/releases" rel="noopener noreferrer" target="_blank">
              GitHub page.
            </a>
          </React.Fragment>
        );
      });
  }, []);

  return (
    <div>
      <Heading level="4" component="h1">
        Releases
      </Heading>
      {!data ? (
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <CircularProgress disableShrink />
        </Grid>
      ) : (
        data
      )}
    </div>
  );
};

export default ReleasesPage;
