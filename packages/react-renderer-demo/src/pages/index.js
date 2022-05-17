import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import GitHubButton from 'react-github-btn';

import LandingPageTitle from '@docs/components/landing-page/landing-page-title';
import LandingPageCards from '@docs/components/landing-page/landing-page-cards';

import { styled } from '@mui/material/styles';

const Root = styled(Typography)(({ theme }) => ({
  '&.landing-page-root': {
    marginTop: 128,
    paddingBottom: 48,
  },
  '& .landing-page-text': {
    marginTop: 48,
    textAlign: 'center',
    color: theme.palette.common.white,
    maxWidth: 540,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  '& .landing-page-get-started-link': {
    display: 'block',
    textAlign: 'center',
    marginTop: 48,
  },
  '& .landing-page-npm-link': {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 24,
  },
  '& .get-started-anchor': {
    textDecoration: 'none',
  },
  '& .get-started-button': {
    border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 2,
    color: theme.palette.common.white,
    padding: 5,
    paddingLeft: 16,
    paddingRight: 16,
    textTransform: 'none',
  },
  '& .github-star': {
    textDecoration: 'none',
    marginRight: '8px',
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

const LandingPage = () => (
  <React.Fragment>
    <Root className="landing-page-root" as="div">
      <LandingPageTitle />
      <Typography className="landing-page-text">Data Driven Forms converts JSON form definitions into fully functional React forms.</Typography>
      <div className="landing-page-get-started-link">
        <Link href="/introduction">
          <a className="get-started-anchor" href="/introduction">
            <Button variant="outlined" className="get-started-button">
              Get started
            </Button>
          </a>
        </Link>
      </div>
      <div className="landing-page-npm-link">
        <span className="github-star">
          <GitHubButton
            href="https://github.com/data-driven-forms/react-forms"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star data-driven-forms/react-forms on GitHub"
          >
            Star
          </GitHubButton>{' '}
        </span>
        <a href="https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer" rel="noopener noreferrer" target="_blank">
          <img src="https://badge.fury.io/js/%40data-driven-forms%2Freact-form-renderer.svg" alt="current version" />
        </a>
      </div>
    </Root>
    <LandingPageCards />
  </React.Fragment>
);

export default LandingPage;
