import React from 'react';

interface IsRequiredProps {
  children: React.ReactNode;
}

const IsRequired: React.FC<IsRequiredProps> = ({ children }) => (
  <React.Fragment>
    {children}
    <span className="pf-c-form__label-required" aria-hidden="true">
      *
    </span>
  </React.Fragment>
);

export default IsRequired;
