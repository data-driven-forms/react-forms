import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import { Star } from 'react-github-buttons';

import LandingPageTitle from '@docs/components/landing-page/landing-page-title';
import LandingPageCards from '@docs/components/landing-page/landing-page-cards';

const useStyles = makeStyles((theme) => ({
  landingPageContainer: {
    marginTop: 128,
    paddingBottom: 48,
  },
  landingPageText: {
    marginTop: 48,
    textAlign: 'center',
    color: theme.palette.common.white,
    maxWidth: 540,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  getStartedLink: {
    display: 'block',
    textAlign: 'center',
    marginTop: 48,
  },
  npmLink: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
  getStartedAnchor: {
    textDecoration: 'none',
  },
  getStartedButton: {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 2,
    color: theme.palette.common.white,
    paddingLeft: 16,
    paddingRight: 16,
    textTransform: 'none',
  },
  gitHubStar: {
    textDecoration: 'none',
    '& button': {
      lineHeight: 1.43,
      padding: '1px 6px',
      maxHeight: 20,
    },
    '& a': {
      padding: '2px 5px',
      lineHeight: 1.43,
      fontFamily: 'sans-serif',
      maxHeight: 20,
    },
  },
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
          <Link href="/introduction">
            <a className={classes.getStartedAnchor} href="/introduction">
              <Button variant="outlined" className={classes.getStartedButton}>
                Get started
              </Button>
            </a>
          </Link>
        </div>
        <div className={classes.npmLink}>
          <span className={classes.gitHubStar}>
            <Star owner="data-driven-forms" repo="react-forms" />
          </span>
          <a href="https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer" rel="noopener noreferrer" target="_blank">
            <img src="https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer.svg" alt="current version" />
          </a>
        </div>
      </div>
      <LandingPageCards />
    </React.Fragment>
  );
};

export default LandingPage;
