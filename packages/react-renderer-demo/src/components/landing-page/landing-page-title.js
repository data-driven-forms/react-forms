import React from 'react';
import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

const Title = styled(Typography)(({ theme }) => ({
  '&.root': {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: '"Montserrat", sans-serif',
  },
  '& .logo': {
    display: 'inline-block',
  },
}));

const LandingPageTitle = () => (
  <Title className="root" variant="h1" component="h2" gutterBottom>
    Data driven{' '}
    <span className="logo">
      f<img alt="O" src="/logo.svg" />
      rms
    </span>
  </Title>
);

export default LandingPageTitle;
