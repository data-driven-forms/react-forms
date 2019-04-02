import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './date-picker-styles.scss';

const changeHour = (currentHour, increment = true) =>
  increment
    ? currentHour + 1 > 23 ? 0 : currentHour + 1
    : currentHour - 1 < 0 ? 23 : currentHour - 1;

const changeMinute = (currentMinute, increment = true) =>
  increment
    ? currentMinute + 1 > 59 ? 0 : currentMinute + 1
    : currentMinute - 1 < 0 ? 59 : currentMinute - 1;

const TimePicker = ({
  onHourChange,
  onMinuteChange,
  selectedDay,
}) => (
  <table className="time-picker-layout-wrapper">
    <tbody>
      <tr>
        <td className="chevron-button" onClick={ () => onHourChange(changeHour(selectedDay.getHours())) }>
          <Icon name="chevron-up" />
        </td>
        <td></td>
        <td className="chevron-button" onClick={ () => onMinuteChange(changeMinute(selectedDay.getMinutes())) }>
          <Icon name="chevron-up" />
        </td>
      </tr>
      <tr>
        <td>
          <span>
            <input
              className="time-picker-hours-input"
              onChange={ ({ target: { value }}) => {
                onHourChange(value);
              } }
              min={ 0 }
              max={ 23 }
              type="number"
              value={ ('0' + selectedDay.getHours()).slice(-2)  }
            />
          </span>
        </td>
        <td>:</td>
        <td>
          <span>
            <input
              className="time-picker-hours-input"
              onChange={ ({ target: { value }}) => {
                onMinuteChange(value);
              } }
              min={ 0 }
              max={ 59 }
              type="number"
              value={ ('0' + selectedDay.getMinutes()).slice(-2) }
            />
          </span>
        </td>
      </tr>
      <tr>
        <td className="chevron-button" onClick={ () => onHourChange(changeHour(selectedDay.getHours(), false)) }>
          <Icon name="chevron-down" />
        </td>
        <td></td>
        <td className="chevron-button" onClick={ () => onMinuteChange(changeMinute(selectedDay.getMinutes(), false)) }>
          <Icon name="chevron-down" />
        </td>
      </tr>
    </tbody>
  </table>
);

TimePicker.propTypes = {
  onHourChange: PropTypes.func.isRequired,
  onMinuteChange: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
};

export default TimePicker;
