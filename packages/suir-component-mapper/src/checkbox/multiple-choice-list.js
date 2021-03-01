import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/multiple-choice-list';
import { FormCheckbox, Header, FormField } from 'semantic-ui-react';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

import { validationError } from '../common/helpers';
import FormFieldGrid from '../form-field-grid/form-field-grid';

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
  const {
    FormFieldGridProps,
    FormFieldProps,
    HelperTextProps,
    OptionsListProps: { className: optionsClassName, ...OptionsListProps },
    HeaderProps: { className: headerClassname, ...HeaderProps }
  } = useContext(CheckboxContext);
  return (
    <FormFieldGrid helperText={helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormField
        {...FormFieldProps}
        {...(invalid && {
          error: {
            content: meta.error || meta.submitError,
            pointing: 'left'
          }
        })}
        label={
          <Header
            {...HeaderProps}
            className={clsx(headerClassname, { [classes.header]: true, [classes.error]: invalid, [classes.required]: isRequired })}
          >
            {label}
          </Header>
        }
      />
      <div {...OptionsListProps} className={clsx(classes.items, optionsClassName)}>
        {children}
      </div>
    </FormFieldGrid>
  );
};

Wrapper.propTypes = {
  ...wrapperProps
};

const MultipleChoiceList = ({ FormFieldGridProps, FormFieldProps, HeaderProps, OptionsListProps, HelperTextProps, ...props }) => (
  <CheckboxContext.Provider value={{ props, FormFieldGridProps, FormFieldProps, HeaderProps, OptionsListProps, HelperTextProps }}>
    <MultipleChoiceListCommon {...props} Wrapper={Wrapper} Checkbox={FinalCheckbox} />
  </CheckboxContext.Provider>
);

MultipleChoiceList.propTypes = {
  FormFieldGridProps: PropTypes.object,
  FormFieldProps: PropTypes.object,
  HeaderProps: PropTypes.object,
  OptionsListProps: PropTypes.object,
  HelperTextProps: PropTypes.object
};

MultipleChoiceList.defaultProps = {
  FormFieldGridProps: {},
  FormFieldProps: {},
  HeaderProps: {},
  OptionsListProps: {},
  HelperTextProps: {}
};

export default MultipleChoiceList;
