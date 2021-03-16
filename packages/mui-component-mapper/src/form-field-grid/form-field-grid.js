import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledGrid = styled(Grid)({position: 'relative'});

const FormFieldGrid = React.forwardRef(
  function RefRenderFn(props, ref) {
    const { children, ...rest } = props;
    
    return (
      <StyledGrid ref={ref} item xs={12} {...rest}>
        {children}
      </StyledGrid>
    );
  }
);

FormFieldGrid.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default FormFieldGrid;

export const withFormFieldGrid = (WrappedComponent) => {
  const WithFormFieldGrid = forwardRef(
    function  RefRenderFn(props, ref) {
      const { GridItemProps, ...rest } = props;
      return (
        <FormFieldGrid {...GridItemProps}>
          <WrappedComponent {...rest}/>
        </FormFieldGrid>
      )
    }
  );
  WithFormFieldGrid.displayName = `WithFormFieldGrid(${getDisplayName(WrappedComponent)})`;
  WithFormFieldGrid.propTypes = {
    GridItemProps: PropTypes.object
  };
  return WithFormFieldGrid;
};

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
