import React, { ElementType } from 'react';
import { useFormApi, FormSpy, AnyObject } from '@data-driven-forms/react-form-renderer';

// Define local interface until FormTemplateRenderProps is exported
interface FormTemplateRenderProps extends AnyObject {
  formFields: React.ReactNode[];
  schema: {
    title?: string;
    description?: string;
    label?: string;
  };
}

export interface FormTemplateCommonProps extends FormTemplateRenderProps {
    FormWrapper?: ElementType;
    Title?: ElementType;
    Description?: ElementType;
    Button?: ElementType;
    ButtonGroup?: ElementType;
    formWrapperProps?: AnyObject;
    showFormControls?: boolean;
    disableSubmit?: string[];
    Header?: ElementType;
    headerProps?: AnyObject;
    titleProps?: AnyObject;
    descriptionProps?: AnyObject;
    buttonGroupProps?: AnyObject;
    buttonsProps?: AnyObject;
    alertProps?: AnyObject;
    BeforeError?: ElementType;
}

interface FormControlsProps {
  onCancel?: ((values: Record<string, any>, ...args: any[]) => void) | (() => void);
  onReset?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  resetLabel?: string;
  canReset?: boolean;
  disableSubmit?: boolean;
  buttonOrder?: string[];
  buttonClassName?: string;
  FormButtons?: ElementType;
  Button?: ElementType;
  ButtonGroup?: ElementType;
  formSpyProps?: AnyObject;
  buttonsProps?: AnyObject;
  buttonGroupProps?: AnyObject;
}

export const isDisabled = (disableStates: string[], getState: () => AnyObject): boolean =>
  disableStates.map((item) => getState()[item]).find((item) => !!item);

export const completeButtons = (buttonOrder: string[]): string[] => {
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

export const FormControls: React.FC<FormControlsProps> = ({
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
  formSpyProps = {},
  buttonsProps = {},
  buttonGroupProps,
}) => {
  if (FormButtons) {
    return <FormButtons />;
  }

  const { submitting, pristine, validating } = formSpyProps;
  const { submit, reset, cancel } = buttonsProps;

  const buttons: Record<string, React.ReactNode> = {
    submit: Button ? (
      <Button
        key="form-submit"
        type="submit"
        variant="primary"
        buttonType="submit"
        disabled={submitting || validating || disableSubmit}
        label={submitLabel}
        {...submit}
      />
    ) : null,
    reset: canReset && Button ? (
      <Button key="form-reset" type="button" buttonType="reset" disabled={pristine} onClick={onReset} label={resetLabel} {...reset} />
    ) : null,
    cancel: onCancel && Button ? <Button key="form-cancel" type="button" buttonType="cancel" onClick={onCancel} label={cancelLabel} {...cancel} /> : null,
  };

  if (!ButtonGroup) {
    return null;
  }

  return (
    <ButtonGroup {...buttonGroupProps} {...(buttonClassName && { className: buttonClassName })}>
      {completeButtons(buttonOrder).map((button) => buttons[button])}
    </ButtonGroup>
  );
};

const FormTemplate: React.FC<FormTemplateCommonProps> = ({
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
  schema,
  formFields,
  ...rest
}) => {
  const { title, description, label } = schema;
  const { onReset, onCancel, getState, handleSubmit } = useFormApi();

  if (!FormWrapper) {
    return null;
  }

  return (
    <FormWrapper onSubmit={handleSubmit} {...formWrapperProps}>
      {(title || label || description) && (
        <Header {...headerProps}>
          {(title || label) && Title && <Title {...titleProps}>{title || label}</Title>}
          {description && Description && <Description {...descriptionProps}>{description}</Description>}
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
          {(formSpyProps: AnyObject) => (
            <FormControls
              Button={Button}
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
