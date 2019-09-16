import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../src/components/layout';

export default function Index() {
  return (
    <Layout>
      <Container maxWidth="sm">
        <Box my={ 4 }>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
}
