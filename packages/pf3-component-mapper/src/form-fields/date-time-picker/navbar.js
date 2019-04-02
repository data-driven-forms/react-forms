import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import MomentLocaleUtils from 'react-day-picker/moment';
import './date-picker-styles.scss';

const Navbar = ({ onNextClick, onPreviousClick, month, onMonthClick, isYear, toggleSelectingYear, locale, disablePrev, disableNext }) => (
  <table className="year-interval-header">
    <tbody>
      <tr>
        <td className={ disablePrev ? 'disabled' : '' } onMouseDown={ () => !disablePrev && onPreviousClick() }>
          <Icon name="angle-left"><span>Prev interval</span></Icon>
        </td>
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
        <td className={ disableNext ? 'disabled' : '' } onMouseDown={ () =>!disableNext &&  onNextClick() }>
          <Icon name="angle-right" ><span>Next interval</span></Icon>
        </td>
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
