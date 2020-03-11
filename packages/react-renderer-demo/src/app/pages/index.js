import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';

import LandingPageTitle from '@docs/components/landing-page/landing-page-title';
import LandingPageCards from '@docs/components/landing-page/landing-page-cards';

const useStyles = makeStyles((theme) => ({
  landingPageContainer: {
    marginTop: 128,
    paddingBottom: 48
  },
  landingPageText: {
    marginTop: 48,
    textAlign: 'center',
    color: theme.palette.common.white,
    maxWidth: 540,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  getStartedLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: 48
  },
  getStartedAnchor: {
    textDecoration: 'none'
  },
  getStartedButton: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 2,
    color: theme.palette.common.white,
    paddingLeft: 16,
    paddingRight: 16,
    textTransform: 'none'
  }
}));

const LandingPage = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.landingPageContainer}>
        <LandingPageTitle />
        <Typography className={classes.landingPageText}>
          Data Driven Forms converts JSON form definitions into fully functional React forms.
        </Typography>
        <div className={classes.getStartedLink}>
          <Link href="/renderer/installation">
            <a className={classes.getStartedAnchor} href="/renderer/installation">
              <Button variant="outlined" className={classes.getStartedButton}>
                Get started
              </Button>
            </a>
          </Link>
        </div>
      </div>
      <LandingPageCards />
    </React.Fragment>
  );
};

export default LandingPage;
