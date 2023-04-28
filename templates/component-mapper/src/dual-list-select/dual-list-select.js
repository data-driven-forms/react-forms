import React from 'react';
import PropTypes from 'prop-types';
import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';

const DualListSelectInner = ({
  leftValues,
  handleOptionsClick,
  rightValues,
  handleValuesClick,
  handleMoveRight,
  handleClearLeftValues,
  handleMoveLeft,
  handleClearRightValues,
  state
}) => (
  <div>
    <div>Available</div>
    <div>
      {leftValues.map((value) => (
        <div
          key={value.value}
          onClick={(e) => handleOptionsClick(e, value.value)}
          style={{ ...(state.selectedLeftValues.includes(value.value) && { color: 'red' }) }}
        >
          {value.label}
        </div>
      ))}
    </div>
    <button onClick={handleMoveRight}>Add</button>
    <button onClick={handleClearLeftValues}>Add all</button>
    <button onClick={handleMoveLeft}>Remove</button>
    <button onClick={handleClearRightValues}>Remove all</button>
    <div>Selected</div>
    <div>
      {rightValues.map((value) => (
        <div
          key={value.value}
          onClick={(e) => handleValuesClick(e, value.value)}
          style={{ ...(state.selectedRightValues.includes(value.value) && { color: 'red' }) }}
        >
          {value.label}
        </div>
      ))}
    </div>
  </div>
);

DualListSelectInner.propTypes = {
  leftValues: PropTypes.array,
  handleOptionsClick: PropTypes.func,
  rightValues: PropTypes.array,
  handleValuesClick: PropTypes.func,
  handleMoveRight: PropTypes.func,
  handleClearLeftValues: PropTypes.func,
  handleMoveLeft: PropTypes.func,
  handleClearRightValues: PropTypes.func,
  state: PropTypes.object
};

const DualListSelect = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelectInner} />;

export default DualListSelect;
