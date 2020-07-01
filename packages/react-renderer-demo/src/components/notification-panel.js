import React, { useState, useEffect } from 'react';
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

const getNotifications = () => fetch(`/notifications?end=${Date.now()}`).then((data) => data.json());

const createNotificationId = (notification) => notification.activeTill.toString();

const NotificationPanel = ({ isOpen, onClose, anchorRef, setNewMessages }) => {
  const classes = useStyles();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    getNotifications()
      .then((data = []) => {
        const lastSeen = JSON.parse(localStorage.getItem('data-driven-forms-last-seen') || '[]');
        setNewMessages(data.filter((notification) => !lastSeen.includes(createNotificationId(notification))).length);
        localStorage.setItem('data-driven-forms-last-seen', JSON.stringify(data.map(createNotificationId)));
        setNotifications(data);
      })
      .catch(() => {
        setNotifications([]);
      });
  }, [setNewMessages]);

  return (
    <Popper id="notifications-popup" open={isOpen} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal role={undefined}>
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Grow in={isOpen} {...TransitionProps}>
            <Paper className={classes.paper}>
              <List className={classes.list}>
                {notifications.map((message, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start" className={classes.listItem}>
                      {message['created-at'] && <ListItemText secondary={new Date(message['created-at']).toDateString()} />}
                      <ListItemText
                        primary={message.title}
                        secondary={<Markdown options={options}>{message.content}</Markdown>}
                        secondaryTypographyProps={{ color: 'textPrimary', component: 'div' }}
                      />
                    </ListItem>
                    {index < notifications.length - 1 ? <Divider variant="middle" /> : null}
                  </React.Fragment>
                ))}
                {notifications.length === 0 && (
                  <ListItem alignItems="flex-start" className={classes.listItem}>
                    <ListItemText
                      secondary={<Markdown options={options}>No notifications</Markdown>}
                      secondaryTypographyProps={{ color: 'textPrimary', component: 'div' }}
                    />
                  </ListItem>
                )}
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
  setNewMessages: PropTypes.func.isRequired,
  anchorRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]).isRequired
};

export default NotificationPanel;
