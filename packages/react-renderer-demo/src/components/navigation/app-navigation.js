/* eslint-disable react/prop-types */
import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import MenuRenderer from './menu-renderer';
import schema from './schemas/schema';
import DocLink from '../common/doc-link';

const StyledListRoot = styled(List)(({ theme }) => ({
  '& .navHeader': {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    zIndex: 2,
  },
  '&.listRoot': {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
  },
}));

const Navigation = ({ closeNav, searchRef }) => (
  <StyledListRoot
    component="nav"
    subheader={
      <ListSubheader className={'navHeader'} component="div">
        <span style={{ flexGrow: 1 }}>
          <DocLink href="/" underline="hover" style={{ cursor: 'pointer' }}>
            Data driven forms
          </DocLink>
        </span>
        <IconButton edge="end" onClick={closeNav} size="large">
          <ChevronLeftIcon />
        </IconButton>
      </ListSubheader>
    }
    className={'listRoot'}
  >
    <MenuRenderer searchRef={searchRef} schema={schema} />
  </StyledListRoot>
);

export default Navigation;
