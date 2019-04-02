import React from 'react';
import PropTypes from 'prop-types';
import Navbar from './navbar';
import MonthSelector from './month-selector';
import YearSelector from './year-selector';
import TimePicker from './time-picker';
import DayPicker from 'react-day-picker/DayPicker';
import MomentLocaleUtils from 'react-day-picker/moment';
import 'react-day-picker/lib/style.css';
import './date-picker-styles.scss';

const PopoverRoot = ({
  onDayClick,
  selectedDay,
  toggleSelectingMonth,
  toggleSelectingYear,
  handleMonthClick,
  selectingYear,
  selectingMonth,
  yearChange,
  monthChange,
  locale,
  variant,
  onHourChange,
  onMinuteChange,
  todayButtonLabel,
  showTodayButton,
  disabledDays,
}) => (
  <div className="pf3-calendar">
    <table className="calendar-layout-wrapper">
      <tbody>
        <tr>
          <td>
            { selectingYear ?
              <YearSelector
                selectedDay={ selectedDay }
                toggleSelectingYear={ toggleSelectingYear }
                yearChange={ yearChange }
                disabledDays={ disabledDays }
              />
              : selectingMonth
                ? (
                  <MonthSelector
                    selectingMonth={ selectingMonth }
                    selectedDay={ selectedDay }
                    disabledDays={ disabledDays }
                    monthChange={ data => {
                      monthChange(data);
                    } }
                    toggleSelectingMonth={ toggleSelectingMonth }
                    toggleSelectingYear={ toggleSelectingYear }
                    locale={ locale }
                    onNextClick={ () => yearChange(selectedDay ? selectedDay.getFullYear() + 1 : new Date().getFullYear() + 1) }
                    onPreviousClick={ () => yearChange(selectedDay ? selectedDay.getFullYear() - 1 : new Date().getFullYear() - 1) }
                  />)
                :
                <DayPicker
                  onDayClick={ onDayClick }
                  selectedDays={ selectedDay }
                  month={ selectedDay }
                  showOutsideDays
                  todayButton={ showTodayButton && todayButtonLabel }
                  locale={ locale }
                  localeUtils={ MomentLocaleUtils }
                  disabledDays={ disabledDays }
                  navbarElement={ props => (
                    <Navbar
                      { ...props }
                      onMonthClick={ toggleSelectingMonth }
                      monthChange={ handleMonthClick }
                    />
                  ) }
                /> }
          </td>
          { variant === 'date-time' && (
            <td>
              <div className="time-picker">
                <TimePicker
                  onHourChange={ hours => {
                    onHourChange(hours);
                  } }
                  onMinuteChange={ minutes => {
                    onMinuteChange(minutes);
                  } }
                  selectedDay={ selectedDay || new Date() }
                />
              </div>
            </td>
          ) }
        </tr>
      </tbody>
    </table>
  </div>
);

PopoverRoot.propTypes = {
  onDayClick: PropTypes.func.isRequired,
  selectedDay: PropTypes.instanceOf(Date),
  toggleSelectingMonth: PropTypes.func.isRequired,
  toggleSelectingYear: PropTypes.func.isRequired,
  handleMonthClick: PropTypes.func,
  selectingYear: PropTypes.bool,
  selectingMonth: PropTypes.bool,
  yearChange: PropTypes.func.isRequired,
  monthChange: PropTypes.func.isRequired,
  locale: PropTypes.string,
  variant: PropTypes.string,
  onHourChange: PropTypes.func.isRequired,
  onMinuteChange: PropTypes.func.isRequired,
  todayButtonLabel: PropTypes.string,
  showTodayButton: PropTypes.bool,
  disabledDays: PropTypes.array,
};

export default PopoverRoot;
