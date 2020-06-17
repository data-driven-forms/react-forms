import React from 'react';
import Option from './option';
import Input from './input';
import EmptyOption from './empty-options';

const Menu = ({
  noResultsMessage,
  noOptionsMessage,
  filterOptions,
  inputRef,
  isSearchable,
  filterValue,
  options,
  getItemProps,
  getInputProps,
  highlightedIndex,
  selectedItem
}) => {
  const filteredOptions = isSearchable ? filterOptions(options, filterValue) : options;

  return (
    <ul className="pf-c-select__menu">
      {isSearchable && <Input inputRef={inputRef} getInputProps={getInputProps} />}
      {filteredOptions.length === 0 && (
        <EmptyOption
          isSearchable={isSearchable}
          noOptionsMessage={noOptionsMessage}
          noResultsMessage={noResultsMessage}
          getInputProps={getInputProps}
        />
      )}
      {filteredOptions.map((item, index) => {
        const itemProps = getItemProps({
          item,
          index,
          isActive: highlightedIndex === index,
          isSelected: selectedItem === item.value
        });
        return <Option key={item.value} item={item} {...itemProps} />;
      })}
    </ul>
  );
};

export default Menu;
