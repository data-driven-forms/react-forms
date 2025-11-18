import React from 'react';
import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import {
  Grid,
  Column,
  Button,
  FormGroup,
  Search,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListBody,
  StructuredListCell,
} from '@carbon/react';
import { CheckmarkFilled, ChevronRight, ChevronLeft, CaretSortDown, CaretSortUp } from '@carbon/react/icons';

import { buildLabel } from '../prepare-props';

const useStyles = createUseStyles({
  dualList: {
    maxHeight: 500,
    overflow: 'auto',
    display: 'block',
    marginBottom: 0,
  },
  dualListBody: {
    width: '100%',
    display: 'inline-table',
  },
  buttonWrapper: {
    flexDirection: 'column',
    padding: '8px !important',
    paddingTop: '8px !important',
    button: {
      width: '100%',
      maxWidth: '100%',
      '@media (max-width: 1055px)': {
        svg: {
          transform: 'rotate(90deg)',
        },
      },
    },
    '& button:not(:last-child)': {
      marginBottom: 8,
    },
  },
  toolbar: {
    display: 'flex',
    '& .cds--tooltip-trigger__wrapper': {
      height: '100%',
    },
  },
  tooltipButton: {
    background: '#c2c1c1 !important',
    height: '100%',
  },
});

const EmptyList = ({ message }) => (
  <StructuredListWrapper>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell>{message}</StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

const List = ({ options, selectedValues, handleOptionsClick, noTitle, ListProps, BodyProps }) => {
  const { dualList, dualListBody } = useStyles();

  return options.length > 0 ? (
    <StructuredListWrapper selection {...ListProps} className={clsx(dualList, ListProps.className)}>
      <StructuredListBody {...BodyProps} className={clsx(dualListBody, BodyProps.className)}>
        {options.map(({ value, label, ListRowProps, ListCellProps, GridProps, LabelProps, CheckmarkProps }) => (
          <StructuredListRow key={value} {...ListRowProps} onClick={(e) => handleOptionsClick({ ...e, ctrlKey: true }, value)}>
            <StructuredListCell {...ListCellProps}>
              <Grid condensed {...GridProps}>
                <Column sm={3} {...LabelProps}>
                  {label}
                </Column>
                <Column sm={1} {...CheckmarkProps}>
                  {selectedValues.includes(value) && <CheckmarkFilled size={16} />}
                </Column>
              </Grid>
            </StructuredListCell>
          </StructuredListRow>
        ))}
      </StructuredListBody>
    </StructuredListWrapper>
  ) : (
    <EmptyList message={noTitle} />
  );
};

const Toolbar = ({ sortTitle, onFilter, onSort, sortDirection, placeholder, ToolbarProps, SearchProps, SortProps }) => {
  const { toolbar, tooltipButton } = useStyles();

  return (
    <div {...ToolbarProps} className={clsx(toolbar, ToolbarProps.className)}>
      <Search onChange={(e) => onFilter(e.target.value)} labelText="" placeholder={placeholder} {...SearchProps} />
      <Button
        kind="ghost"
        size="sm"
        hasIconOnly
        onClick={onSort}
        iconDescription={sortTitle}
        renderIcon={(props) => (sortDirection ? <CaretSortDown size={32} {...props} /> : <CaretSortUp size={32} {...props} />)}
        tooltipAlignment="center"
        tooltipPosition="bottom"
        {...SortProps}
        className={clsx(tooltipButton, SortProps.className)}
      />
    </div>
  );
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
  LeftTitleProps,
  RightTitleProps,
  label,
  isRequired,
  noOptionsTitle = 'No option available',
  noValueTitle = 'No option selected',
  leftTitle = 'Options',
  rightTitle = 'Selected',
  LeftTitleElement = 'h6',
  RightTitleElement = 'h6',
  moveLeftTitle = 'Remove',
  moveRightTitle = 'Add',
  moveAllLeftTitle = 'Remove All',
  moveAllRightTitle = 'Add All',
  filterOptionsTitle = 'Filter options',
  filterValuesTitle = 'Filter values',
  sortOptionsTitle = 'Sort options',
  sortValuesTitle = 'Sort values',
  filterOptionsText = 'Remove your filter to see all options',
  filterValueText = 'Remove your filter to see all selected',
  FormGroupProps = {},
  GridProps = {},
  OptionsColumnProps = {},
  ButtonColumnProps = {},
  ValuesColumnProps = {},
  AddButtonProps = {},
  AddAllButtonProps = {},
  RemoveButtonProps = {},
  RemoveAllButtonProps = {},
  LeftToolbarProps = {},
  RightToolbarProps = {},
  LeftSearchProps = {},
  RightSearchProps = {},
  LeftSortProps = {},
  RightSortProps = {},
  LeftListProps = {},
  LeftBodyProps = {},
  RightListProps = {},
  RightBodyProps = {},
}) => {
  const { buttonWrapper } = useStyles();

  return (
    <FormGroup legendText={buildLabel(label || '', isRequired)} {...FormGroupProps}>
      <Grid condensed {...GridProps}>
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
        <Column sm={4} md={8} lg={4} {...ButtonColumnProps} className={clsx(buttonWrapper, ButtonColumnProps.className)}>
          <Button
            id="move-right"
            renderIcon={(props) => <ChevronRight size={32} {...props} />}
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
            renderIcon={(props) => <ChevronLeft size={32} {...props} />}
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
      </Grid>
    </FormGroup>
  );
};

const DualListSelect = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelectInner} />;

export default DualListSelect;
