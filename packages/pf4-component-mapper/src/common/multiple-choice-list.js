import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as Pf4Chekbox } from '@patternfly/react-core/dist/js/components/Checkbox/Checkbox';

import MultipleChoiceListCommon, { wrapperProps } from '@data-driven-forms/common/src/multiple-choice-list';
import FormGroup from './form-group';

const FinalCheckbox = (props) => {
  console.log('checkbox pf in multiple', props);
  return <Pf4Chekbox isChecked={props.checked} {...props} />;
};

FinalCheckbox.propTypes = {
  checked: PropTypes.bool
};

const Wrapper = ({ isRequired, helperText, label, meta, children, ...rest }) => (
  <FormGroup label={label} meta={meta} id={rest.name} isRequired={isRequired} helperText={helperText}>
    {children}
  </FormGroup>
);

Wrapper.propTypes = {
  ...wrapperProps
};

const List = ({ FieldProvider, input: { name }, options }) =>
  options.map(({ value, label }) => (
    <FieldProvider
      key={value}
      name={name}
      type="checkbox"
      render={({ input: { checked, name, onChange, ...restInput }, meta, ...rest }) => (
        <FormGroup fieldId={value} meta={meta}>
          <Pf4Chekbox id={value} isChecked={checked} label={label} value={value} onChange={(_v, event) => onChange(event)} />
        </FormGroup>
      )}
    />
  ));

const MultipleChoiceList = (props) => <List {...props} />;

MultipleChoiceList.propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default MultipleChoiceList;
