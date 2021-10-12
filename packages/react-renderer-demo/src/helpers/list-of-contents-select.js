import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
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

const itemStyles = makeStyles(() => ({
  a: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

const Item = ({ text, setOpen }) => {
  const router = useRouter();
  const labelText = text.replace(/#/g, '');
  const styles = itemStyles();

  return (
    <MenuItem onClick={() => setOpen(false)} component="a" className={styles.a} href={`${router.pathname}#${headerToId(text)}`} title={labelText}>
      {labelText}
    </MenuItem>
  );
};

Item.propTypes = {
  text: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const contentStyles = makeStyles(() => ({
  button: {
    paddingRight: 0,
    marginTop: '-24px',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const ListOfContents = ({ found }) => {
  const [open, setOpen] = useState(false);
  const styles = contentStyles();
  const anchorRef = useRef(null);

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div>
          <Button
            ref={anchorRef}
            className={styles.button}
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
    </div>
  );
};

ListOfContents.propTypes = {
  found: PropTypes.array,
};

export default ListOfContents;
