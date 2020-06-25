import React from 'react';
import { childrenPropTypes } from '@data-driven-forms/common/src/prop-types-templates';
import './style.scss';

const IsRequired = ({ children }) => (
  <React.Fragment>
    <span className="styles" aria-hidden="true">
      *
    </span>
    {children}
  </React.Fragment>
);

IsRequired.propTypes = {
  children: childrenPropTypes
};

export default IsRequired;
