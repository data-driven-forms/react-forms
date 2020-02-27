import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import './switch-field.scss';
import { computeTextWidth } from '../helpers/html-helper';

export const DIVIDER_SIZE = 34;
export const COMBINED_MARGIN = 12;
export const TEXT_PADDING = 1;

export const computeLabelWidth = (text) => {
  return computeTextWidth(text, ['pf3-switch']) + TEXT_PADDING;
};

export const createLabelStyles = (labelWidth, isLeft = true) => {
  let width = COMBINED_MARGIN + labelWidth;
  let left = isLeft ? -width : DIVIDER_SIZE;
  return {
    width,
    left
  };
};

export const createTransform = (labelWidth, isChecked, isOffText = false) => {
  let dividerSize = isOffText ? DIVIDER_SIZE : 0;
  let width = COMBINED_MARGIN + labelWidth + dividerSize;
  return isChecked
    ? {
        WebkitTransform: `translateX(${width}px)`,
        msTransform: `translateX(${width}px)`,
        transform: `translateX(${width}px)`
      }
    : {};
};

const Switch = ({ onText, offText, disabled, isReadOnly, bsSize, ...props }) => {
  const { handleSubmit } = useFormApi();
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(Math.max(computeLabelWidth(onText), computeLabelWidth(offText), DIVIDER_SIZE));
  }, [onText, offText]);

  return (
    <div>
      <label
        className={`pf3-switch${disabled || isReadOnly ? ' disabled' : ''}${bsSize === 'mini' || bsSize === 'mn' ? ' mini' : ''}`}
        style={{ width: labelWidth + DIVIDER_SIZE + COMBINED_MARGIN }}
        tabIndex={disabled || isReadOnly ? -1 : 0}
        onKeyDown={(e) => {
          const SPACEBAR_CODE = 32;
          const ENTER_CODE = 13;
          if (e.keyCode === SPACEBAR_CODE) {
            e.preventDefault();
            props.onChange({ target: { checked: !props.checked } });
          } else if (e.keyCode === ENTER_CODE) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      >
        <input type="checkbox" {...props} disabled={disabled || isReadOnly} />
        <span className={`pf3-switch-slider${props.checked ? ' checked' : ''}`}>
          <span
            className="on-text"
            style={{
              ...createLabelStyles(labelWidth),
              ...createTransform(labelWidth, props.checked)
            }}
          >
            {onText}
          </span>
          <span className="divider" style={createTransform(labelWidth, props.checked)} />
          <span
            className="off-text"
            style={{
              ...createLabelStyles(labelWidth, false),
              ...createTransform(labelWidth, props.checked, true)
            }}
          >
            {offText}
          </span>
        </span>
      </label>
    </div>
  );
};

Switch.propTypes = {
  onText: PropTypes.string,
  offText: PropTypes.string,
  disabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  onChange: PropTypes.func.isRequired,
  bsSize: PropTypes.oneOf(['mn', 'mini'])
};

Switch.defaultProps = {
  onText: 'ON',
  offText: 'OFF'
};

export default Switch;
