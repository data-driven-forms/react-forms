import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { NavLink as RouterLink } from 'react-router-dom';
import { navStyles } from './nav-styles';
import { baseExamples } from './examples-definitions';
import { otherExamples } from './other-pages';
import { docs } from './documenation-pages';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(navStyles);

const Navigation = () => {
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
        component={ forwardRef((props, ref) => <RouterLink key={ component } to={ `${basePath}/${component}` } { ...props } />) }
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
        component={ forwardRef((props, ref) => <RouterLink key={ component } to={ `${basePath}/${component}` } { ...props } />) }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
          { linkText }
        </Typography>
      </ListItem>));

  return (
    <div className={ classes.root }>
      <Drawer
        className={ classes.drawer }
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List
          component="nav"
          subheader={ <ListSubheader component="div">Data driven forms</ListSubheader> }
          className={ classes.listRoot }
        >
          <ListItem
            button
            component={ forwardRef((props, ref) =>  <RouterLink to="/" { ...props } />) }
          >
            <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Form demos
            </Typography>
          </ListItem>
          <ListItem
            button
            component={ forwardRef((props, ref) =>  <RouterLink to="/live-editor" { ...props } />) }
          >
            <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Live Form Editor
            </Typography>
          </ListItem>
          <ListItem button onClick={ hanleExpandDocumentation }>
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
          <ListItem
            button
            component={ forwardRef((props, ref) => <RouterLink to="/contribution" { ...props } />) }
          >
            <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Contribution
            </Typography>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
};

export default Navigation;
