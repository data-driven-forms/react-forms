import React, { createRef } from 'react';
import { Overlay } from 'patternfly-react';
import PropTypes from 'prop-types';
import PickerInput from './picker-input';
import PopoverRoot from './popover-root';

const selectValidDate = (newDate, disabledDays) => {
  const { after, before } = disabledDays.find(item => typeof item === 'object' && !(item instanceof Date)) || {};
  if (before && newDate < before) {
    newDate = before;
  }

  if (after && newDate > after) {
    newDate = after;
  }

  return newDate;
};

export class DateTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLeft: 0,
      selectedDay: props.value,
      selectingMonth: false,
      selectingYear: false,
      isOpen: false,
    };
    this.wrapperRef = createRef();
  }

  componentDidMount() {
    this.setState({
      positionLeft: this.wrapperRef.current.getBoundingClientRect().x,
    });
  }

  handleOverlayToggle = isOpen => this.setState({ isOpen })

  handleDayChange = day => this.setState(prevProps => ({
    selectedDay: new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      prevProps.selectedDay && prevProps.selectedDay.getHours() || new Date().getHours(),
      prevProps.selectedDay && prevProps.selectedDay.getMinutes() || new Date().getMinutes()
    ),
    isOpen: !this.props.closeOnDaySelect,
  }), () => this.props.onChange(this.state.selectedDay));

  handleYearChange = year => this.setState(({ selectedDay = new Date() }) => ({
    selectedDay: selectValidDate(new Date(
      year,
      selectedDay.getMonth(),
      selectedDay.getDate(),
      selectedDay.getHours(),
      selectedDay.getMinutes()
    ), this.props.disabledDays),
  }), () => this.props.onChange(this.state.selectedDay))

  handleMonthChange = month => this.setState(({ selectedDay = new Date() }) => ({
    selectedDay: selectValidDate(new Date(
      selectedDay.getFullYear(),
      month,
      selectedDay.getDate(),
      selectedDay.getHours(),
      selectedDay.getMinutes()
    ), this.props.disabledDays),
  }), () => this.props.onChange(this.state.selectedDay));

  toggleSelectingMonth = selectingMonth => this.setState({ selectingMonth })

  toggleSelectingYear = selectingYear => this.setState({ selectingYear })

  handleChangeHours = hours => this.setState(({ selectedDay = new Date() }) => ({
    selectedDay: new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      selectedDay.getDate(),
      hours,
      selectedDay.getMinutes()
    ),
  }), () => this.props.onChange(this.state.selectedDay))

  handleChangeMinutes = minutes => this.setState(({ selectedDay = new Date() }) => ({
    selectedDay: new Date(
      selectedDay.getFullYear(),
      selectedDay.getMonth(),
      selectedDay.getDate(),
      selectedDay.getHours(),
      minutes
    ),
  }), () => this.props.onChange(this.state.selectedDay))

  render() {
    const { isOpen, selectedDay, selectingYear, selectingMonth } = this.state;
    const {
      placeholder,
      variant,
      locale,
      todayButtonLabel,
      showTodayButton,
      isDisabled,
      disabledDays,
    } = this.props;
    return (
      <div style={{ position: 'relative' }} ref={ this.wrapperRef } >
        <PickerInput
          handleOverlayToggle={ this.handleOverlayToggle }
          placeholder={ placeholder }
          selectedDay={ selectedDay }
          variant={ variant }
          locale={ locale }
          isDisabled={ isDisabled }
        />
        <Overlay
          show={ isOpen }
          onHide={ () => this.handleOverlayToggle(false) }
          rootClose
          placement="bottom"
          target={ this.wrapperRef.current }
          container={ this }
        >
          <PopoverRoot
            onDayClick={ this.handleDayChange }
            selectedDay={ selectedDay }
            toggleSelectingMonth={ this.toggleSelectingMonth }
            toggleSelectingYear={ this.toggleSelectingYear }
            selectingYear={ selectingYear }
            selectingMonth={ selectingMonth }
            yearChange={ this.handleYearChange }
            monthChange={ this.handleMonthChange }
            variant={ variant }
            onHourChange={ this.handleChangeHours }
            onMinuteChange={ this.handleChangeMinutes }
            locale={ locale }
            todayButtonLabel={ todayButtonLabel }
            showTodayButton={ showTodayButton }
            disabledDays={ disabledDays }
          />
        </Overlay>
      </div>
    );
  }
}

DateTimePicker.propTypes = {
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  locale: PropTypes.string,
  todayButtonLabel: PropTypes.string,
  showTodayButton: PropTypes.bool,
  isDisabled: PropTypes.bool,
  disabledDays: PropTypes.array,
  value: PropTypes.instanceOf(Date),
  closeOnDaySelect: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

DateTimePicker.defaultProps = {
  variant: 'date',
  locale: 'en',
  placeholder: 'Click in this input to select date',
  showTodayButton: true,
  todayButtonLabel: 'Today',
  closeOnDaySelect: false,
  isDisabled: false,
  disabledDays: [{}],
};

