import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { headerToId } from './list-of-contents';
import { grey } from '@mui/material/colors';

const StyledMenuItem = styled(MenuItem)(() => ({
  '&.a': {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Item = ({ text, setOpen }) => {
  const router = useRouter();
  const labelText = text.replace(/#/g, '');

  return (
    <StyledMenuItem onClick={() => setOpen(false)} component="a" className={'a'} href={`${router.pathname}#${headerToId(text)}`} title={labelText}>
      {labelText}
    </StyledMenuItem>
  );
};

Item.propTypes = {
  text: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const Root = styled('div')(() => ({
  '& .button': {
    paddingRight: 0,
    marginTop: '-24px',
    color: grey[900],
  },
  '&.wrapper': {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ListOfContents = ({ found }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <Root className={'wrapper'}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div>
          <Button
            ref={anchorRef}
            className={'button'}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
            endIcon={!open ? <KeyboardArrowRightIcon /> : <KeyboardArrowDownIcon />}
          >
            Show content
          </Button>
          <Popper open={open} role={undefined} transition disablePortal anchorEl={anchorRef.current} placement="bottom-end">
            {({ TransitionProps }) => (
              <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
                <Paper>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {found.map((text) => (
                      <Item key={text} text={text} setOpen={setOpen} />
                    ))}
                  </MenuList>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </ClickAwayListener>
    </Root>
  );
};

ListOfContents.propTypes = {
  found: PropTypes.array,
};

export default ListOfContents;
