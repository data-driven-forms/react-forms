import React from 'react';

import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';
import { Menu, MenuItem, ButtonGroup, Button, ControlGroup, InputGroup } from '@blueprintjs/core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { FormGroupInternal } from '../form-group/form-group';

const useStyles = createUseStyles({
  menu: {
    height: '80%',
    overflow: 'auto',
  },
  buttonGroup: {
    justifyContent: 'center',
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-evenly',
    minHeight: 250,
  },
  '@media (max-width: 768px)': {
    wrapper: {
      flexDirection: 'column',
    },
  },
});

const List = ({ value = [], optionClick, noOptionsTitle, filterValue, filterValueText, selectedValues, MenuProps = {}, MenuItemProps = {} }) => {
  const { menu } = useStyles();

  return (
    <Menu {...MenuProps} className={clsx('bp4-elevation-1', menu, MenuProps.className)}>
      {value.length < 1 && <MenuItem text={filterValue ? filterValueText : noOptionsTitle} disabled {...MenuItemProps} />}
      {value.length > 0 &&
        value.map(({ value, label, MenuItemProps: ItemMenuItemProps }) => (
          <MenuItem
            onClick={(e) => optionClick(e, value)}
            key={value}
            active={selectedValues.includes(value)}
            text={label}
            {...MenuItemProps}
            {...ItemMenuItemProps}
          />
        ))}
    </Menu>
  );
};

const Toolbar = ({
  sortTitle,
  onFilter,
  onSort,
  sortDirection,
  value,
  placeholder,
  ControlGroupProps = {},
  InputGroupProps = {},
  ButtonProps = {},
}) => (
  <ControlGroup {...ControlGroupProps}>
    <InputGroup placeholder={placeholder} onChange={(e) => onFilter(e.target.value)} value={value} {...InputGroupProps} />
    <Button icon={sortDirection ? 'sort-desc' : 'sort-asc'} title={sortTitle} onClick={onSort} {...ButtonProps} />
  </ControlGroup>
);

const DualListInternal = ({
  allToRight = true,
  allToLeft = true,
  leftTitle = 'Options',
  moveAllLeftTitle = 'Move all to left',
  moveAllRightTitle = 'Move all to right',
  moveRightTitle = 'Move selected to right',
  moveLeftTitle = 'Move selected to left',
  rightTitle = 'Selected',
  noValueTitle = 'No selected',
  noOptionsTitle = 'No available options',
  filterOptionsTitle = 'Filter options',
  filterValueTitle = 'Filter selected value',
  filterValueText = 'Remove your filter to see all selected',
  filterOptionsText = 'Remove your filter to see all options',
  state,
  sortOptions,
  filterOptions,
  handleOptionsClick,
  leftValues,
  handleMoveRight,
  handleMoveLeft,
  handleClearLeftValues,
  handleClearRightValues,
  sortValues,
  filterValues,
  rightValues,
  handleValuesClick,
  WrapperProps = {},
  LeftWrapperProps = {},
  RightWrapperProps = {},
  ButtonGroupProps = {},
  ToRightButtonProps = {},
  AllToRightButtonProps = {},
  AllToLeftButtonProps = {},
  ToLeftButtonProps = {},
  LeftControlGroupProps = {},
  LeftInputGroupProps = {},
  LeftButtonProps = {},
  RightControlGroupProps = {},
  RightInputGroupProps = {},
  RightButtonProps = {},
  LeftMenuProps = {},
  LeftMenuItemProps = {},
  RightMenuProps = {},
  RightMenuItemProps = {},
  leftSortTitle = 'Sort options',
  rightSortTitle = 'Sort value',
}) => {
  const { buttonGroup, wrapper } = useStyles();

  return (
    <div {...WrapperProps} className={clsx(wrapper, WrapperProps.className)}>
      <div {...LeftWrapperProps}>
        {leftTitle}
        <Toolbar
          sortDirection={state.sortLeftDesc}
          onSort={sortOptions}
          onFilter={filterOptions}
          value={state.filterOptions}
          placeholder={filterOptionsTitle}
          ControlGroupProps={LeftControlGroupProps}
          InputGroupProps={LeftInputGroupProps}
          ButtonProps={LeftButtonProps}
          sortTitle={leftSortTitle}
        />
        <List
          optionClick={handleOptionsClick}
          value={leftValues}
          noOptionsTitle={noOptionsTitle}
          filterValue={state.filterOptions}
          filterValueText={filterOptionsText}
          selectedValues={state.selectedLeftValues}
          MenuProps={LeftMenuProps}
          MenuItemProps={LeftMenuItemProps}
        />
      </div>
      <ButtonGroup vertical alignText="center" {...ButtonGroupProps} className={clsx(buttonGroup, ButtonGroupProps.className)}>
        <Button
          disabled={state.selectedLeftValues.length === 0}
          onClick={handleMoveRight}
          title={moveRightTitle}
          icon="chevron-right"
          {...ToRightButtonProps}
        />
        {allToRight && (
          <Button
            disabled={leftValues.length === 0}
            onClick={handleClearLeftValues}
            title={moveAllRightTitle}
            icon="double-chevron-right"
            {...AllToRightButtonProps}
          />
        )}
        {allToLeft && (
          <Button
            disabled={rightValues.length === 0}
            onClick={handleClearRightValues}
            title={moveAllLeftTitle}
            icon="double-chevron-left"
            {...AllToLeftButtonProps}
          />
        )}
        <Button
          disabled={state.selectedRightValues.length === 0}
          onClick={handleMoveLeft}
          title={moveLeftTitle}
          icon="chevron-left"
          {...ToLeftButtonProps}
        />
      </ButtonGroup>
      <div {...RightWrapperProps}>
        {rightTitle}
        <Toolbar
          sortDirection={state.sortRightDesc}
          onSort={sortValues}
          onFilter={filterValues}
          value={state.filterValue}
          placeholder={filterValueTitle}
          ControlGroupProps={RightControlGroupProps}
          InputGroupProps={RightInputGroupProps}
          ButtonProps={RightButtonProps}
          sortTitle={rightSortTitle}
        />
        <List
          optionClick={handleValuesClick}
          value={rightValues}
          noOptionsTitle={noValueTitle}
          filterValue={state.filterValue}
          filterValueText={filterValueText}
          selectedValues={state.selectedRightValues}
          MenuProps={RightMenuProps}
          MenuItemProps={RightMenuItemProps}
        />
      </div>
    </div>
  );
};

const DualListWrapper = (props) => <FormGroupInternal {...props} Component={DualListInternal} />;
const DualListSelect = (props) => <DualListSelectCommon {...props} DualListSelect={DualListWrapper} />;

export default DualListSelect;
