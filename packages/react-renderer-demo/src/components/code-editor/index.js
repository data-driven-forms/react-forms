import React from 'react';
import PropTypes from 'prop-types';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/mode/json';
import 'brace/mode/sh';
import 'brace/snippets/json';
import 'brace/theme/tomorrow_night';

const CodeEditor = props => (
  <AceEditor
    readOnly
    mode={ typeof language === 'string' ? props.language && props.language.toLowerCase() : 'jsx' }
    theme="tomorrow_night"
    name="UNIQUE_ID_OF_DIV"
    editorProps={{ $blockScrolling: true }}
    fontSize={ 14 }
    maxLines={ Infinity }
    showPrintMargin={ false }
    showGutter={ true }
    highlightActiveLine={ false }
    style={{ width: '100%', paddingTop: 10 }}
    setOptions={{
      showLineNumbers: true,
    }}
    onLoad={ (editor) => {
      editor.getSession().setUseWorker(false);
    } }
    { ...props }
  />
);

CodeEditor.propTypes = {
  language: PropTypes.string,

};

export default CodeEditor;
