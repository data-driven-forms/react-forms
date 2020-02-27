import React, { createRef } from 'react';
import { Overlay } from 'patternfly-react';
import PropTypes from 'prop-types';
import PickerInput from './picker-input';
import PopoverRoot from './popover-root';
import { createDisabledDays } from './helpers';

import 'react-day-picker/lib/style.css';

const getPlaceholder = (variant, placeholder) =>
  placeholder ? placeholder : variant === 'date' ? 'Click in this input to select date' : 'Click in this input to select date and time';

const selectValidDate = (newDate, disabledDays) => {
  const { after, before } = disabledDays.find((item) => typeof item === 'object' && !(item instanceof Date)) || {};
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
      selectedDay: this.createDate(),
      selectingMonth: false,
      selectingYear: false,
      isOpen: false
    };
    this.wrapperRef = createRef();
  }

  componentDidMount() {
    this.setState({
      positionLeft: this.wrapperRef.current.getBoundingClientRect().x
    });
  }

  createDate = () => (this.props.value ? (typeof this.props.value === 'string' ? new Date(this.props.value) : this.props.value) : undefined);

  handleOverlayToggle = (isOpen) => this.setState({ isOpen });

  handleDayChange = (day) => {
    const prevDate = this.createDate();
    const newDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      day.getDate(),
      (prevDate && prevDate.getHours()) || new Date().getHours(),
      (prevDate && prevDate.getMinutes()) || new Date().getMinutes()
    );
    this.setState({
      isOpen: this.props.closeOnDaySelect
    });
    return this.props.onChange(newDate);
  };

  handleYearChange = (year) => {
    const prevDate = this.createDate();
    const newDate = selectValidDate(
      new Date(year, prevDate.getMonth(), prevDate.getDate(), prevDate.getHours(), prevDate.getMinutes()),
      this.props.disabledDays
    );
    return this.props.onChange(newDate);
  };

  handleMonthChange = (month) => {
    const prevDate = this.createDate();
    const newDate = selectValidDate(
      new Date(prevDate.getFullYear(), month, prevDate.getDate(), prevDate.getHours(), prevDate.getMinutes()),
      this.props.disabledDays
    );
    return this.props.onChange(newDate);
  };

  toggleSelectingMonth = (selectingMonth) => this.setState({ selectingMonth });

  toggleSelectingYear = (selectingYear) => this.setState({ selectingYear });

  handleChangeHours = (hours) => {
    const prevDate = this.createDate() || new Date();
    prevDate.setHours(hours);
    return this.props.onChange(new Date(prevDate));
  };

  handleChangeMinutes = (minutes) => {
    const prevDate = this.createDate() || new Date();
    prevDate.setMinutes(minutes);
    return this.props.onChange(new Date(prevDate));
  };

  clearValue = () => this.props.onChange(undefined);

  render() {
    const { isOpen, selectingYear, selectingMonth } = this.state;
    const { placeholder, variant, locale, todayButtonLabel, showTodayButton, isDisabled, disabledDays, isClearable, inputFormat } = this.props;
    const value = this.createDate();
    const inputPlaceholder = getPlaceholder(variant, placeholder);
    const cleanDisabledDays = createDisabledDays(disabledDays);
    return (
      <div style={{ position: 'relative' }} ref={this.wrapperRef}>
        <PickerInput
          handleOverlayToggle={this.handleOverlayToggle}
          placeholder={inputPlaceholder}
          selectedDay={value}
          variant={variant}
          locale={locale}
          isDisabled={isDisabled}
          isClearable={isClearable}
          clearValue={this.clearValue}
          inputFormat={inputFormat}
        />
        <Overlay
          show={isOpen}
          onHide={() => this.handleOverlayToggle(false)}
          rootClose
          placement="bottom"
          target={this.wrapperRef.current}
          container={this}
        >
          <PopoverRoot
            onDayClick={this.handleDayChange}
            selectedDay={value}
            toggleSelectingMonth={this.toggleSelectingMonth}
            toggleSelectingYear={this.toggleSelectingYear}
            selectingYear={selectingYear}
            selectingMonth={selectingMonth}
            yearChange={this.handleYearChange}
            monthChange={this.handleMonthChange}
            variant={variant}
            onHourChange={this.handleChangeHours}
            onMinuteChange={this.handleChangeMinutes}
            locale={locale}
            todayButtonLabel={todayButtonLabel}
            showTodayButton={showTodayButton}
            disabledDays={cleanDisabledDays}
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
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  closeOnDaySelect: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  isClearable: PropTypes.bool,
  inputFormat: PropTypes.string
};

DateTimePicker.defaultProps = {
  variant: 'date',
  locale: 'en',
  showTodayButton: true,
  todayButtonLabel: 'Today',
  closeOnDaySelect: false,
  isDisabled: false,
  disabledDays: [{}],
  isClearable: false
};
