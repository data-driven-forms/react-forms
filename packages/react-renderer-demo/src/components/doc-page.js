import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';
import ListOfContents from '../helpers/list-of-contents';
import ListOfContentsMobile from '../helpers/list-of-contents-select';

const DocPage = ({ children }) => {
  const router = useRouter();

  return (
    <Grid container item>
      <ListOfContentsMobile file={router.pathname.replace('/', '')} />
      <Grid item xs={12} md={10}>
        {children}
      </Grid>
      <Grid item xs={false} md={2}>
        <ListOfContents file={router.pathname.replace('/', '')} />
      </Grid>
    </Grid>
  );
};

DocPage.propTypes = {
  children: PropTypes.node
};

export default DocPage;
