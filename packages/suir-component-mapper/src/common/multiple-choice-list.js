import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import { FormCheckbox, Header, FormField } from 'semantic-ui-react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { validationError } from './helpers';
import FormFieldGrid from './form-field-grid';

const useStyles = createUseStyles({
  header: {
    marginBottom: '0 !important',
    display: 'inline',
    fontSize: '0.92857143em !important'
  },
  error: {
    color: '#9f3a38 !important'
  },
  items: {
    marginBottom: '1em'
  },
  required: {
    '&:after': {
      content: '"*"',
      margin: '-0.2em 0 0 0.2em',
      color: '#db2828'
    }
  }
});

const CheckboxContext = createContext({});

const FinalCheckbox = ({ label, isDisabled: _isDisabled, ...rest }) => {
  const {
    props: { isRequired, isReadOnly, helperText, validate, isDisabled, meta, ...props }
  } = useContext(CheckboxContext);
  return <FormCheckbox {...rest} {...props} disabled={isDisabled} label={label} />;
};

FinalCheckbox.propTypes = {
  isDisabled: PropTypes.bool,
  label: PropTypes.node
};

const Wrapper = ({ label, isRequired, children, meta, validateOnMount, helperText }) => {
  const invalid = validationError(meta, validateOnMount);
  const classes = useStyles();
  return (
    <FormFieldGrid helperText={helperText}>
      <FormField
        {...(invalid && {
          error: {
            content: meta.error,
            pointing: 'left'
          }
        })}
        label={<Header className={clsx({ [classes.header]: true, [classes.error]: invalid, [classes.required]: isRequired })}>{label}</Header>}
      />
      <div className={classes.items}>{children}</div>
    </FormFieldGrid>
  );
};

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = (props) => (
  <CheckboxContext.Provider value={{ props }}>
    <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

export default MultipleChoiceList;
