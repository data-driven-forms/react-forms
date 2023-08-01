/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Option from './option';
import EmptyOption from './empty-options';

import './menu.css';

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

const checkScrollVisibility = (scrollableParent, selectRoot, menuRoot) => {
  const parentProportions = scrollableParent.getBoundingClientRect();
  const rootProportions = selectRoot.getBoundingClientRect();
  const menuProportions = menuRoot.getBoundingClientRect();
  return {
    rootPosition: parentProportions.y,
    cropSize: rootProportions.y + rootProportions.height - parentProportions.y,
    maxHeight: window.innerHeight - menuProportions.top + 1,
  };
};

const MenuPortal = ({ selectToggleRef, menuPortalTarget, children }) => {
  const [position, setPosition] = useState(getMenuPosition(selectToggleRef.current));
  const [{ cropSize, rootPosition, maxHeight }, setCropSize] = useState({});
  const menuRef = useRef();
  useEffect(() => {
    setCropSize({ maxHeight: window.innerHeight - menuRef.current.getBoundingClientRect().top - 4 });
    const scrollParentElement = getScrollParent(selectToggleRef.current);
    const scrollHandler = function () {
      setCropSize(checkScrollVisibility(scrollParentElement, selectToggleRef.current, menuRef.current));
      setPosition(getMenuPosition(selectToggleRef.current));
    };

    const resizeHandler = function () {
      setCropSize((prevSize) => ({ ...prevSize, maxHeight: window.innerHeight - menuRef.current.getBoundingClientRect().top - 4 }));
      setPosition(getMenuPosition(selectToggleRef.current));
    };

    scrollParentElement.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', resizeHandler, true);
    return () => {
      window.removeEventListener('resize', resizeHandler, true);
      scrollParentElement.removeEventListener('scroll', scrollHandler, true);
    };
  }, [selectToggleRef]);

  const top = position.top + position.height;
  const sizedMenu = React.cloneElement(children, {
    style: {
      maxHeight: cropSize < 0 ? maxHeight + cropSize : maxHeight,
      overflow: 'auto',
    },
  });
  const portalDiv = (
    <div
      ref={menuRef}
      className="pf-v5-c-select ddorg_pf4-component-mapper__select-portal-menu"
      style={{
        zIndex: 401,
        position: 'absolute',
        top: cropSize < 0 ? rootPosition : top,
        left: position.left,
        width: position.width,
        overflow: 'hidden',
      }}
    >
      {cropSize < 0 ? <div style={{ position: 'relative', top: cropSize, width: position.width }}>{sizedMenu}</div> : sizedMenu}
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
  selectToggleRef,
  originalOptions,
}) => {
  const filteredOptions = isSearchable ? filterOptions(originalOptions, filterValue) : originalOptions;

  let index = 0;

  const createOption = (item) => {
    index++;

    const itemProps = getItemProps({
      item,
      index,
      isActive: highlightedIndex === index,
      isSelected: isMulti ? !!selectedItem.find(({ value }) => item.value === value) : selectedItem === item.value,
      onMouseUp: (e) => e.stopPropagation(), // we need this to prevent issues with portal menu not selecting a option
    });

    return <Option key={item.key || item.value || (typeof item.label === 'string' && item.label) || item} item={item} {...itemProps} />;
  };

  const menuItems = (
    <ul className={`pf-v5-c-select__menu${menuIsPortal ? ' ddorg__pf4-component-mapper__select-menu-portal' : ''}`}>
      {filteredOptions.length === 0 && (
        <EmptyOption
          isSearchable={isSearchable}
          noOptionsMessage={noOptionsMessage}
          noResultsMessage={noResultsMessage}
          getInputProps={getInputProps}
          isFetching={isFetching}
        />
      )}
      {filteredOptions.map((item, arrayIndex) => {
        if (item.options) {
          return (
            <div className="pf-v5-c-select__menu-group" key={`group-${arrayIndex}`}>
              <div className="pf-v5-c-select__menu-group-title">{item.label}</div>
              {item.options.map((nestedItem) => createOption(nestedItem))}
            </div>
          );
        }

        if (item.divider) {
          return <hr className="pf-v5-c-divider" key={`divider-${index}`} />;
        }

        return createOption(item);
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
