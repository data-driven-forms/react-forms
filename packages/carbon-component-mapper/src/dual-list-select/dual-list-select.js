import React from 'react';
import PropTypes from 'prop-types';
import DualListSelectCommon from '@data-driven-forms/common/src/dual-list-select';
import clsx from 'clsx';

import { Grid, Row, Column, Button, FormGroup, Search, TooltipIcon } from 'carbon-components-react';
import { CheckmarkFilled16, ChevronRight32, ChevronLeft32, CaretSortDown32, CaretSortUp32 } from '@carbon/icons-react';

import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListBody,
  StructuredListCell
} from 'carbon-components-react/lib/components/StructuredList/StructuredList';

import { buildLabel } from './prepare-props';
import './dual-list-select.scss';

const EmptyList = ({ message }) => (
  <StructuredListWrapper>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell>{message}</StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

EmptyList.propTypes = {
  message: PropTypes.string
};

const List = ({ options, selectedValues, handleOptionsClick, noTitle, ListProps, BodyProps }) =>
  options.length > 0 ? (
    <StructuredListWrapper selection {...ListProps} className={clsx('ddorg__carbon-dual-list', ListProps.className)}>
      <StructuredListBody {...BodyProps} className={clsx('ddorg__carbon-dual-list-body', BodyProps.className)}>
        {options.map(({ value, label, ListRowProps, ListCellProps, GridProps, RowProps, LabelProps, CheckmarkProps }) => (
          <StructuredListRow key={value} {...ListRowProps} onClick={(e) => handleOptionsClick({ ...e, ctrlKey: true }, value)}>
            <StructuredListCell {...ListCellProps}>
              <Grid {...GridProps}>
                <Row narrow {...RowProps}>
                  <Column sm={3} {...LabelProps}>
                    {label}
                  </Column>
                  <Column sm={1} {...CheckmarkProps}>
                    {selectedValues.includes(value) && <CheckmarkFilled16 />}
                  </Column>
                </Row>
              </Grid>
            </StructuredListCell>
          </StructuredListRow>
        ))}
      </StructuredListBody>
    </StructuredListWrapper>
  ) : (
    <EmptyList message={noTitle} />
  );

List.propTypes = {
  options: PropTypes.array,
  selectedValues: PropTypes.array,
  handleOptionsClick: PropTypes.func,
  noTitle: PropTypes.node,
  ListProps: PropTypes.object,
  BodyProps: PropTypes.object
};

const Toolbar = ({ sortTitle, onFilter, onSort, sortDirection, placeholder, ToolbarProps, SearchProps, SortProps }) => (
  <div {...ToolbarProps} className={clsx('ddorg__carbon-dual-list-toolbar', ToolbarProps.className)}>
    <Search onChange={(e) => onFilter(e.target.value)} labelText="" placeHolderText={placeholder} {...SearchProps} />
    <TooltipIcon
      onClick={onSort}
      tooltipText={sortTitle}
      {...SortProps}
      className={clsx('ddorg__carbon-dual-list-tooltipbutton', SortProps.className)}
    >
      {sortDirection ? <CaretSortDown32 /> : <CaretSortUp32 />}
    </TooltipIcon>
  </div>
);

Toolbar.propTypes = {
  sortTitle: PropTypes.string,
  onFilter: PropTypes.func,
  onSort: PropTypes.func,
  sortDirection: PropTypes.bool,
  placeholder: PropTypes.string,
  ToolbarProps: PropTypes.object,
  SearchProps: PropTypes.object,
  SortProps: PropTypes.object
};

const isEmpty = (array) => array.length === 0;

const DualListSelectInner = ({
  leftValues,
  handleOptionsClick,
  rightValues,
  handleValuesClick,
  handleMoveRight,
  handleClearLeftValues,
  handleMoveLeft,
  handleClearRightValues,
  state,
  filterOptions,
  filterValues,
  sortOptions,
  sortValues,
  noOptionsTitle,
  noValueTitle,
  leftTitle,
  rightTitle,
  LeftTitleElement,
  RightTitleElement,
  LeftTitleProps,
  RightTitleProps,
  moveLeftTitle,
  moveRightTitle,
  moveAllLeftTitle,
  moveAllRightTitle,
  label,
  isRequired,
  filterOptionsTitle,
  filterValuesTitle,
  sortOptionsTitle,
  sortValuesTitle,
  filterOptionsText,
  filterValueText,
  FormGroupProps,
  GridProps,
  RowProps,
  OptionsColumnProps,
  ButtonColumnProps,
  ValuesColumnProps,
  AddButtonProps,
  AddAllButtonProps,
  RemoveButtonProps,
  RemoveAllButtonProps,
  LeftToolbarProps,
  RightToolbarProps,
  LeftSearchProps,
  RightSearchProps,
  LeftSortProps,
  RightSortProps,
  LeftListProps,
  LeftBodyProps,
  RightListProps,
  RightBodyProps
}) => (
  <FormGroup legendText={buildLabel(label || '', isRequired)} {...FormGroupProps}>
    <Grid {...GridProps}>
      <Row condensed {...RowProps}>
        <Column sm={4} md={8} lg={5} {...OptionsColumnProps}>
          {React.createElement(LeftTitleElement, LeftTitleProps, leftTitle)}
          <Toolbar
            onFilter={filterOptions}
            placeholder={filterOptionsTitle}
            sortDirection={state.sortLeftDesc}
            onSort={sortOptions}
            sortTitle={sortOptionsTitle}
            ToolbarProps={LeftToolbarProps}
            SearchProps={LeftSearchProps}
            SortProps={LeftSortProps}
          />
          <List
            ListProps={LeftListProps}
            BodyProps={LeftBodyProps}
            options={leftValues}
            selectedValues={state.selectedLeftValues}
            handleOptionsClick={handleOptionsClick}
            noTitle={state.filterOptions ? filterOptionsText : noOptionsTitle}
          />
        </Column>
        <Column sm={4} md={8} lg={2} {...ButtonColumnProps} className={clsx('ddorg__carbon-dual-list-button-wrapper', ButtonColumnProps.className)}>
          <Button
            id="move-right"
            renderIcon={ChevronRight32}
            onClick={handleMoveRight}
            disabled={isEmpty(state.selectedLeftValues)}
            {...AddButtonProps}
          >
            {moveRightTitle}
          </Button>
          <Button id="move-all-right" onClick={handleClearLeftValues} disabled={isEmpty(leftValues)} {...AddAllButtonProps}>
            {moveAllRightTitle}
          </Button>
          <Button id="move-all-left" onClick={handleClearRightValues} disabled={isEmpty(rightValues)} {...RemoveAllButtonProps}>
            {moveAllLeftTitle}
          </Button>
          <Button
            id="move-left"
            renderIcon={ChevronLeft32}
            onClick={handleMoveLeft}
            disabled={isEmpty(state.selectedRightValues)}
            {...RemoveButtonProps}
          >
            {moveLeftTitle}
          </Button>
        </Column>
        <Column sm={4} md={8} lg={5} {...ValuesColumnProps}>
          {React.createElement(RightTitleElement, RightTitleProps, rightTitle)}
          <Toolbar
            onFilter={filterValues}
            placeholder={filterValuesTitle}
            sortDirection={state.sortRightDesc}
            onSort={sortValues}
            sortTitle={sortValuesTitle}
            ToolbarProps={RightToolbarProps}
            SearchProps={RightSearchProps}
            SortProps={RightSortProps}
          />
          <List
            ListProps={RightListProps}
            BodyProps={RightBodyProps}
            options={rightValues}
            selectedValues={state.selectedRightValues}
            handleOptionsClick={handleValuesClick}
            noTitle={state.filterValue ? filterValueText : noValueTitle}
          />
        </Column>
      </Row>
    </Grid>
  </FormGroup>
);

DualListSelectInner.propTypes = {
  leftValues: PropTypes.array,
  handleOptionsClick: PropTypes.func,
  rightValues: PropTypes.array,
  handleValuesClick: PropTypes.func,
  handleMoveRight: PropTypes.func,
  handleClearLeftValues: PropTypes.func,
  handleMoveLeft: PropTypes.func,
  handleClearRightValues: PropTypes.func,
  state: PropTypes.object,
  filterOptions: PropTypes.func,
  filterValues: PropTypes.func,
  sortValues: PropTypes.func,
  sortOptions: PropTypes.func,
  noOptionsTitle: PropTypes.node,
  noValueTitle: PropTypes.node,
  leftTitle: PropTypes.node,
  rightTitle: PropTypes.node,
  LeftTitleElement: PropTypes.string,
  RightTitleElement: PropTypes.string,
  LeftTitleProps: PropTypes.object,
  RightTitleProps: PropTypes.object,
  moveLeftTitle: PropTypes.node,
  moveRightTitle: PropTypes.node,
  moveAllLeftTitle: PropTypes.node,
  moveAllRightTitle: PropTypes.node,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  filterOptionsTitle: PropTypes.string,
  filterValuesTitle: PropTypes.string,
  sortOptionsTitle: PropTypes.string,
  sortValuesTitle: PropTypes.string,
  filterOptionsText: PropTypes.node,
  filterValueText: PropTypes.node,
  FormGroupProps: PropTypes.object,
  GridProps: PropTypes.object,
  RowProps: PropTypes.object,
  OptionsColumnProps: PropTypes.object,
  ButtonColumnProps: PropTypes.object,
  ValuesColumnProps: PropTypes.object,
  AddButtonProps: PropTypes.object,
  AddAllButtonProps: PropTypes.object,
  RemoveButtonProps: PropTypes.object,
  RemoveAllButtonProps: PropTypes.object,
  LeftToolbarProps: PropTypes.object,
  RightToolbarProps: PropTypes.object,
  LeftSearchProps: PropTypes.object,
  RightSearchProps: PropTypes.object,
  LeftSortProps: PropTypes.object,
  RightSortProps: PropTypes.object,
  LeftListProps: PropTypes.object,
  LeftBodyProps: PropTypes.object,
  RightListProps: PropTypes.object,
  RightBodyProps: PropTypes.object
};

DualListSelectInner.defaultProps = {
  noOptionsTitle: 'No option available',
  noValueTitle: 'No option selected',
  leftTitle: 'Options',
  rightTitle: 'Selected',
  LeftTitleElement: 'h6',
  RightTitleElement: 'h6',
  moveLeftTitle: 'Remove',
  moveRightTitle: 'Add',
  moveAllLeftTitle: 'Remove All',
  moveAllRightTitle: 'Add All',
  filterOptionsTitle: 'Filter options',
  filterValuesTitle: 'Filter values',
  sortOptionsTitle: 'Sort options',
  sortValuesTitle: 'Sort values',
  filterOptionsText: 'Remove your filter to see all options',
  filterValueText: 'Remove your filter to see all selected',
  FormGroupProps: {},
  GridProps: {},
  RowProps: {},
  OptionsColumnProps: {},
  ButtonColumnProps: {},
  ValuesColumnProps: {},
  AddButtonProps: {},
  AddAllButtonProps: {},
  RemoveButtonProps: {},
  RemoveAllButtonProps: {},
  LeftToolbarProps: {},
  RightToolbarProps: {},
  LeftSearchProps: {},
  RightSearchProps: {},
  LeftSortProps: {},
  RightSortProps: {},
  LeftListProps: {},
  LeftBodyProps: {},
  RightListProps: {},
  RightBodyProps: {}
};

const DualListSelect = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelectInner} />;

export default DualListSelect;
