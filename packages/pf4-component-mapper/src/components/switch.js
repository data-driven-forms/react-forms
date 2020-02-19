import React from 'react';
import PropTypes from 'prop-types';
import FormGroup from '../common/form-group';
import { Switch as Pf4Switch } from '@patternfly/react-core/dist/js/components/Switch/Switch';

const SwitchGroup = ({ label, offText, onText, isRequired, helperText, meta, description, input, isReadOnly, isDisabled, id, ...rest }) => (
  <FormGroup isRequired={isRequired} helperText={helperText} meta={meta} description={description} hideLabel id={id || input.name}>
    <Pf4Switch
      {...rest}
      {...input}
      id={id || input.name}
      onChange={(element, state) => input.onChange(state)}
      isChecked={!!input.value}
      isDisabled={isDisabled || isReadOnly}
      label={onText || label}
      labelOff={offText || label}
    />
  </FormGroup>
);

SwitchGroup.propTypes = {
  label: PropTypes.string,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  helperText: PropTypes.string,
  meta: PropTypes.object.isRequired,
  description: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired
  }).isRequired,
  isDisabled: PropTypes.bool,
  id: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string
};

const Switch = ({ FieldProvider, ...props }) => <FieldProvider {...props} component={SwitchGroup} />;

Switch.propTypes = {
  FieldProvider: PropTypes.any // will not be in props
};

export default Switch;
