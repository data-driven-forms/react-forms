/* eslint-disable react/prop-types */
import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Option from './option';
import EmptyOption from './empty-options';
import { SelectOption } from '../../types';

import './menu.css';

const getScrollParent = (element: Element): Element => {
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

const getMenuPosition = (selectBase: Element | null) => {
  if (!selectBase) {
    return {};
  }

  return selectBase.getBoundingClientRect();
};

const checkScrollVisibility = (scrollableParent: Element, selectRoot: Element, menuRoot: Element) => {
  const parentProportions = scrollableParent.getBoundingClientRect();
  const rootProportions = selectRoot.getBoundingClientRect();
  const menuProportions = menuRoot.getBoundingClientRect();
  return {
    rootPosition: parentProportions.y,
    cropSize: rootProportions.y + rootProportions.height - parentProportions.y,
    maxHeight: window.innerHeight - menuProportions.top + 1,
  };
};

interface MenuPortalProps {
  selectToggleRef: React.RefObject<HTMLDivElement>;
  menuPortalTarget: Element;
  children: React.ReactElement;
}

const MenuPortal: React.FC<MenuPortalProps> = ({ selectToggleRef, menuPortalTarget, children }) => {
  const [position, setPosition] = useState(getMenuPosition(selectToggleRef.current));
  const [{ cropSize, rootPosition, maxHeight }, setCropSize] = useState<{
    cropSize?: number;
    rootPosition?: number;
    maxHeight?: number;
  }>({});
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) {
      return;
    }

    setCropSize({ maxHeight: window.innerHeight - menuRef.current.getBoundingClientRect().top - 4 });
    const scrollParentElement = getScrollParent(selectToggleRef.current!);

    const scrollHandler = function () {
      if (!menuRef.current || !selectToggleRef.current) {
        return;
      }

      setCropSize(checkScrollVisibility(scrollParentElement, selectToggleRef.current, menuRef.current));
      setPosition(getMenuPosition(selectToggleRef.current));
    };

    const resizeHandler = function () {
      if (!menuRef.current || !selectToggleRef.current) {
        return;
      }

      setCropSize((prevSize) => ({ ...prevSize, maxHeight: window.innerHeight - menuRef.current!.getBoundingClientRect().top - 4 }));
      setPosition(getMenuPosition(selectToggleRef.current));
    };

    scrollParentElement.addEventListener('scroll', scrollHandler, true);
    window.addEventListener('resize', resizeHandler, true);
    return () => {
      window.removeEventListener('resize', resizeHandler, true);
      scrollParentElement.removeEventListener('scroll', scrollHandler, true);
    };
  }, [selectToggleRef]);

  const top = (position as any).top + (position as any).height;
  const sizedMenu = React.cloneElement(children, {
    // @ts-ignore
    style: {
      maxHeight: (cropSize || 0) < 0 ? (maxHeight || 0) + (cropSize || 0) : maxHeight,
      overflow: 'auto',
    },
  });

  const portalDiv = (
    <div
      ref={menuRef}
      className="pf-v6-c-menu ddorg_pf4-component-mapper__select-portal-menu"
      style={{
        zIndex: 401,
        position: 'absolute',
        top: (cropSize || 0) < 0 ? rootPosition : top,
        left: (position as any).left,
        width: (position as any).width,
        overflow: 'hidden',
      }}
    >
      {(cropSize || 0) < 0 ? <div style={{ position: 'relative', top: cropSize, width: (position as any).width }}>{sizedMenu}</div> : sizedMenu}
    </div>
  );

  return createPortal(portalDiv, menuPortalTarget);
};

interface MenuProps {
  noResultsMessage?: string;
  noOptionsMessage?: string;
  filterOptions?: (options: SelectOption[], filterValue?: any) => SelectOption[];
  isSearchable?: boolean;
  filterValue?: any;
  getItemProps?: (props: any) => any;
  getInputProps?: (props?: any) => any;
  highlightedIndex?: number;
  selectedItem?: any;
  isMulti?: boolean;
  isFetching?: boolean;
  menuPortalTarget?: Element;
  menuIsPortal?: boolean;
  selectToggleRef?: React.RefObject<HTMLDivElement>;
  originalOptions?: SelectOption[];
  options?: SelectOption[];
}

const Menu: React.FC<MenuProps> = ({
  noResultsMessage,
  noOptionsMessage,
  filterOptions,
  isSearchable,
  filterValue,
  getItemProps,
  getInputProps,
  highlightedIndex,
  selectedItem,
  isMulti,
  isFetching,
  menuPortalTarget,
  menuIsPortal,
  selectToggleRef,
  originalOptions = [],
}) => {
  const filteredOptions = isSearchable ? filterOptions?.(originalOptions, filterValue) || [] : originalOptions;

  let index = 0;

  const createOption = (item: SelectOption) => {
    index++;

    const itemProps =
      getItemProps?.({
        item,
        index,
        isActive: highlightedIndex === index,
        isSelected: isMulti ? !!selectedItem?.find?.(({ value }: any) => item.value === value) : selectedItem === item.value,
        onMouseUp: (e: React.MouseEvent) => e.stopPropagation(), // we need this to prevent issues with portal menu not selecting a option
      }) || {};

    let key = (item as any).key;
    if (!key && typeof item.value === 'object') {
      try {
        key = JSON.stringify(item.value);
      } catch (error) {
        key = index;
      }
    } else if (!key) {
      key = (typeof item.label === 'string' && item.label) || index;
    }

    return <Option key={key} item={item} {...itemProps} />;
  };

  const menuItems = (
    <ul className={`pf-v6-c-menu__list${menuIsPortal ? ' ddorg__pf4-component-mapper__menu-portal' : ''}`}>
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
        if ((item as any).options) {
          return (
            <div className="pf-v6-c-menu__group" key={`group-${arrayIndex}`}>
              <div className="pf-v6-c-menu__group-title">{item.label}</div>
              {(item as any).options.map((nestedItem: SelectOption) => createOption(nestedItem))}
            </div>
          );
        }

        if ((item as any).divider) {
          return <hr className="pf-v6-c-divider" key={`divider-${index}`} />;
        }

        return createOption(item);
      })}
    </ul>
  );

  if (menuIsPortal && menuPortalTarget && selectToggleRef) {
    return (
      <MenuPortal menuPortalTarget={menuPortalTarget} selectToggleRef={selectToggleRef}>
        {menuItems}
      </MenuPortal>
    );
  }

  return menuItems;
};

export default Menu;
