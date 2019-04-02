import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Icon, Form } from 'patternfly-react';
import MomentLocaleUtils from 'react-day-picker/moment';
import './date-picker-styles.scss';

const PickerInput = ({ variant, selectedDay, locale, handleOverlayToggle, isDisabled, ...props }) =>(
  <Form.InputGroup style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }} disabled={ isDisabled }>
    <FormControl
      readOnly={ true }
      { ...props }
      value={ selectedDay ? MomentLocaleUtils.formatDate(selectedDay, variant === 'date-time' ? 'LLL' : 'L', locale) : '' }
      type="text"
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        backgroundColor: 'white',
        color: 'black',
      }}
      onClick={ () => handleOverlayToggle(true) }
      className="picker-input"
      disabled={ isDisabled }
    />
    <Form.InputGroup.Addon disabled={ isDisabled } onClick={ () => handleOverlayToggle(true) }>
      <Icon name={ variant === 'time' ? 'time' : 'calendar' } />
    </Form.InputGroup.Addon>
  </Form.InputGroup >
);

PickerInput.propTypes = {
  variant: PropTypes.oneOf([ 'date-time', 'date', 'time' ]),
  selectedDay: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  handleOverlayToggle: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool,
};

export default PickerInput;
