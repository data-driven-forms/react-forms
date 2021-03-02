import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi, FormSpy } from '@data-driven-forms/react-form-renderer';

export const isDisabled = (disableStates, getState) => disableStates.map((item) => getState()[item]).find((item) => !!item);

export const completeButtons = (buttonOrder) => {
  const expectedOrder = [...buttonOrder];
  if (!expectedOrder.includes('submit')) {
    expectedOrder.push('submit');
  }

  if (!expectedOrder.includes('reset')) {
    expectedOrder.push('reset');
  }

  if (!expectedOrder.includes('cancel')) {
    expectedOrder.push('cancel');
  }

  return expectedOrder;
};

export const FormControls = ({
  onCancel,
  onReset,
  submitLabel,
  cancelLabel,
  resetLabel,
  canReset,
  disableSubmit,
  buttonOrder,
  buttonClassName,
  FormButtons,
  Button,
  ButtonGroup,
  formSpyProps,
  buttonsProps,
  buttonGroupProps
}) => {
  if (FormButtons) {
    return <FormButtons />;
  }

  const { submitting, pristine, validating } = formSpyProps;
  const { submit, reset, cancel } = buttonsProps;

  const buttons = {
    submit: (
      <Button
        key="form-submit"
        type="submit"
        variant="primary"
        buttonType="submit"
        disabled={submitting || validating || disableSubmit}
        label={submitLabel}
        {...submit}
      />
    ),
    reset: canReset ? (
      <Button key="form-reset" type="button" buttonType="reset" disabled={pristine} onClick={onReset} label={resetLabel} {...reset} />
    ) : null,
    cancel: onCancel ? <Button key="form-cancel" type="button" buttonType="cancel" onClick={onCancel} label={cancelLabel} {...cancel} /> : null
  };

  return (
    <ButtonGroup {...buttonGroupProps} {...(buttonClassName && { className: buttonClassName })}>
      {completeButtons(buttonOrder).map((button) => buttons[button])}
    </ButtonGroup>
  );
};

FormControls.propTypes = {
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  submitLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  resetLabel: PropTypes.node,
  canReset: PropTypes.bool,
  disableSubmit: PropTypes.bool,
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
  FormButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  Button: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  ButtonGroup: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  formSpyProps: PropTypes.shape({
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    validating: PropTypes.bool,
    form: PropTypes.shape({
      reset: PropTypes.func
    }),
    values: PropTypes.object
  }),
  buttonGroupProps: PropTypes.object,
  buttonsProps: PropTypes.object
};

FormControls.defaultProps = {
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  resetLabel: 'Reset',
  canReset: false,
  canSubmit: false,
  buttonOrder: ['submit', 'reset', 'cancel'],
  buttonsProps: {}
};

const FormTemplate = ({
  FormWrapper,
  Title,
  Description,
  Button,
  ButtonGroup,
  formWrapperProps,
  showFormControls,
  disableSubmit,
  Header,
  headerProps,
  titleProps,
  descriptionProps,
  buttonGroupProps,
  buttonsProps,
  ...rest
}) => {
  const {
    schema: { title, description, label },
    formFields
  } = rest;
  const { onReset, onCancel, getState, handleSubmit } = useFormApi();

  return (
    <FormWrapper onSubmit={handleSubmit} {...formWrapperProps}>
      {(title || label || description) && (
        <Header {...headerProps}>
          {(title || label) && <Title {...titleProps}>{title || label}</Title>}
          {description && <Description {...descriptionProps}>{description}</Description>}
        </Header>
      )}
      {formFields}
      {showFormControls && (
        <FormSpy>
          {(formSpyProps) => (
            <FormControls
              Button={Button}
              FormSpy={FormSpy}
              buttonGroupProps={buttonGroupProps}
              buttonsProps={buttonsProps}
              ButtonGroup={ButtonGroup}
              onReset={onReset}
              onCancel={onCancel}
              disableSubmit={isDisabled(disableSubmit, getState)}
              formSpyProps={formSpyProps}
              {...rest}
            />
          )}
        </FormSpy>
      )}
    </FormWrapper>
  );
};

FormTemplate.propTypes = {
  FormWrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  Title: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  Description: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  Button: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  ButtonGroup: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
  formWrapperProps: PropTypes.object,
  showFormControls: PropTypes.bool,
  disableSubmit: PropTypes.arrayOf(PropTypes.string),
  Header: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element, PropTypes.oneOf([React.Fragment])]),
  headerProps: PropTypes.object,
  titleProps: PropTypes.object,
  descriptionProps: PropTypes.object,
  buttonGroupProps: PropTypes.object,
  buttonsProps: PropTypes.object
};

FormTemplate.defaultProps = {
  showFormControls: true,
  disableSubmit: [],
  Header: React.Fragment
};

export default FormTemplate;
