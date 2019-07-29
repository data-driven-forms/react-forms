import React from 'react';
import { FormSpy } from 'react-final-form';
import PropTypes from 'prop-types';
import { __ } from '../global-functions';
import RendererContext from './renderer-context';

const completeButtons = buttonOrder => {
  const expectedOrder = [ ...buttonOrder ];
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

const FormControls = ({
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
}) => (
  <FormSpy>
    { formSpyProps => FormButtons
      ? <FormButtons { ...formSpyProps } />
      : (
        <RendererContext.Consumer>
          { ({ layoutMapper: { Button, ButtonGroup }}) => {
            const { submitting, pristine, validating, form: { submit, reset }} = formSpyProps;
            const buttons = {
              submit: (
                <Button
                  key="form-submit"
                  type="button"
                  variant="primary"
                  disabled={ submitting || validating || disableSubmit }
                  onClick={ submit }
                  label={ submitLabel }
                />
              ),
              reset: canReset ? (
                <Button
                  key="form-reset"
                  type="button"
                  disabled={ pristine }
                  onClick={ () => {
                    if (canReset) {
                      onReset && onReset();
                      reset();
                    }
                  } }
                  label={ resetLabel }
                />
              ) : null,
              cancel: onCancel ? <Button key="form-cancel" type="button" onClick={ onCancel } label={ cancelLabel } /> : null,
            };
            return (
              <ButtonGroup className={ buttonClassName }>
                { completeButtons(buttonOrder).map(button => buttons[button]) }
              </ButtonGroup>
            );} }
        </RendererContext.Consumer>
      ) }
  </FormSpy>
);

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
  FormButtons: PropTypes.oneOfType([ PropTypes.node, PropTypes.element, PropTypes.func ]),
  handleSubmit: PropTypes.func.isRequired,
};

FormControls.defaultProps = {
  submitLabel: __('Submit'),
  cancelLabel: __('Cancel'),
  resetLabel: __('Reset'),
  canReset: false,
  canSubmit: false,
  buttonOrder: [ 'submit', 'reset', 'cancel' ],
};

export default FormControls;
