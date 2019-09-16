import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LogoSvgIcon from '../common/landing-page-logo';

const useStyles = makeStyles(theme => ({
  landingHeading: {
    color: theme.palette.common.white,
    fontSize: 48,
    fontWeight: 700,
    letterSpacing: '0.6px',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: '"Montserrat", sans-serif',
  },
  logoWord: {
    display: 'inline-block',
  },
}));

const LandingPageTitle = () => {
  const classes = useStyles();

  return (
    <Typography className={ classes.landingHeading } variant="h1" component="h2" gutterBottom>
      Data driven <span className={ classes.logoWord }>f<LogoSvgIcon/>rms</span>
    </Typography>
  );
};

export default LandingPageTitle;

