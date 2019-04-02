import React from 'react';
import PropTypes from 'prop-types';
import './switch-field.scss';
import { computeTextWidth } from '../helpers/html-helper';

export const DIVIDER_SIZE = 34;
export const COMBINED_MARGIN = 12;
export const TEXT_PADDING = 1;

export const computeLabelWidth = text => {
  return computeTextWidth(text, [ 'pf3-switch' ]) + TEXT_PADDING;
};

export const createLabelStyles = (labelWidth, isLeft = true) => {
  let width = COMBINED_MARGIN + labelWidth;
  let left = isLeft ? -width : DIVIDER_SIZE;
  return ({
    width,
    left,
  });
};

export const createTransform = (labelWidth, isChecked, isOffText = false) => {
  let dividerSize = isOffText ? DIVIDER_SIZE : 0;
  let width = COMBINED_MARGIN + labelWidth + dividerSize;
  return isChecked ? {
    WebkitTransform: `translateX(${width}px)`,
    msTransform: `translateX(${width}px)`,
    transform: `translateX(${width}px)`,
  } : {};
};

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: Math.max(computeLabelWidth(this.props.onText), computeLabelWidth(this.props.offText), DIVIDER_SIZE),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.offText !== this.props.offText || prevProps.onText !== this.props.onText){
      this.setState({
        labelWidth: Math.max(computeLabelWidth(this.props.onText), computeLabelWidth(this.props.offText), DIVIDER_SIZE),
      });
    }
  }

  render() {
    const { onText, offText, disabled, isReadOnly, bsSize, ...props } = this.props;
    return (
      <label
        className={ `pf3-switch${disabled || isReadOnly ? ' disabled' : ''}${bsSize === 'mini' || bsSize === 'mn' ? ' mini' : ''}` }
        style={{ width: this.state.labelWidth + DIVIDER_SIZE + COMBINED_MARGIN }}
      >
        <input type="checkbox" { ...props } disabled={ disabled || isReadOnly } />
        <span className={ `pf3-switch-slider${props.checked ? ' checked' : ''}` }>
          <span
            className="on-text"
            style={{
              ...createLabelStyles(this.state.labelWidth),
              ...createTransform(this.state.labelWidth, props.checked),
            }}
          >
            { onText }
          </span>
          <span className="divider" style={ createTransform(this.state.labelWidth, props.checked) }/>
          <span
            className="off-text"
            style={{
              ...createLabelStyles(this.state.labelWidth, false),
              ...createTransform(this.state.labelWidth, props.checked, true),
            }}
          >
            { offText }
          </span>
        </span>
      </label>
    );
  }
}

Switch.propTypes = {
  onText: PropTypes.string,
  offText: PropTypes.string,
  disabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  checked: PropTypes.oneOfType([ PropTypes.bool, PropTypes.string ]),
  onChange: PropTypes.func.isRequired,
  bsSize: PropTypes.oneOf([ 'mn', 'mini' ]),
};

Switch.defaultProps = {
  onText: 'ON',
  offText: 'OFF',
};

export default Switch;
