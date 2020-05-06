import React from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';
import FormGroup from '../common/form-group';
import { Badge, Grid, GridItem } from '@patternfly/react-core';

import './slider.scss';

const Slider = (props) => {
  const { label, isRequired, helperText, meta, description, input, isReadOnly, isDisabled, id, ...rest } = useFieldApi(props);

  return (
    <FormGroup label={label} isRequired={isRequired} helperText={helperText} meta={meta} description={description} id={id || input.name}>
      <Grid gutter="md">
        <GridItem span={10}>
          <input
            className={'ddorg__pf4-component-mapper__dual-list-slider-input '}
            {...rest}
            {...input}
            type="range"
            disabled={isDisabled || isReadOnly}
          />
        </GridItem>
        <GridItem span={2}>
          <Badge isRead>{input.value || rest.max / 2}</Badge>
        </GridItem>
      </Grid>
    </FormGroup>
  );
};

Slider.propTypes = {
  label: PropTypes.node,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  description: PropTypes.node,
  isDisabled: PropTypes.bool,
  id: PropTypes.string
};

export default Slider;
