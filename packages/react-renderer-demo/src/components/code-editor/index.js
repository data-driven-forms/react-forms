import React from 'react';
import { styled } from '@mui/material/styles';
import { Highlight, defaultProps, themes } from 'prism-react-renderer';
import tranformImports from './transform-imports';
import clsx from 'clsx';

const StyledPre = styled('pre')({
  '&.pre': {
    maxWidth: '100vw',
    textAlign: 'left',
    margin: '1em 0',
    padding: '1em',
    overflow: 'auto',
    borderRadius: 4,
    fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace',
    '& .token-line': {
      lineHeight: '1.5em',
      height: '1.5em',
    },
  },
});

const Pre = ({ children, ...props }) => (
  <StyledPre {...props} className={'pre'}>
    {children}
  </StyledPre>
);

const Root = styled('div')(({ theme }) => ({
  '&.wrapper': {
    position: 'relative',
    maxWidth: '100%',
    [theme.breakpoints.down('md')]: {
      maxWidth: (props) => (props.inExample ? '100%' : 'calc(100vw - 64px)'),
    },
  },
}));

const CodeEditor = ({ value, children, className, inExample, editorClassname, keepLastLine }) => {
  const lang = (className || children?.props?.className || '').toLowerCase().replace('language-', '');
  let content = value || children?.props?.value || children?.props?.children || '';

  // read props from code in --- { "key": value } ---\n format
  let propsFromMD = content.match(/--- .* ---/);
  if (propsFromMD) {
    propsFromMD = JSON.parse(propsFromMD[0].replace(/-/g, ''));
    content = content.replace(/--- .* ---\n/, '');
  }

  if (propsFromMD?.switchable !== false) {
    content = tranformImports(content);
  }

  content = keepLastLine ? content : content.substring(0, content.length - 1);

  return (
    <Root className={clsx('wrapper', editorClassname)}>
      <Highlight {...defaultProps} theme={lang === 'bash' ? themes.github : themes.vsDark} code={content} language={lang || 'jsx'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            <React.Fragment>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })} key={i}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} key={key} />
                  ))}
                </div>
              ))}
            </React.Fragment>
          </Pre>
        )}
      </Highlight>
    </Root>
  );
};

export default CodeEditor;
