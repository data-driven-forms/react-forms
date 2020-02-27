import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';

class ValueContainer extends Component {
  state = {
    showAll: false
  };
  render() {
    const { isMulti, ...props } = this.props;
    const { showAll } = this.state;
    if (isMulti && props.children) {
      return (
        <div className="ddorg__pf4-component-mapper__select__value--container">
          {showAll ? props.children[0] : props.children[0] && props.children[0][0] ? props.children[0][0] : props.children[0]}
          {props.children[0] && props.children[0].length > 1 && (
            <Button
              className="ddorg__pf4-component-mapper__select__value--container-chipgroup"
              onClick={() => this.setState(({ showAll }) => ({ showAll: !showAll }))}
              variant="plain"
            >
              <span>{showAll ? props.selectProps.showLessLabel : `${props.children[0].length - 1} ${props.selectProps.showMoreLabel}`}</span>
            </Button>
          )}
          {Array.isArray(props.children) ? props.children[1] && props.children[1] : props.children}
        </div>
      );
    }

    return props.children;
  }
}

ValueContainer.propTypes = {
  isMulti: PropTypes.bool,
  getStyles: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
  selectProps: PropTypes.shape({
    showLessLabel: PropTypes.string,
    showMoreLabel: PropTypes.string
  })
};

ValueContainer.defaultProps = {
  isMulti: false,
  selectProps: {
    showLessLabel: 'Show less',
    showMoreLabel: 'more'
  }
};

export default ValueContainer;
