import React from 'react';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';

import './is-required.css';

const IsRequired = ({ children }) => (
  <React.Fragment>
    <span className="ddorg__ant-component-mapper_is-required" aria-hidden="true">
      *
    </span>
    {children}
  </React.Fragment>
);

IsRequired.propTypes = {
  children: childrenPropTypes
};

export default IsRequired;
