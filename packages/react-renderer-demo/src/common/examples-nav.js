import React, { useState, forwardRef } from 'react';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { navStyles } from './nav-styles';
import { baseExamples } from './examples-definitions';
import { otherExamples } from './other-pages';
import { docs } from './documenation-pages';

const useStyles = makeStyles(navStyles);

const Navigation = ({ closeNav }) => {
  const [ expandComponents, setExpandComponents ] = useState(false);
  const [ expandDocumentation, setExpandDocumentation ] = useState(false);
  const [ expandOthers, setExpandOthers ] = useState(false);
  const classes = useStyles();

  const hanleExpandComponents = () => setExpandComponents(expandComponents => !expandComponents);

  const hanleExpandDocumentation = () => setExpandDocumentation(expandDocumentation => !expandDocumentation);

  const hanleExpandOthers = () => setExpandOthers(expandOthers => !expandOthers);

  const renderExamplesItems = (basePath, items, sort = true) => sort ?
    items.sort((a, b) => a.linkText.localeCompare(b.linkText)).map(({ component, linkText }) => (
      <ListItem
        key={ component }
        button
        className={ classes.nested }
        component={ forwardRef((props, ref) => <RouterNavLink key={ component } to={ `${basePath}/${component}` } { ...props } />) }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
          { linkText }
        </Typography>
      </ListItem>))
    :
    items.map(({ component, linkText }) => (
      <ListItem
        key={ component }
        button
        className={ classes.nested }
        component={ forwardRef((props, ref) => <RouterNavLink key={ component } to={ `${basePath}/${component}` } { ...props } />) }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
          { linkText }
        </Typography>
      </ListItem>));

  return (
    <List
      component="nav"
      subheader={ (
        <ListSubheader className={ classes.navHeader } component="div">
          <span style={{ flexGrow: 1 }}>
            <Link component={ RouterLink } to="/">
              Data driven forms
            </Link>
          </span>
          <IconButton edge="end" onClick={ closeNav }>
            <ChevronLeftIcon />
          </IconButton>
        </ListSubheader>) }
      className={ classes.listRoot }
    >
      <ListItem
        button
        className={ classes.listItem }
        component={ forwardRef((props, ref) =>  <RouterNavLink to="/show-case" { ...props } />) }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
          Demo
        </Typography>
      </ListItem>
      <ListItem
        button
        className={ classes.listItem }
        component={ forwardRef((props, ref) =>  <RouterNavLink to="/live-editor" { ...props } />) }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Live Form Editor
        </Typography>
      </ListItem>
      <ListItem className={ classes.listItem } button onClick={ hanleExpandDocumentation }>
        <ListItemText primary="React form renderer" />
        { expandDocumentation ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ expandDocumentation } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { renderExamplesItems('/renderer', docs, false) }
        </List>
      </Collapse>
      <ListItem button onClick={ hanleExpandComponents } className={ classes.listItem }>
        <ListItemText primary="Component definitions" />
        { expandComponents ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ expandComponents } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { renderExamplesItems('/component-example', baseExamples) }
        </List>
      </Collapse>
      <ListItem button onClick={ hanleExpandOthers } className={ classes.listItem }>
        <ListItemText primary="Others" />
        { expandComponents ? <ExpandLess /> : <ExpandMore /> }
      </ListItem>
      <Collapse in={ expandOthers } timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          { renderExamplesItems('/others', otherExamples) }
        </List>
      </Collapse>
    </List>
  );
};

export default Navigation;
