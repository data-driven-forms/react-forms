import React from 'react';
import { Icon } from 'patternfly-react';
import PropTypes from 'prop-types';
import './date-picker-styles.scss';

const YearIntervalSelector = ({ currentInterval, prevInterval, nextInterval }) => (
  <table className="year-interval-header">
    <tbody>
      <tr>
        <td  onClick={ prevInterval }>
          <Icon name="angle-left"><span>Prev interval</span></Icon>
        </td>
        <td>
          <button className="year-interval-button" disabled>{ `${currentInterval[0]} - ${currentInterval[1]}` }</button>
        </td>
        <td onClick={ nextInterval }>
          <Icon name="angle-right" ><span>Next interval</span></Icon>
        </td>
      </tr>
    </tbody>
  </table>
);

YearIntervalSelector.propTypes = {
  currentInterval: PropTypes.arrayOf(PropTypes.number).isRequired,
  prevInterval: PropTypes.func.isRequired,
  nextInterval: PropTypes.func.isRequired,
};

const checkDisableYear = (after, before, year) => {
  if (after) {
    const afterYear = after.getFullYear();
    if (year > afterYear) {
      return true;
    }

  }

  if (before) {
    const beforeYear = before.getFullYear();
    if (year < beforeYear) {
      return true;
    }
  }
};

const renderYearsBody = (startingYear, yearClick, currentYear, disabledDays) => {
  const rows = [];
  for (let i = 0; i < 4; i++) {
    rows.push([ 0, 1, 2, 3, 4 ]);
  }

  const { after, before } = disabledDays.find(item => typeof item === 'object' && !(item instanceof Date)) || {};
  return rows.map((row, index) => (
    <tr key={ `year-row-${index}` }>
      { row.map(year => (
        <td key={ `year-cell-${year}` } className={ checkDisableYear(after, before, startingYear + index * 5 + year) ? 'disabled' : '' }>
          <button
            disabled={ checkDisableYear(after, before, startingYear + index * 5 + year) }
            className={ startingYear + index * 5 + year === currentYear ? 'selected' : '' }
            onClick={ () => yearClick(startingYear + index * 5 + year) }
          >
            { startingYear + index * 5 + year }
          </button>
        </td>
      )) }
    </tr>
  ));
};

class YearSelector  extends React.Component {
  constructor(props) {
    super(props);
    let initialYear = new Date().getFullYear();
    this.state = {
      initialYear,
      firstInterval: [ initialYear - 19, initialYear ],
      currentInterval: [ initialYear - 19, initialYear ],
    };
  }
  handleNextInterval = () => this.setState(({ currentInterval }) => ({ currentInterval: [ currentInterval[1] + 1, currentInterval[1] + 20 ]}))

  handlePrevInterval = () => this.setState(({ currentInterval }) => ({ currentInterval: [ currentInterval[0] - 20, currentInterval[0] - 1 ]}))
  render() {
    const { toggleSelectingYear, yearChange, selectedDay, disabledDays } = this.props;
    const { currentInterval } = this.state;
    const years = [];
    for (let year = currentInterval[0]; year < currentInterval[1]; year++) {
      years.push(year);
    }

    return (
      <div className="DayPicker">
        <div className="DayPicker-wrapper" tabIndex="0">
          <div>
            <YearIntervalSelector
              prevInterval={ this.handlePrevInterval }
              nextInterval={ this.handleNextInterval }
              currentInterval={ currentInterval }
            />
            <table className="pf3-datetime-months-table">
              <tbody>
                { renderYearsBody(currentInterval[0], year => {
                  yearChange(year);
                  toggleSelectingYear(false);
                }, selectedDay && selectedDay.getFullYear(), disabledDays) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

YearSelector.propTypes = {
  toggleSelectingYear: PropTypes.func,
  yearChange: PropTypes.func,
  selectedDay: PropTypes.instanceOf(Date),
  disabledDays: PropTypes.array,
};

YearSelector.defaultProps = {
  disabledDays: [],
};

export default YearSelector;
