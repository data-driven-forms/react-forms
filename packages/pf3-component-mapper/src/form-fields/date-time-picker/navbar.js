import React from 'react';
import PropTypes from 'prop-types';
import MomentLocaleUtils from 'react-day-picker/moment';
import './date-picker-styles.scss';
import { NextInterval, PrevInterval } from './intervals';

const Navbar = ({ onNextClick, onPreviousClick, month, onMonthClick, isYear, toggleSelectingYear, locale, disablePrev, disableNext }) => (
  <table className="year-interval-header">
    <tbody>
      <tr>
        <PrevInterval className={ disablePrev ? 'disabled' : '' } onMouseDown={ () => !disablePrev && onPreviousClick() }/>
        <td>
          { isYear
            ? <button className="navbar-center-button" type="button" onClick={ () => toggleSelectingYear(true) }>{ month.getFullYear() }</button>
            : (
              <button
                className="navbar-center-button"
                onMouseDown={ () => onMonthClick(true) }
                type="button"
              >
                { MomentLocaleUtils.formatMonthTitle(month, locale) }
              </button>
            ) }
        </td>
        <NextInterval className={ disableNext ? 'disabled' : '' } onMouseDown={ () =>!disableNext &&  onNextClick() }/>
      </tr>
    </tbody>
  </table>
);

Navbar.propTypes = {
  onNextClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  month: PropTypes.instanceOf(Date),
  onMonthClick: PropTypes.func,
  isYear: PropTypes.bool,
  toggleSelectingYear: PropTypes.func,
  locale: PropTypes.string,
  disableNext: PropTypes.bool,
  disablePrev: PropTypes.bool,
};

export default Navbar;
