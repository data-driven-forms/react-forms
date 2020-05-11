import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    margin: '1em 0 0.25em 0 !important'
  }
});

const FormField = ({ className, ...props }) => {
  const classes = useStyles();
  return <Form.Field className={clsx(classes.root, className)} {...props} />;
};

FormField.propTypes = {
  className: PropTypes.string
};

export default FormField;
