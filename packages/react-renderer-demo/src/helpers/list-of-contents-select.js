import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

import { headerToId } from './list-of-contents';

const itemStyles = makeStyles(() => ({
  a: {
    textDecoration: 'none',
    color: 'inherit'
  }
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
  setOpen: PropTypes.func.isRequired
};

const contentStyles = makeStyles(() => ({
  button: {
    paddingRight: 0,
    marginTop: '-24px'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  }
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
  found: PropTypes.array
};

export default ListOfContents;
