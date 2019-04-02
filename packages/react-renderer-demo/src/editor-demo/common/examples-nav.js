import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

class Navigation extends Component  {
  state = {
    expandComponents: false,
    expandDocumentation: false,
    expandOthers: false,
  }

  hanleExpandComponents = () => this.setState(({ expandComponents }) => ({ expandComponents: !expandComponents }))

  hanleExpandDocumentation = () => this.setState(({ expandDocumentation }) => ({ expandDocumentation: !expandDocumentation }))

  hanleExpandOthers = () => this.setState(({ expandOthers }) => ({ expandOthers: !expandOthers }))

  renderExamplesItems = (basePath, items, sort = true) => sort ?
    items.sort((a, b) => a.linkText.localeCompare(b.linkText)).map(({ component, linkText }) => (
      <ListItem
        key={ component }
        button
        className={ this.props.classes.nested }
        component={ props =>  <RouterLink key={ component } to={ `${basePath}/${component}` } { ...props } /> }
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
        className={ this.props.classes.nested }
        component={ props =>  <RouterLink key={ component } to={ `${basePath}/${component}` } { ...props } /> }
      >
        <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
          { linkText }
        </Typography>
      </ListItem>));

  render(){
    const { classes } = this.props;
    const { expandComponents, expandDocumentation, expandOthers } = this.state;

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
              component={ props =>  <RouterLink to="/" { ...props } /> }
            >
              <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Form demos
              </Typography>
            </ListItem>
            <ListItem
              button
              component={ props =>  <RouterLink to="/live-editor" { ...props } /> }
            >
              <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
                Live Form Editor
              </Typography>
            </ListItem>
            <ListItem button onClick={ this.hanleExpandDocumentation }>
              <ListItemText primary="React form renderer" />
              { expandDocumentation ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={ expandDocumentation } timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { this.renderExamplesItems('/renderer', docs, false) }
              </List>
            </Collapse>
            <ListItem button onClick={ this.hanleExpandComponents } className={ classes.listItem }>
              <ListItemText primary="Component definitions" />
              { expandComponents ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={ expandComponents } timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { this.renderExamplesItems('/component-example', baseExamples) }
              </List>
            </Collapse>
            <ListItem button onClick={ this.hanleExpandOthers } className={ classes.listItem }>
              <ListItemText primary="Others" />
              { expandComponents ? <ExpandLess /> : <ExpandMore /> }
            </ListItem>
            <Collapse in={ expandOthers } timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                { this.renderExamplesItems('/others', otherExamples) }
              </List>
            </Collapse>
          </List>
        </Drawer>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(navStyles)(Navigation);
