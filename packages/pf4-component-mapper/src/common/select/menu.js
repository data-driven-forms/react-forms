import React from 'react';
import Option from './option';

const Menu = ({ options, getItemProps, highlightedIndex, selectedItem }) => {
  return (
    <ul className="pf-c-select__menu">
      {options.map((item, index) => {
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
