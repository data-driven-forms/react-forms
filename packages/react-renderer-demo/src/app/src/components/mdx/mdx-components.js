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

import dynamic from 'next/dynamic';
const CodeEditor = dynamic(import('../code-editor'), {
  ssr: false,
});

const useHeadingStyles = makeStyles(() => ({
  anchorOffset: {
    position: 'relative',
    top: -92, // compensate for fixed header size and spacing
    display: 'block',
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

const Heading = ({ level, children, variant, component, ...rest }) => {
  const classes = useHeadingStyles();
  const id = headerToId(children);
  return (
    <React.Fragment>
      <a id={ id } className={ classes.anchorOffset } data-mdlink="md-heading" />
      <Typography
        id={ `heading-${id}` }
        className={ classes.heading }
        variant={ `h${level}` }
        component={ component }
      >
        { children }
        <ShareButton text={ id }/>
      </Typography>
    </React.Fragment>
  );
};

const MdxComponents = {
  p: ({ children }) => <Typography variant="body1" gutterBottom>{ children }</Typography>,
  code: ({ children, lang, ...rest }) => (
    <div style={{ background: '#1d1f21', paddingTop: 5, paddingBottom: 5, marginTop: 10, marginBottom: 10 }}>
      <CodeEditor
        readOnly
        mode={ typeof lang === 'string' ? lang.toLowerCase() : 'jsx' }
        theme="tomorrow_night"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={ children }
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
    </div>),
  link: ({ href, children }) => <Link href={ href }>{ children }</Link>,
  h1: props => <Heading { ...props } level={ 4 } component="h1"/>,
  h2: props => <Heading { ...props } level={ 5 } component="h2"/>,
  h3: props => <Heading { ...props } level={ 6 } component="h3"/>,
  h4: props => <Heading { ...props } level={ 6 } component="h4"/>,
  h5: props => <Heading { ...props } level={ 6 } component="h5"/>,
  h6: props => <Heading { ...props } level={ 6 } component="h6"/>,
  ul: ({ children }) => <List>{ children }</List>,
  li: ({ children }) =>
    <ListItem>
      <ListItemText
        primary={ children }
      />
    </ListItem>,
  table: ({ children }) => (
    <Paper style={{ marginBottom: 10, marginTop: 10 }}>
      <Table>
        <TableHead>
          { children[0].props.children }
        </TableHead>
        <TableBody>
          { children[1].props.children }
        </TableBody>
      </Table>
    </Paper>
  ),
  tr: ({ children }) =>  <TableRow>{ children }</TableRow>,
  td: ({ children }) =>  <TableCell>{ children }</TableCell>,
  th: ({ children }) =>  <TableCell>{ children }</TableCell>,
  inlineCode: ({ children }) => <code style={{ background: 'white', borderRadius: 3, fontFamily: 'courier, monospace', padding: '3px'  }}>
    { children }
  </code>,
};

export default MdxComponents;
