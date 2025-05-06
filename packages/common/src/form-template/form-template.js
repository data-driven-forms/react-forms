import React from 'react';
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
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  resetLabel = 'Reset',
  canReset = false,
  disableSubmit,
  buttonOrder = ['submit', 'reset', 'cancel'],
  buttonClassName,
  FormButtons,
  Button,
  ButtonGroup,
  formSpyProps,
  buttonsProps = {},
  buttonGroupProps,
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
    cancel: onCancel ? <Button key="form-cancel" type="button" buttonType="cancel" onClick={onCancel} label={cancelLabel} {...cancel} /> : null,
  };

  return (
    <ButtonGroup {...buttonGroupProps} {...(buttonClassName && { className: buttonClassName })}>
      {completeButtons(buttonOrder).map((button) => buttons[button])}
    </ButtonGroup>
  );
};

const FormTemplate = ({
  FormWrapper,
  Title,
  Description,
  Button,
  ButtonGroup,
  formWrapperProps,
  showFormControls = true,
  disableSubmit = [],
  Header = React.Fragment,
  headerProps,
  titleProps,
  descriptionProps,
  buttonGroupProps,
  buttonsProps,
  alertProps,
  BeforeError,
  ...rest
}) => {
  const {
    schema: { title, description, label },
    formFields,
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
      {BeforeError && (
        <FormSpy subscription={{ submitError: true, error: true }}>
          {() => {
            const state = getState();
            return <BeforeError formError={state.error || state.submitError} formSpyProps={state} alertProps={alertProps} />;
          }}
        </FormSpy>
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

export default FormTemplate;
