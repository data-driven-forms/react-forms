import React from 'react';
import '@patternfly/react-styles/css/components/TextInputGroup/text-input-group.css';
import './input.css';

const getInputString = (filter: any, value: any): string => {
  if (typeof filter === 'string') {
    return filter;
  }

  if (typeof value === 'string') {
    return value;
  }

  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0];
  }

  return '';
};

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isSearchable?: boolean;
  isDisabled?: boolean;
  getInputProps: (props?: any) => any;
  value?: any;
  placeholder?: string;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({ inputRef, isSearchable, isDisabled, getInputProps, value, ...props }) => {
  const inputProps = getInputProps({ disabled: isDisabled });
  const initialInputValue = getInputString(inputProps.value, value);

  return (
    <div className="ddorg__pf4-component-mapper__select-input-wrapper pf-v6-c-text-input-group pf-m-typeahead pf-m-plain">
      <div className="pf-v6-c-text-input-group__main">
        <span className="pf-v6-c-text-input-group__text">
          <input
            value=""
            {...props}
            className="pf-v6-c-text-input-group__text-input"
            ref={inputRef}
            {...{
              ...inputProps,
              value: initialInputValue,
              onKeyDown: (event: React.KeyboardEvent, ...args: any[]) => {
                event.stopPropagation();
                inputProps.onKeyDown(event, ...args);
              },
              onChange: inputProps.onChange || (() => {}),
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default Input;
