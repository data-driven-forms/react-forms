import React from 'react';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';

const IsRequired = ({ children }) => (
  <React.Fragment>
    {children}
    <span className="pf-c-form__label-required" aria-hidden="true">
      *
    </span>
  </React.Fragment>
);

IsRequired.propTypes = {
  children: childrenPropTypes
};

export default IsRequired;
