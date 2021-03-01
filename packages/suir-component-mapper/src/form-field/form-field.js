import React from 'react';
import { FormField as SuirFormField } from 'semantic-ui-react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    margin: '1em 0 0.25em 0 !important'
  }
});

const FormField = ({ className, ...props }) => {
  const classes = useStyles();
  return <SuirFormField className={clsx(classes.root, className)} {...props} />;
};

FormField.propTypes = SuirFormField.propTypes;

export default FormField;
