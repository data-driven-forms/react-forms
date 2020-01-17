import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Markdown from 'markdown-to-jsx';
import { Heading } from '../src/components/mdx/mdx-components';

const parseData = data => data.map((release) => {
  return (
    <React.Fragment key={ release.name }>
      <Markdown>{ release.body }</Markdown>
    </React.Fragment>
  );
});

const ReleasesPage = () => {
  const [ data, setData ] = useState(undefined);

  useEffect(() => {
    fetch('https://api.github.com/repos/data-driven-forms/react-forms/releases?page=1')
    .then(res => res.json())
    .then((data) => {
      setData(parseData(data));
    })
    .catch(() => {
      setData('Something wrong happened :(');
    });
  }, []);

  return (<div>
    <Heading level="4" component="h1">Releases</Heading>
    { !data ? (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <CircularProgress disableShrink />
    </Grid>) : data }
  </div>);
};

export default ReleasesPage;
