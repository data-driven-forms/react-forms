import React from 'react';

import './is-required.css';

const IsRequired = ({ children }) => (
  <React.Fragment>
    <span className="ddorg__ant-component-mapper_is-required" aria-hidden="true">
      *
    </span>
    {children}
  </React.Fragment>
);

export default IsRequired;
