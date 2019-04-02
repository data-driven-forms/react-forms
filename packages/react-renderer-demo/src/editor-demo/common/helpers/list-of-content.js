import React from 'react';
import ReactMarkdown from '../md-helper';

export const headerToId = (header) => header.replace('### ', '').replace(/ |\?|:/g, '-').toLowerCase();

const subHeaders = (part) => {
  const regex = /^#### (.*)/gm;
  const found = part.match(regex);

  return found && found.map((header) => (
    <React.Fragment key={ header }>
      <ReactMarkdown source={ `&nbsp;&nbsp;&nbsp;&nbsp;[${header.replace('####', '')}](${headerToId(header)})` }/>
    </React.Fragment>
  ));
};

export default ({ text }) => {
  const regex = /^### .*/gm;
  const found = text.match(regex);
  const parts = text.split(/^### .*/gm);

  return <React.Fragment>
    <ReactMarkdown source={ 'Content:' }/>
    { found.map((header, index) => (
      <React.Fragment key={ header }>
        <ReactMarkdown source={ `&nbsp;&nbsp;[${header.replace('###', '')}](#${headerToId(header)})` }/>
        { subHeaders(parts[index + 1]) }
      </React.Fragment>
    )) }
    <hr/>
  </React.Fragment>;
};

