import React, { useState } from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Highlight, { defaultProps } from 'prism-react-renderer/';
import ghTheme from 'prism-react-renderer/themes/github';
import vsTheme from 'prism-react-renderer/themes/vsDark';
import Select from '@material-ui/core/Select';
import tranformImports from './transform-imports';

const useStyles = makeStyles({
  pre: {
    maxWidth: '100vw',
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

const useStylesCode = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: (props) => (props.inExample ? '100%' : 'calc(100vw - 64px)')
    }
  },
  switchwrapper: {
    right: 0,
    position: 'absolute'
  },
  select: {
    fontSize: 'inherit',
    color: 'white',
    '& option': {
      color: 'black'
    },
    '& svg': {
      color: 'white'
    },
    '&:before': {
      display: 'none'
    }
  },
  emptyLine: {
    // additional line added to snippets on mobile, so the select dont block the code
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 24,
      display: 'block'
    }
  }
}));

const CodeEditor = ({ value, children, className, switchable, inExample, ...props }) => {
  const [env, setEnv] = useState('cjs');
  const classes = useStylesCode({ inExample });

  const lang = className ? className.toLowerCase().replace('language-', '') : undefined;
  let content = value || children || '';
  content = content.substring(0, content.length - 1);

  // read props from code in --- { "key": value } ---\n format
  let propsFromMD = content.match(/--- .* ---/);
  if (propsFromMD) {
    propsFromMD = JSON.parse(propsFromMD[0].replace(/-/g, ''));
    content = content.replace(/--- .* ---\n/, '');
  }

  propsFromMD = propsFromMD || {};
  const isSwitchable = switchable && propsFromMD.switchable !== false;
  const hasSwitcher = isSwitchable && content.match(/import.*data-driven-forms\/(\w*|\d*|-)*('|"|`|’)/);

  if (isSwitchable && env !== 'umd') {
    content = tranformImports(content, env);
  }

  return (
    <div className={classes.wrapper}>
      {hasSwitcher && (
        <div className={classes.switchwrapper}>
          <Select
            native
            value={env}
            onChange={(e) => setEnv(e.target.value)}
            label="Environment"
            inputProps={{
              name: 'env'
            }}
            className={classes.select}
          >
            <option value="cjs">CJS</option>
            <option value="esm">ESM</option>
            <option value="umd">UMD</option>
          </Select>
        </div>
      )}
      <Highlight {...defaultProps} theme={lang === 'bash' ? ghTheme : vsTheme} code={content} language={lang || 'jsx'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            <React.Fragment>
              {hasSwitcher && <pre className={classes.emptyLine} />}
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </React.Fragment>
          </Pre>
        )}
      </Highlight>
    </div>
  );
};

CodeEditor.propTypes = {
  value: PropTypes.string,
  children: PropTypes.string,
  className: PropTypes.string,
  switchable: PropTypes.bool,
  inExample: PropTypes.bool
};

export default CodeEditor;
