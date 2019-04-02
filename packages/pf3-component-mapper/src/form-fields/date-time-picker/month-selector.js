import React from 'react';
import PropTypes from 'prop-types';
import MomentLocaleUtils from 'react-day-picker/moment';
import Navbar from './navbar';
import { computeTextWidth } from '../../helpers/html-helper';
import './date-picker-styles.scss';

const LABEL_PADDING = 14;

const checkDisabledMonth = (after, before, selectable, selectedDay) => {
  let afterMonth;
  let beforeMonth;
  if (after) {
    afterMonth = new Date(selectedDay);
    afterMonth.setMonth(selectable);
    if (afterMonth > after && after.getMonth() !== afterMonth.getMonth()) {
      return true;
    }

  }

  if (before) {
    beforeMonth = new Date(selectedDay);
    beforeMonth.setMonth(selectable);
    if (beforeMonth < before && before.getMonth() !== beforeMonth.getMonth()) {
      return true;
    }
  }
};

const disableNextClick = (after, isYear, selectedDay = new Date()) => {
  if (isYear && after) {
    return selectedDay >= after || selectedDay.getFullYear() >= after.getFullYear();
  }
};

const disablePrevClick = (before, isYear, selectedDay = new Date()) => {
  if (isYear && before) {
    return selectedDay <= before || selectedDay.getFullYear() <= before.getFullYear();
  }
};

const renderMonthBody = (monthChange, selectedMonth, locale, disabledDays, selectedDay = new Date()) => {
  const rows = [];
  const months = MomentLocaleUtils.getMonths(locale);
  const maxLength = computeTextWidth(months.reduce((prev, curr) => curr.length > prev.length ? curr : prev, ''));
  for (let i = 0; i < 4; i++) {
    rows.push([ ...months.slice(i * 3, i * 3 + 3) ]);
  }

  const { after, before } = disabledDays.find(item => typeof item === 'object' && !(item instanceof Date)) || {};
  return rows.map((row, index) => (
    <tr key={ `month-row-${index}` }>
      { row.map((cell, monthIndex) => (
        <td key={ `months-cell-${cell}` } style={{ width: maxLength + LABEL_PADDING }}>
          <button
            className={ `${selectedMonth === index * 3 + monthIndex ? 'selected' : ''} ${checkDisabledMonth(after, before, index * 3 + monthIndex, selectedDay) ? 'disabled' : ''}` }
            disabled={ checkDisabledMonth(after, before, index * 3 + monthIndex, selectedDay) }
            onClick={ () => {
              monthChange(index * 3 + monthIndex);
            } }>
            { cell }
          </button>
        </td>
      )) }
    </tr>
  ));
};

const MonthSelector = ({
  monthChange,
  toggleSelectingMonth,
  selectingMonth,
  toggleSelectingYear,
  selectedDay,
  locale,
  onNextClick,
  onPreviousClick,
  disabledDays,
}) => {
  const { after, before } = disabledDays.find(item => typeof item === 'object' && !(item instanceof Date)) || {};
  return (
    <div className="DayPicker">
      <div className="DayPicker-wrapper" tabIndex="0">
        <Navbar
          disableNext={ disableNextClick(after, selectingMonth, selectedDay) }
          disablePrev={ disablePrevClick(before, selectingMonth, selectedDay) }
          onNextClick={ onNextClick }
          onPreviousClick={ onPreviousClick }
          month={ selectedDay || new Date() }
          isYear={ selectingMonth }
          toggleSelectingYear={ toggleSelectingYear }
          disabledDays={ disabledDays }
        />
        <table className="pf3-datetime-months-table">
          <tbody>
            { renderMonthBody(month => {
              monthChange(month);
              toggleSelectingMonth(false);
            },  selectedDay && selectedDay.getMonth(),
            locale,
            disabledDays,
            selectedDay
            ) }
          </tbody>
        </table>
      </div>
    </div>
  );};

MonthSelector.propTypes = {
  monthChange: PropTypes.func.isRequired,
  toggleSelectingMonth: PropTypes.func.isRequired,
  selectingMonth: PropTypes.bool,
  toggleSelectingYear: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  onNextClick: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  disabledDays: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.shape({
      after: PropTypes.instanceOf(Date),
      before: PropTypes.instanceOf(Date),
    }),
  ])),
};

MonthSelector.defaultProps = {
  disabledDays: [],
};

export default MonthSelector;
