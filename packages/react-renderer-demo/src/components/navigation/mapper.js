/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Link from '@material-ui/core/Link';
import RouterNavLink from 'next/link';
import { useRouter } from 'next/router';

import { navStyles } from './nav-styles';
import { query } from './find-connected-links';
import useMapperLink from '../../hooks/use-mapper-link';
import clsx from 'clsx';

const useStyles = makeStyles(navStyles);

const Item = ({ href, linkText, component, divider, level }) => {
  const classes = useStyles();
  const router = useRouter();
  const link = useMapperLink(href.replace('/?', '?'));

  const queryMapper = router.query.mapper ? `?mapper=${router.query.mapper}` : '';
  const finalHref = queryMapper && link.match(query) ? `${link.replace(query, '')}${queryMapper}` : link;

  return (
    <ListItem
      divider={divider}
      button
      selected={href.replace(query, '') === router.asPath.replace(query, '')}
      key={href || linkText}
      className={clsx(classes.item, {
        [classes.nested]: level > 0
      })}
      component={forwardRef((props, ref) => (
        <RouterNavLink ref={ref} key={component} href={finalHref}>
          <Link style={{ color: 'rgba(0, 0, 0, 0.87)' }} {...props} href={finalHref} />
        </RouterNavLink>
      ))}
    >
      <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
        {linkText}
      </Typography>
    </ListItem>
  );
};

Item.propTypes = {
  href: PropTypes.string.isRequired,
  linkText: PropTypes.string,
  component: PropTypes.node,
  divider: PropTypes.bool
};

const FinalList = ({ title, level, link, fields, previousLinks = [], renderItems, openable = true, open = false }) => {
  const [isOpen, setIsOpen] = useState(openable ? open : true);

  const closeNav = () => setIsOpen((state) => !state);
  const classes = useStyles();

  return (
    <List key={title} component="nav">
      {title && (
        <ListItem button onClick={openable ? closeNav : null} className={classes.listItem}>
          <ListItemText primary={title} className={classes.listItemText} />
          {openable ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderItems(fields, level + 1, [...previousLinks, link])}
        </List>
      </Collapse>
    </List>
  );
};

const useSubHeaderStyles = makeStyles((theme) => ({
  subHeader: {
    color: theme.palette.text.primary,
    paddingLeft: 24
  }
}));

const SubHeader = ({ title }) => {
  const classes = useSubHeaderStyles();
  return <ListSubheader className={classes.subHeader}>{title}</ListSubheader>;
};

const Mapper = {
  Wrapper: FinalList,
  Item,
  SubHeader
};

export default Mapper;
