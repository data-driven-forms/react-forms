import React from 'react';
import ReactMarkdown from 'react-markdown';
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
import { headerToId } from '../helpers/list-of-content';
import ShareButton from './share-button';
import { makeStyles } from '@material-ui/core/styles';

import CodeEditor from '../component/code-editor';

// TO DO remove all react-markdown occurances with mdx

const useHeadingStyles = makeStyles(() => ({
  anchorOffset: {
    position: 'relative',
    top: -92, // compensate for fixed header size and spacing
  },
  heading: {
    marginBottom: 10,
    marginTop: 10,
    '& button': {
      visibility: 'hidden',
    },
    '&:hover button': {
      visibility: 'initial',
    },
  },
}));

const renderers = {
  paragraph: ({ children }) => <Typography variant="body1" gutterBottom>{ children }</Typography>,
  code: ({ value, language }) => (
    <div style={{ background: '#1d1f21', paddingTop: 5, paddingBottom: 5, marginTop: 10, marginBottom: 10 }}>
      <CodeEditor language={ language } value={ value }/>
    </div>
  ),
  link: ({ href, children }) => <Link href={ href }>{ children }</Link>,
  heading: ({ level, children }) => {
    const classes = useHeadingStyles();
    return (
      <React.Fragment>
        <a id={ headerToId(children[0].props.value) } className={ classes.anchorOffset } />
        <Typography className={ classes.heading } variant={ `h${level + 2}` }>{ children }<ShareButton text={ headerToId(children[0].props.value) }/></Typography>
      </React.Fragment>
    );
  },
  list: ({ children }) => <List>{ children }</List>,
  listItem: ({ children }) =>
    <ListItem>
      <ListItemText
        primary={ children }
      />
    </ListItem>,
  table: ({ children }) =>
    <Paper style={{ marginBottom: 10, marginTop: 10 }}>
      <Table>{ children }</Table>
    </Paper>,
  tableBody: ({ children }) =>  <TableBody>{ children }</TableBody>,
  tableHead: ({ children }) =>  <TableHead>{ children }</TableHead>,
  tableRow: ({ children }) =>  <TableRow>{ children }</TableRow>,
  tableCell: ({ children }) =>  <TableCell>{ children }</TableCell>,
  inlineCode: ({ children }) => <code style={{ background: 'white', borderRadius: 3, fontFamily: 'courier, monospace', padding: '3px'  }}>
    { children }
  </code>,
};

export default ({ source }) => <ReactMarkdown escapeHtml={ false } source={ source } renderers={ renderers } />;
