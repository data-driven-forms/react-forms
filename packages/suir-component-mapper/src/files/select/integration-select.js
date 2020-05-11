import React from 'react';
import PropTypes from 'prop-types';
import Select from '@data-driven-forms/common/src/select';

function IntegrationReactSelect(props) {
  const { invalid, ...rest } = props;

  return (
    <div>
      <label>{rest.label}</label>
      <Select error={!!invalid} {...rest} isDisabled={!!rest.isDisabled} />
      {(invalid || rest.helperText || rest.description) && <p>{invalid || rest.helperText || rest.description}</p>}
    </div>
  );
}

IntegrationReactSelect.propTypes = {
  invalid: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

export default IntegrationReactSelect;
