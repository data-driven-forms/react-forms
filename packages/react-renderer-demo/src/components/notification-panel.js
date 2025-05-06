import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Markdown from 'markdown-to-jsx';

import MdxComponents from './mdx/mdx-components';

const PREFIX = 'NotificationPanel';

const classes = {
  paper: `${PREFIX}-paper`,
  list: `${PREFIX}-list`,
  listItem: `${PREFIX}-listItem`,
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  [`& .${classes.paper}`]: {
    transformOrigin: 'top right',
  },

  [`& .${classes.list}`]: {
    maxWidth: theme.spacing(40),
    maxHeight: theme.spacing(40),
    overflow: 'auto',
  },

  [`& .${classes.listItem}`]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const options = {
  overrides: {
    a: {
      component: MdxComponents.a,
    },
  },
};

const getNotifications = () => fetch(`/notifications?end=${Date.now()}`).then((data) => data.json());

const createNotificationId = (notification) => notification.activeTill.toString();

const NotificationPanel = ({ isOpen, onClose, anchorRef, setNewMessages }) => {
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
    <StyledPopper
      id="notifications-popup"
      open={isOpen}
      anchorEl={anchorRef.current}
      placement="bottom-end"
      transition
      disablePortal
      role={undefined}
    >
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
    </StyledPopper>
  );
};

export default NotificationPanel;
