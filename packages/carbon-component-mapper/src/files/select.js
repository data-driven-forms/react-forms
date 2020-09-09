import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import DataDrivenSelect from '@data-driven-forms/common/src/select';
import useIsMounted from '@data-driven-forms/common/src/hooks/use-is-mounted';
import fnToString from '@data-driven-forms/common/src/utils/fn-to-string';

import { Select as CarbonSelect, MultiSelect, SelectItem } from 'carbon-components-react';
import prepareProps from '../common/prepare-props';

const ClearedMultiSelectFilterable = (props) => {
  return 'multi.searchable';
};

const ClearedMultiSelect = (props) => {
  return 'multi';
};

const ClearedSelect = ({ invalidText, hideSelectedOptions, noOptionsMessage, onInputChange, options, isFetching, invalid, ...rest }) => {
  return (
    <CarbonSelect {...rest} if={rest.name} invalid={Boolean(invalidText)} invalidText={invalidText}>
      {options.map((option, index) => (
        <SelectItem key={option.value || index} text={option.label} {...option} />
      ))}
    </CarbonSelect>
  );
};

const Select = (props) => {
  const { isMulti, isSearchable, loadOptions, input, meta, ...rest } = useFieldApi(prepareProps(props));

  const [isFetching, setFetching] = useState(loadOptions ? true : false);
  const [options, setOptions] = useState(props.options || []);
  const isMounted = useIsMounted();

  // common select controls the string of loadOptions and if the string changed, then it reloads options
  // however we are enhancing the loadOptions here so the string is always the same
  // by increasing this counter, we can enforce the update
  const [loadOptionsChangeCounter, setCounter] = useState(0);

  const loadOptionsStr = fnToString(loadOptions);

  useEffect(() => {
    setCounter(loadOptionsChangeCounter + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOptionsStr]);

  const loadOptionsEnhanced = loadOptions
    ? (value) => {
        if (isMounted.current) {
          setFetching(true);
        }

        return loadOptions(value).then((data) => {
          if (isMounted.current) {
            setOptions([...options, ...data.filter(({ value }) => !options.find((option) => option.value === value))]);
            setFetching(false);
          }

          return data;
        });
      }
    : undefined;

  const Component = isMulti && isSearchable ? ClearedMultiSelectFilterable : isMulti ? ClearedMultiSelect : ClearedSelect;

  const invalidText = (meta.touched && meta.error) || '';

  return (
    <DataDrivenSelect
      SelectComponent={Component}
      {...rest}
      {...input}
      invalidText={invalidText}
      loadOptionsChangeCounter={loadOptionsChangeCounter}
      loadOptions={loadOptionsEnhanced}
      simpleValue={false}
    />
  );
};

Select.propTypes = {
  isDisabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node
    })
  )
};

export default Select;
