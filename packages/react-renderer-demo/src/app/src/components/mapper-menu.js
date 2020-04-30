import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { getScopedLink, getPrefix } from '../helpers/scoped-links';

const links = {
  pf4: `<link class="pf4" href="https://cdn.jsdelivr.net/npm/@patternfly/patternfly@2.71.5/patternfly.min.css" rel="stylesheet" />`
};

const useStyles = makeStyles((theme) => ({
  menuTrigger: {
    color: '#fff'
  },
  menuItem: {
    paddingRight: 24
  },
  scopeLink: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }
}));

const MapperMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const classes = useStyles();
  const activeScope = getPrefix(router.pathname);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const applyMapperStyle = (mapper) => {
    const head = document.head;
    const mapperLink = head.getElementsByClassName(activeScope)[0];
    if (mapperLink) {
      head.removeChild(mapperLink);
    }

    if (mapper !== 'mui') {
      let newLink = document.createElement('div');
      newLink.innerHTML = links[mapper];
      newLink = newLink.firstChild;
      head.appendChild(newLink);
    }
  };

  useEffect(() => {
    applyMapperStyle(activeScope);
  }, []);

  const handleClose = (mapper) => {
    applyMapperStyle(mapper);
    setAnchorEl(null);
  };

  const muiLink = getScopedLink(router.pathname, 'mui');
  const pf4Link = getScopedLink(router.pathname, 'pf4');

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.menuTrigger} onClick={handleClick}>
        Mapper: {activeScope}
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem className={classes.menuItem} onClick={() => handleClose('mui')} selected={activeScope === 'mui'}>
          <Link href={muiLink}>
            <a href={muiLink} className={classes.scopeLink}>
              <Checkbox checked={activeScope === 'mui'} />
              Material UI
            </a>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={() => handleClose('pf4')} selected={activeScope === 'pf4'}>
          <Link href={pf4Link}>
            <a href={pf4Link} className={classes.scopeLink}>
              <Checkbox checked={activeScope === 'pf4'} />
              Patternfly 4
            </a>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MapperMenu;
