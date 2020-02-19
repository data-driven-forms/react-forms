import React from 'react';
import PropTypes from 'prop-types';

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

  return Array.from(new Set(expectedOrder));
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
  formSpyProps
}) => {
  if (FormButtons) {
    return <FormButtons {...formSpyProps} />;
  }

  const {
    submitting,
    pristine,
    validating,
    form: { reset },
    values
  } = formSpyProps;

  const buttons = {
    submit: <Button key="form-submit" type="submit" variant="primary" disabled={submitting || validating || disableSubmit} label={submitLabel} />,
    reset: canReset ? (
      <Button
        key="form-reset"
        type="button"
        disabled={pristine}
        onClick={() => {
          if (canReset) {
            onReset && onReset();
            reset();
          }
        }}
        label={resetLabel}
      />
    ) : null,
    cancel: onCancel ? <Button key="form-cancel" type="button" onClick={() => onCancel(values)} label={cancelLabel} /> : null
  };

  return <ButtonGroup className={buttonClassName}>{completeButtons(buttonOrder).map((button) => buttons[button])}</ButtonGroup>;
};

FormControls.propTypes = {
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  resetLabel: PropTypes.string,
  canReset: PropTypes.bool,
  disableSubmit: PropTypes.bool,
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
  FormButtons: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  FormSpy: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  Button: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func]),
  ButtonGroup: PropTypes.oneOfType([PropTypes.node, PropTypes.element, PropTypes.func])
};

FormControls.defaultProps = {
  submitLabel: 'Submit',
  cancelLabel: 'Cancel',
  resetLabel: 'Reset',
  canReset: false,
  canSubmit: false,
  buttonOrder: ['submit', 'reset', 'cancel']
};

const formTemplate = ({
  FormWrapper,
  Title,
  Description,
  Button,
  ButtonGroup,
  formWrapperProps,
  showFormControls = true,
  disableSubmit = [],
  ...options
}) => ({ schema: { title, description, label }, formFields, FormSpy, formOptions }) => (
  <FormWrapper onSubmit={formOptions.handleSubmit} {...formWrapperProps}>
    {title || (label && <Title>{title || label}</Title>)}
    {description && <Description>{description}</Description>}
    {formFields}
    {showFormControls && (
      <FormSpy>
        {(formSpyProps) => (
          <FormControls
            Button={Button}
            FormSpy={FormSpy}
            ButtonGroup={ButtonGroup}
            onReset={formOptions.onReset}
            onCancel={formOptions.onCancel}
            disableSubmit={isDisabled(disableSubmit, formOptions.getState)}
            formSpyProps={formSpyProps}
            {...options}
          />
        )}
      </FormSpy>
    )}
  </FormWrapper>
);

export default formTemplate;
