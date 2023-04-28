/* eslint-disable react/prop-types */
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { headerToId } from '../../helpers/list-of-contents';
import ShareButton from './share-button';
import { useRouter } from 'next/router';

import DocLink from '../common/doc-link';
import CodeEditor from '../code-editor';

const PREFIX = 'MdxComponents';

const classes = {
  anchor: `${PREFIX}-anchor`,
  heading: `${PREFIX}-heading`,
  offset: `${PREFIX}-offset`,
  link: `${PREFIX}-link`,
};

const Root = styled('code')(() => ({
  [`& .${classes.anchor}`]: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 'inherit',
  },

  [`& .${classes.heading}`]: {
    '& button': {
      visibility: 'hidden',
    },
    '&:hover button': {
      visibility: 'initial',
    },
  },

  [`& .${classes.offset}`]: {
    paddingTop: 92, // compensate for fixed header size and spacing
    marginTop: -92, // compensate for fixed header size and spacing
  },

  [`& .${classes.link}`]: {
    fontWeight: 'initial',
  },
}));

const StyledHeading = styled('div')(() => ({
  [`& .${classes.anchor}`]: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 'inherit',
  },

  [`& .${classes.heading}`]: {
    '& button': {
      visibility: 'hidden',
    },
    '&:hover button': {
      visibility: 'initial',
    },
  },

  [`& .${classes.offset}`]: {
    paddingTop: 92, // compensate for fixed header size and spacing
    marginTop: -92, // compensate for fixed header size and spacing
  },

  [`& .${classes.link}`]: {
    fontWeight: 'initial',
  },
}));

export const Heading = ({ level, children, component }) => {
  const router = useRouter();
  const id = headerToId(children);
  const path = `${router.asPath}#${id}`;
  return (
    <StyledHeading id={id} className={classes.offset} data-scroll="true">
      <Typography id={`heading-${id}`} className={classes.heading} variant={`h${level}`} component={component}>
        <a href={path} className={classes.anchor} data-mdlink="md-heading">
          {children}
          <ShareButton path={path} />
        </a>
      </Typography>
    </StyledHeading>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.cell': {
    [theme.breakpoints.down('md')]: {
      overflow: 'overlay',
    },
  },
}));

const StyledCell = (props) => <StyledTableCell {...props} className={'cell'} />;

const StyledTableComp = styled(Table)(({ theme }) => ({
  '&.table': {
    [theme.breakpoints.down('md')]: {
      tableLayout: 'fixed',
    },
  },
}));

const StyledTable = (props) => <StyledTableComp {...props} className={'table'} />;

const StyledLink = styled(Link)(() => ({
  '& .link': {
    fontWeight: 'initial',
  },
}));

const MdLink = ({ href, children }) =>
  href.startsWith('/') ? (
    <DocLink href={href} underline="hover">
      {children}
    </DocLink>
  ) : (
    <StyledLink underline="hover" className={'link'} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </StyledLink>
  );

const StyledDivider = styled(Divider)(() => ({
  '&.divider': {
    marginTop: 20,
    marginBottom: 15,
  },
}));

const MdDivider = (props) => <StyledDivider {...props} variant="middle" className={'divider'} />;

const MdxComponents = {
  p: ({ children }) => (
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  ),
  pre: (props) => <CodeEditor {...props} />,
  a: MdLink,
  h1: (props) => <Heading {...props} level={4} component="h1" />,
  h2: (props) => <Heading {...props} level={5} component="h2" />,
  h3: (props) => <Heading {...props} level={6} component="h3" />,
  h4: (props) => <Heading {...props} level={6} component="h4" />,
  h5: (props) => <Heading {...props} level={6} component="h5" />,
  h6: (props) => <Heading {...props} level={6} component="h6" />,
  ul: ({ children }) => <List>{children}</List>,
  li: ({ children }) => (
    <ListItem>
      <ListItemText primary={children} />
    </ListItem>
  ),
  table: ({ children }) => (
    <Paper style={{ marginBottom: 10, marginTop: 10 }} className="DocTable">
      <StyledTable>
        <TableHead>{children[0].props.children}</TableHead>
        <TableBody>{children[1].props.children}</TableBody>
      </StyledTable>
    </Paper>
  ),
  tr: ({ children }) => <TableRow>{children}</TableRow>,
  td: ({ children }) => <StyledCell>{children}</StyledCell>,
  th: ({ children }) => <StyledCell>{children}</StyledCell>,
  inlineCode: ({ children }) => (
    <Root style={{ background: 'white', borderRadius: 3, fontFamily: 'courier, monospace', padding: '3px' }}>{children}</Root>
  ),
  hr: MdDivider,
};

export default MdxComponents;
