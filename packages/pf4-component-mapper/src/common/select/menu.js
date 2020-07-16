import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Option from './option';
import EmptyOption from './empty-options';

const getScrollParent = (element) => {
  let style = getComputedStyle(element);
  const excludeStaticParent = style.position === 'absolute';
  const overflowRx = /(auto|scroll)/;
  const docEl = document.documentElement;

  if (style.position === 'fixed') {
    return docEl;
  }

  for (let parent = element; (parent = parent.parentElement);) { // eslint-disable-line
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }

    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }

  return docEl;
};

const getMenuPosition = (selectBase) => {
  if (!selectBase) {
    return {};
  }

  return selectBase.getBoundingClientRect();
};

const MenuPortal = ({ selectToggleRef, menuPortalTarget, children }) => {
  const [position, setPosition] = useState(getMenuPosition(selectToggleRef.current));
  useEffect(() => {
    const scrollParentElement = getScrollParent(selectToggleRef.current);
    const scrollListener = scrollParentElement.addEventListener('scroll', () => {
      setPosition(getMenuPosition(selectToggleRef.current));
    });
    const resizeListener = window.addEventListener('resize', () => {
      setPosition(getMenuPosition(selectToggleRef.current));
    });
    return () => {
      window.removeEventListener('resize', resizeListener);
      scrollParentElement.removeEventListener('scroll', scrollListener);
    };
  }, [selectToggleRef]);

  const top = position.top + position.height;
  const portalDiv = (
    <div
      className="pf-c-select ddorg_pf4-component-mapper__select-portal-menu"
      style={{ borderTop: '4px solid white', zIndex: 401, position: 'absolute', top, left: position.left, width: position.width }}
    >
      {children}
    </div>
  );

  return createPortal(portalDiv, menuPortalTarget);
};

const Menu = ({
  noResultsMessage,
  noOptionsMessage,
  filterOptions,
  isSearchable,
  filterValue,
  options,
  getItemProps,
  getInputProps,
  highlightedIndex,
  selectedItem,
  isMulti,
  isFetching,
  menuPortalTarget,
  menuIsPortal,
  selectToggleRef
}) => {
  const filteredOptions = isSearchable ? filterOptions(options, filterValue) : options;
  const menuItems = (
    <ul className="pf-c-select__menu">
      {filteredOptions.length === 0 && (
        <EmptyOption
          isSearchable={isSearchable}
          noOptionsMessage={noOptionsMessage}
          noResultsMessage={noResultsMessage}
          getInputProps={getInputProps}
          isFetching={isFetching}
        />
      )}
      {filteredOptions.map((item, index) => {
        const itemProps = getItemProps({
          item,
          index,
          isActive: highlightedIndex === index,
          isSelected: isMulti ? !!selectedItem.find(({ value }) => item.value === value) : selectedItem === item.value,
          onMouseUp: (e) => e.stopPropagation() // we need this to prevent issues with portal menu not selecting a option
        });
        return <Option key={item.key || item.value || (typeof item.label === 'string' && item.label) || item} item={item} {...itemProps} />;
      })}
    </ul>
  );
  if (menuIsPortal) {
    return (
      <MenuPortal menuPortalTarget={menuPortalTarget} selectToggleRef={selectToggleRef}>
        {menuItems}
      </MenuPortal>
    );
  }

  return menuItems;
};

export default Menu;
