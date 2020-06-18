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

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import { headerToId } from './list-of-contents';

const reqSource = require.context('!raw-loader!@docs/pages', true, /\.md/);

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
    paddingLeft: 0,
    marginTop: '-24px'
  }
}));

const ListOfContents = ({ file }) => {
  const [open, setOpen] = useState(false);
  const styles = contentStyles();
  const anchorRef = useRef(null);

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const text = reqSource(`./${file}.md`).default;

  const regex = /^#+ .*/gm;
  const found = text.match(regex) || [];

  return (
    <Grid item xs={12} md={false}>
      <Hidden implementation="css" mdUp>
        <Button
          ref={anchorRef}
          className={styles.button}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          Show content
        </Button>
        <Popper open={open} role={undefined} transition disablePortal anchorEl={anchorRef.current}>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'center top' }}>
              <Paper>
                <ClickAwayListener onClickAway={() => setOpen(false)}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    {found.map((text) => (
                      <Item key={text} text={text} setOpen={setOpen} />
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Hidden>
    </Grid>
  );
};

ListOfContents.propTypes = {
  file: PropTypes.string.isRequired
};

export default ListOfContents;
