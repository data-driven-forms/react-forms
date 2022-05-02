/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import GhIcon from './common/gh-svg-icon';

import NpmSvgIcon from './common/npm-svg-icon';
import TwitterIcon from './common/twitter-svg-icon';
import DiscordIcon from './common/discord-svg-icon';
import { grey } from '@mui/material/colors';

const StyledLink = styled(Link)(() => ({
  '&.listLink': {
    display: 'flex',
    alignContent: 'center',
  },
}));

const RepoLink = ({ href, icon, label }) => (
  <ListItem>
    <ListItemText
      primary={
        <StyledLink href={href} target="_blank" rel="noopener noreferrer" className="listLink" color="inherit" underline="hover">
          <SvgIcon>{icon}</SvgIcon>
          &nbsp;
          {label}
        </StyledLink>
      }
    />
  </ListItem>
);

const drawerWidth = 240;

const StyledFooter = styled('footer')(({ theme }) => ({
  '&.footer': {
    //marginTop: 64,
    backgroundColor: grey[200],
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& .footerShift': {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  '& .foooterCard': {
    backgroundColor: 'transparent',
    margin: 16,
    padding: 24,
    borderRadius: 2,
    display: 'flex',
  },
  '& .foooterRight': {
    float: 'right',
  },
  '& .listHeader': {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.grey[800],
    fontSize: 16,
  },
}));

const Footer = ({ open }) => (
  <React.Fragment>
    <StyledFooter
      className={clsx('footer', {
        footerShift: open,
      })}
    >
      <Grid container justifyContent="space-between">
        <Grid xs={12} md={4} item>
          <Paper elevation={0} className="foooterCard">
            <div>
              <Typography gutterBottom variant="h5">
                Contribution
              </Typography>
              <Typography gutterBottom>
                Please report any bugs, mistakes, suggestions and don&apos;t forget to contribute to the data-driven-forms/react-forms repository.
              </Typography>
              <Typography gutterBottom>Released under the APACHE-2.0 License.</Typography>
              <Typography>Copyright © {new Date().getFullYear()} Data Driven Forms</Typography>
            </div>
          </Paper>
        </Grid>
        <Grid xs={12} md={8} item>
          <Paper elevation={0} className={clsx('foooterCard', 'foooterRight')}>
            <List>
              <RepoLink href="https://github.com/data-driven-forms/react-forms" icon={<GhIcon />} label="React forms" />
              <RepoLink href="https://discord.gg/6sBw6WM" icon={<DiscordIcon />} label="Discord server" />
              <RepoLink href="https://twitter.com/DataDrivenForms" icon={<TwitterIcon />} label="@DataDrivenForms" />
            </List>
            <List>
              <RepoLink
                href="https://www.npmjs.com/package/@data-driven-forms/react-form-renderer"
                icon={<NpmSvgIcon />}
                label="React form renderer"
              />
              <RepoLink
                href="https://www.npmjs.com/package/@data-driven-forms/pf4-component-mapper"
                icon={<NpmSvgIcon />}
                label="PF4 component mapper"
              />
              <RepoLink
                href="https://www.npmjs.com/package/@data-driven-forms/mui-component-mapper"
                icon={<NpmSvgIcon />}
                label="MUI component mapper"
              />
              <RepoLink
                href="https://www.npmjs.com/package/@data-driven-forms/blueprint-component-mapper"
                icon={<NpmSvgIcon />}
                label="Blueprint component mapper"
              />
            </List>
          </Paper>
        </Grid>
      </Grid>
    </StyledFooter>
  </React.Fragment>
);

export default Footer;
