import React, { useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';

import { styled } from '@mui/material/styles';

const Root = styled(Backdrop)(() => ({
  '&.backdrop': {
    zIndex: 10000,
  },
  '& .cookie-alert': {
    minHeight: '100px',
    bottom: 0,
    position: 'fixed',
  },
}));

const CookieModal = () => {
  const [consent, setConsent] = useState();

  useEffect(() => {
    setConsent(localStorage.getItem('data-driven-forms-cookie-consent'));
  }, []);

  useEffect(() => {
    if (consent === 'google') {
      if (!window.location.origin.includes('localhost')) {
        let s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = 'true';
        s.src = 'https://www.googletagmanager.com/gtag/js?id=UA-164334905-1';
        let x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);

        window.dataLayer = window.dataLayer || [];

        // eslint-disable-next-line no-inner-declarations
        function gtag() {
          window.dataLayer.push(arguments);
        }

        window.gtag = gtag;
        global.gtag = gtag;

        gtag('js', new Date());
        // eslint-disable-next-line camelcase
        gtag('config', 'UA-164334905-1', { anonymize_ip: true });
      }
    }
  }, [consent]);

  const updateConsent = (type) => {
    setConsent(type);
    localStorage.setItem('data-driven-forms-cookie-consent', type);
  };

  if (consent) {
    return null;
  }

  return (
    <Root className="backdrop" open={true}>
      <Alert className="cookie-alert" severity="info">
        Hello, we would like to use cookies to track your anonymised information in Google Analytics. We are using this information to know what kind
        of users visits and uses our library. It also helps us to know what content is the the most read. We are also using neccessary cookies to know
        what notifications to load and to store information about this consent.
        <Box>
          <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => updateConsent('neccessary')}>
            Allow only neccessary cookies
          </Button>
          <Button variant="outlined" onClick={() => updateConsent('google')}>
            Allow Google analytics
          </Button>
        </Box>
      </Alert>
    </Root>
  );
};

export default CookieModal;
