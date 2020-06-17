import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@patternfly/react-core';

import './input.scss';

const Input = ({ inputRef, isSearchable, isDisabled, getInputProps, ...props }) => {
  return (
    <Fragment>
      <div className="pf-c-select__menu-search">
        <input
          autoFocus
          {...props}
          {...(!isSearchable && { tabIndex: '-1' })}
          className="pf-c-form-control pf-m-search"
          ref={inputRef}
          {...getInputProps({
            disabled: isDisabled
          })}
        />
      </div>
      <Divider />
    </Fragment>
  );
};

Input.propTypes = {};

export default Input;
