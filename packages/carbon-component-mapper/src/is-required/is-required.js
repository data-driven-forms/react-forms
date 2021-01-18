import React from 'react';
import { childrenPropTypes } from '@data-driven-forms/common/prop-types-templates';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  isRequired: {
    color: '#E0182D',
    marginRight: 4
  }
});

const IsRequired = ({ children }) => {
  const { isRequired } = useStyles();

  return (
    <React.Fragment>
      <span className={`ddorg__carbon-component-mapper_is-required ${isRequired}`} aria-hidden="true">
        *
      </span>
      {children}
    </React.Fragment>
  );
};

IsRequired.propTypes = {
  children: childrenPropTypes
};

export default IsRequired;
