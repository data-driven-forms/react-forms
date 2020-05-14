import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Highlight, { defaultProps } from 'prism-react-renderer/';
import ghTheme from 'prism-react-renderer/themes/github';
import vsTheme from 'prism-react-renderer/themes/vsDark';

const useStyles = makeStyles({
  pre: {
    textAlign: 'left',
    margin: '1em 0',
    padding: '0.5em',
    overflow: 'auto',
    '& .token-line': {
      lineHeight: '1.3em',
      height: '1.3em'
    }
  }
});

const Pre = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <pre {...props} className={classes.pre}>
      {children}
    </pre>
  );
};

Pre.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)])
};

const CodeEditor = ({ value, children, className, ...props }) => {
  const lang = className ? className.toLowerCase().replace('language-', '') : undefined;
  let content = value || children || '';
  content = content.substring(0, content.length - 1);
  return (
    <Highlight {...defaultProps} theme={lang === 'bash' ? ghTheme : vsTheme} code={content} language={lang || 'jsx'}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </Pre>
      )}
    </Highlight>
  );
};

CodeEditor.propTypes = {
  value: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string
};

export default CodeEditor;
