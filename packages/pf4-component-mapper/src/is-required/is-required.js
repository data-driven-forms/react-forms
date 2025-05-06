import React from 'react';

const IsRequired = ({ children }) => (
  <React.Fragment>
    {children}
    <span className="pf-c-form__label-required" aria-hidden="true">
      *
    </span>
  </React.Fragment>
);

export default IsRequired;
