/* eslint-disable react/prop-types */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { headerToId } from '../../helpers/list-of-contents';
import ShareButton from './share-button';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

import RouterLink from 'next/link';
import CodeEditor from '../code-editor';

const useHeadingStyles = makeStyles(() => ({
  anchor: {
    textDecoration: 'none',
    color: 'inherit',
    fontWeight: 'inherit'
  },
  heading: {
    '& button': {
      visibility: 'hidden'
    },
    '&:hover button': {
      visibility: 'initial'
    }
  },
  offset: {
    paddingTop: 92, // compensate for fixed header size and spacing
    marginTop: -92 // compensate for fixed header size and spacing
  },
  link: {
    fontWeight: 'initial'
  }
}));

export const Heading = ({ level, children, component }) => {
  const router = useRouter();
  const classes = useHeadingStyles();
  const id = headerToId(children);
  const path = `${router.asPath}#${id}`;
  return (
    <div id={id} className={classes.offset} data-scroll="true">
      <Typography id={`heading-${id}`} className={classes.heading} variant={`h${level}`} component={component}>
        <a href={path} className={classes.anchor} data-mdlink="md-heading">
          {children}
          <ShareButton path={path} />
        </a>
      </Typography>
    </div>
  );
};

const tableStyles = makeStyles((theme) => ({
  table: {
    [theme.breakpoints.down('sm')]: {
      tableLayout: 'fixed'
    }
  },
  cell: {
    [theme.breakpoints.down('sm')]: {
      overflow: 'overlay'
    }
  }
}));

const StyledCell = (props) => {
  const { cell } = tableStyles();

  return <TableCell {...props} className={cell} />;
};

const StyledTable = (props) => {
  const { table } = tableStyles();

  return <Table {...props} className={table} />;
};

const MdLink = ({ href, children }) => {
  const classes = useHeadingStyles();
  return href.startsWith('/') ? (
    <RouterLink href={href}>
      <Link href={href}>{children}</Link>
    </RouterLink>
  ) : (
    <Link className={classes.link} href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </Link>
  );
};

const MdxComponents = {
  p: ({ children }) => (
    <Typography variant="body1" gutterBottom>
      {children}
    </Typography>
  ),
  code: (props) => <CodeEditor {...props} switchable />,
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
    <code style={{ background: 'white', borderRadius: 3, fontFamily: 'courier, monospace', padding: '3px' }}>{children}</code>
  )
};

export default MdxComponents;
