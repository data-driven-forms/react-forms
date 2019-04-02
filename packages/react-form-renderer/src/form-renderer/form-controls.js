import React from 'react';
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
  onSubmit,
  onCancel,
  onReset,
  submitLabel,
  cancelLabel,
  resetLabel,
  pristine,
  canReset,
  disableSubmit,
  buttonOrder,
  buttonClassName,
}) => (
  <RendererContext.Consumer>
    { ({ layoutMapper: { Col, FormGroup, Button, ButtonGroup }}) => {
      const buttons = {
        submit: <Button key="form-submit" type="button" variant="primary" disabled={ disableSubmit } onClick={ onSubmit } label={ submitLabel } />,
        reset: canReset ? <Button key="form-reset" type="button" disabled={ pristine } onClick={ onReset } label={ resetLabel } /> : null,
        cancel: onCancel ? <Button key="form-cancel" type="button" onClick={ onCancel } label={ cancelLabel } /> : null,
      };
      return (
        <Col xs={ 12 } className={ buttonClassName }>
          <FormGroup>
            <ButtonGroup>
              { completeButtons(buttonOrder).map(button => buttons[button]) }
            </ButtonGroup>
          </FormGroup>
        </Col>
      );} }
  </RendererContext.Consumer>
);

FormControls.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  onReset: PropTypes.func,
  submitLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  resetLabel: PropTypes.string,
  pristine: PropTypes.bool,
  canReset: PropTypes.bool,
  disableSubmit: PropTypes.bool,
  buttonOrder: PropTypes.arrayOf(PropTypes.string),
  buttonClassName: PropTypes.string,
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
