/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

import { query } from './find-connected-links';
import useMapperLink from '../../hooks/use-mapper-link';
import clsx from 'clsx';
import DocLink from '../common/doc-link';

const StyledListItem = styled(ListItem)(() => ({
  '&.item': {
    padding: '8px 16px !important',
    justifyContent: 'flex-start !important',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '0.875rem',
  },
  '&.nested': {
    padding: '8px 16px 8px 32px !important',
  },
}));

const Item = ({ href, linkText, component, divider, level }) => {
  const router = useRouter();
  const link = useMapperLink(href.replace('/?', '?'));

  const queryMapper = router.query.mapper ? `?mapper=${router.query.mapper}` : '';
  const finalHref = queryMapper && link.match(query) ? `${link.replace(query, '')}${queryMapper}` : link;

  return (
    <StyledListItem
      divider={divider}
      button
      selected={href.replace(query, '') === router.asPath.replace(query, '')}
      key={href || linkText}
      className={clsx('item', {
        nested: level > 0,
      })}
      component={forwardRef((props, ref) => (
        <DocLink key={component} ref={ref} style={{ color: 'rgba(0, 0, 0, 0.87)' }} {...props} href={finalHref} />
      ))}
    >
      <Typography variant="button" gutterBottom style={{ textTransform: 'capitalize', fontWeight: 'initial' }}>
        {linkText}
      </Typography>
    </StyledListItem>
  );
};

const StyledList = styled(List)(() => ({
  '& .listItem': {
    padding: '8px 16px 8px 16px !important',
    justifyContent: 'flex-start !important',
  },
  '& .listItemText': {
    '&>span': {
      fontSize: 14,
    },
  },
}));

const FinalList = ({ title, level, link, fields, previousLinks = [], renderItems, openable = true, open = false, chip }) => {
  const [isOpen, setIsOpen] = useState(openable ? open : true);

  const closeNav = () => setIsOpen((state) => !state);

  return (
    <StyledList key={title} component="nav">
      {title && (
        <ListItem button onClick={openable ? closeNav : null} className={'listItem'}>
          <ListItemText primary={title} className={'listItemText'} />
          {chip && <Chip label={chip} size="small" color="warning" variant="outlined" />}
          {openable ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItem>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {renderItems(fields, level + 1, [...previousLinks, link])}
        </List>
      </Collapse>
    </StyledList>
  );
};

const StyledSubHeader = styled(ListSubheader)(({ theme }) => ({
  '&.subHeader': {
    color: theme.palette.text.primary,
    paddingLeft: 24,
  },
}));

const SubHeader = ({ title }) => <StyledSubHeader className={'subHeader'}>{title}</StyledSubHeader>;

const Mapper = {
  Wrapper: FinalList,
  Item,
  SubHeader,
};

export default Mapper;
