import React from 'react';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';
import AceEditor from 'react-ace';
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

const renderers = {
  paragraph: ({ children }) => <Typography variant="body1" gutterBottom>{ children }</Typography>,
  code: ({ value, language }) =>
    <div style={{ background: '#272822', paddingTop: 5, paddingBottom: 5, marginTop: 10, marginBottom: 10 }}>
      <AceEditor
        readOnly
        mode={ typeof language === 'string' ? language.toLowerCase() : 'jsx' }
        theme="monokai"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={ value }
        fontSize={ 14 }
        maxLines={ Infinity }
        showPrintMargin={ false }
        showGutter={ true }
        highlightActiveLine={ false }
        style={{ width: '80%', margin: 10 }}
        setOptions={{
          showLineNumbers: true,
        }}
        onLoad={ (editor) => {
          editor.getSession().setUseWorker(false);
        } }
      />
    </div>,
  link: ({ href, children }) => <Link href={ href }>{ children }</Link>,
  heading: ({ level, children }) => <React.Fragment>
    <a id={ headerToId(children[0].props.value) } />
    <Typography variant={ `h${level + 2}` } style={{ marginBottom: 10, marginTop: 10 }}><ShareButton text={ headerToId(children[0].props.value) }/>{ children }</Typography>
  </React.Fragment>,
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
