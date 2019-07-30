import React from 'react';
import PropTypes from 'prop-types';

const MultiValueContainer = (props) => (
  <div
    className={ `${props.className} ddorg__pf4-component-mapper__select__multivalue--container` }
    title={ props.data && props.data.label }
  >
    <span>
      { !Array.isArray(props.children) ? props.children : props.children[0] }
    </span>
    <span className="ddorg__pf4-component-mapper__select__multivalue--remove">
      { props.children[1] }
    </span>
  </div>
);

MultiValueContainer.propTypes = {
  children: PropTypes.oneOfType([ PropTypes.node, PropTypes.arrayOf(PropTypes.node) ]).isRequired,
  data: PropTypes.shape({ label: PropTypes.string.isRequired }).isRequired,
  className: PropTypes.string,
};

MultiValueContainer.defaultProps = {
  className: '',
};

export default MultiValueContainer;
