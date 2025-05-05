import React from 'react';
import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import {
  Grid,
  Row,
  Column,
  Button,
  FormGroup,
  Search,
  StructuredListWrapper,
  StructuredListRow,
  StructuredListBody,
  StructuredListCell,
  TooltipIcon,
} from 'carbon-components-react';
import { CheckmarkFilled16, ChevronRight32, ChevronLeft32, CaretSortDown32, CaretSortUp32 } from '@carbon/icons-react';

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
  },
  tooltipButton: {
    background: '#c2c1c1 !important',
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
};

const Toolbar = ({ sortTitle, onFilter, onSort, sortDirection, placeholder, ToolbarProps, SearchProps, SortProps }) => {
  const { toolbar, tooltipButton } = useStyles();

  return (
    <div {...ToolbarProps} className={clsx(toolbar, ToolbarProps.className)}>
      <Search onChange={(e) => onFilter(e.target.value)} labelText="" placeholder={placeholder} {...SearchProps} />
      <TooltipIcon onClick={onSort} tooltipText={sortTitle} {...SortProps} className={clsx(tooltipButton, SortProps.className)}>
        {sortDirection ? <CaretSortDown32 /> : <CaretSortUp32 />}
      </TooltipIcon>
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
  RowProps = {},
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
          <Column sm={4} md={8} lg={2} {...ButtonColumnProps} className={clsx(buttonWrapper, ButtonColumnProps.className)}>
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
};

const DualListSelect = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelectInner} />;

export default DualListSelect;
