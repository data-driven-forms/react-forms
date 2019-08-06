import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export const headerToId = (header) => header.replace(/#/g, '').replace(/ /g, '').toLowerCase();

const useLinkStyles = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: 'calc(240px - 32px)',
    whiteSpace: 'nowrap',
    display: 'block',
  },
}));

const ListHeader = ({ text }) => {
  const classes = useLinkStyles();
  const level = (text.match(/#/g) || []).length;
  const labelText = text.replace(/#/g, '');
  return (
    <a
      className={ classes.link }
      href={ `${window.location.origin}${window.location.pathname}#${headerToId(text)}` }
      title={ labelText }
    >
      { [ ...new Array(level - 2) ].map((_v, index) => (
        <React.Fragment key={ index }>
          &nbsp;&nbsp;
        </React.Fragment>
      )) }{ labelText }
    </a>
  );
};

ListHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

const useStyles = makeStyles(theme => ({
  listItemText: {
    color: 'red',
  },
}));

const ListOfContents = ({ text }) => {
  const classes = useStyles();

  const regex = /^###?#? .*/gm;
  const found = text.match(regex);
  return (
    <Fragment>
      <Typography component="h3">Content</Typography>
      <List dense>
        { found.map(text =>(
          <ListItem key={ text }>
            <ListItemText
              className={ classes.listItemText }
              primary={ <ListHeader text={ text } /> }
            />
          </ListItem>
        )) }
      </List>
    </Fragment>
  );
};

ListOfContents.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ListOfContents;
