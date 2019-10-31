import React, { useState, forwardRef } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '@material-ui/core/Link';
import RouterNavLink from 'next/link';
import { useRouter } from 'next/router';

import { navStyles } from './nav-styles';

const useStyles = makeStyles(navStyles);

const Item = ({ href, linkText, component }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <ListItem
      button
      selected={ href === router.pathname }
      key={ href || linkText }
      className={ classes.nested }
      component={ forwardRef((props, ref) => (
        <RouterNavLink key={ component } href={ href.replace('/?', '?') }>
          <Link style={{ color: 'rgba(0, 0, 0, 0.87)' }} { ...props } />
        </RouterNavLink>
      )) }
    >
      <Typography
        variant="button"
        gutterBottom
        style={{ textTransform: 'capitalize', fontWeight: 'initial' }}
      >
        { linkText }
      </Typography>
    </ListItem>
  );
};

const FinalList = ({
  title,
  level,
  link,
  fields,
  previousLinks = [],
  renderItems,
  openable = true,
  open = false,
}) => {
  const [ isOpen, setIsOpen ] = useState(openable ? open : true);

  const closeNav = () => setIsOpen(state => !state);
  const classes = useStyles();

  return (
    <List key={ title } component="nav">
      { title && (
        <ListItem button onClick={ openable ? closeNav : null } className={ classes.listItem } >
          <ListItemText primary={ title } />
          { openable ? isOpen ? <ExpandLess /> : <ExpandMore /> : null }
        </ListItem>
      ) }
      <Collapse in={ isOpen } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { renderItems(fields, level + 1, [ ...previousLinks, link ]) }
        </List>
      </Collapse>
    </List>
  );
};

const Mapper = {
  wrapper: FinalList,
  item: Item,
};

export default Mapper;
