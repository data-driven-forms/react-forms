import React from 'react';
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Markdown from 'markdown-to-jsx';
import { makeStyles } from '@material-ui/core/styles';

import MdxComponents from './mdx/mdx-components';

const options = {
  overrides: {
    a: {
      component: MdxComponents.a
    }
  }
};

const messageList = [
  {
    id: '1',
    date: 'April 8 2020',
    title: 'Version 2 released',
    text: `Version 2 of Data Driven Forms has been released.<br /><br />
    Check what is new in [migration guide](/migration-guide)!<br /><br />
    If you need documenation for version 1, please use v1 [branch on GitHub](https://github.com/data-driven-forms/react-forms/tree/v1/packages/react-renderer-demo/src/app/pages)
    or visit our [backup link](https://pokus-next.firebaseapp.com/)!
    `
  }
];

export const lastMessageId = messageList[0].id;

const useStyles = makeStyles((theme) => ({
  paper: {
    transformOrigin: 'top right'
  },
  list: {
    maxWidth: theme.spacing(40),
    maxHeight: theme.spacing(40),
    overflow: 'auto'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const NotificationPanel = ({ isOpen, onClose, anchorRef }) => {
  const classes = useStyles();

  return (
    <Popper id="notifications-popup" open={isOpen} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal role={undefined}>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Grow in={isOpen} {...TransitionProps}>
            <Paper className={classes.paper}>
              <List className={classes.list}>
                {messageList.map((message, index) => (
                  <React.Fragment key={message.id}>
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                      {message.date && <ListItemText secondary={message.date} />}
                      <ListItemText
                        primary={message.title}
                        secondary={<Markdown options={options}>{message.text}</Markdown>}
                        secondaryTypographyProps={{ color: 'textPrimary', component: 'div' }}
                      />
                    </ListItem>
                    {index < messageList.length - 1 ? <Divider variant="middle" /> : null}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grow>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

NotificationPanel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  anchorRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]).isRequired
};

export default NotificationPanel;
