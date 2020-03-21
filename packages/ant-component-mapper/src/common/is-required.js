import React from 'react';
import { childrenPropTypes } from '@data-driven-forms/common/src/prop-types-templates';

const styles = {
  color: '#ff4d4f',
  marginRight: '4px'
};

const IsRequired = ({ children }) => (
  <React.Fragment>
    <span style={styles} aria-hidden="true">
      *
    </span>
    {children}
  </React.Fragment>
);

IsRequired.propTypes = {
  children: childrenPropTypes
};

export default IsRequired;
