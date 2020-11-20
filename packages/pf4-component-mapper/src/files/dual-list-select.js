import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  TextInput,
  InputGroup,
  Bullseye,
  Button,
  ButtonVariant,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Text,
  TextVariants,
  TextContent,
  Toolbar,
  ToolbarItem,
  ToolbarContent
} from '@patternfly/react-core';

import {
  PficonSortCommonAscIcon,
  PficonSortCommonDescIcon,
  SearchIcon,
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleRightIcon,
  AngleLeftIcon
} from '@patternfly/react-icons';

import './dual-list-select.scss';
import DualListSelectCommon from '../../../common/src/dual-list-select';
import FormGroup from '../common/form-group';

const List = ({ value, optionClick, noOptionsTitle, filterValue, filterValueText, selectedValues, ListProps, ListItemProps, ...rest }) => (
  <div
    {...ListProps}
    {...rest}
    className={clsx('pf-c-form-control', 'pf-u-pr-sm ddorg__pf4-component-mapper__dual-list-select', ListProps.className)}
  >
    {value.length < 1 && (
      <div
        {...ListItemProps}
        className={clsx(
          'ddorg__pf4-component-mapper__dual-list-select-option-text',
          'ddorg__pf4-component-mapper__dual-list-select-option-disabled',
          ListItemProps.className
        )}
      >
        {filterValue ? filterValueText : noOptionsTitle}
      </div>
    )}
    {value.length > 0 &&
      value.map(({ value, label, ListItemProps: ListItemPropsItem }) => (
        <div
          onClick={(e) => optionClick(e, value)}
          key={value}
          value={value}
          {...ListItemProps}
          {...ListItemPropsItem}
          className={clsx(
            'ddorg__pf4-component-mapper__dual-list-select-option',
            {
              'ddorg__pf4-component-mapper__dual-list-select-option-selected': selectedValues.includes(value)
            },
            ListItemProps.className,
            ListItemPropsItem?.className
          )}
        >
          {label}
        </div>
      ))}
  </div>
);

List.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  optionClick: PropTypes.func.isRequired,
  noOptionsTitle: PropTypes.node,
  filterValue: PropTypes.string,
  filterValueText: PropTypes.node,
  selectedValues: PropTypes.array,
  ListProps: PropTypes.object,
  ListItemProps: PropTypes.object
};

List.defaultProps = {
  value: [],
  ListProps: {}
};

const InternalToolbar = ({
  sortTitle,
  onFilter,
  onSort,
  sortDirection,
  value,
  placeholder,
  id,
  ToolbarProps,
  SideToolbarProps,
  FilterFieldProps,
  SideFilterFieldProps,
  SearchIconButtonProps,
  SideSearchIconButtonProps,
  SearchIconProps,
  SideSearchIconProps,
  SortIconButtonProps,
  SideSortIconButtonProps,
  SortIconProps,
  SideSortIconProps
}) => (
  <Toolbar
    {...ToolbarProps}
    {...SideToolbarProps}
    className={clsx(
      'pf-u-p-0',
      'ddorg__pf4-component-mapper__dual-list-select-toolbar',
      ToolbarProps && ToolbarProps.className,
      SideToolbarProps && SideToolbarProps.className
    )}
    id={id}
  >
    <ToolbarContent className="pf-u-p-0 pf-u-pb-md">
      <ToolbarItem className="ddorg__pf4-component-mapper__dual-list-select-toolbar__item-grow">
        <InputGroup>
          <TextInput
            name="filterOptions"
            id="filterOptions"
            type="search"
            aria-label={placeholder}
            onChange={onFilter}
            placeholder={placeholder}
            value={value}
            {...FilterFieldProps}
            {...SideFilterFieldProps}
          />
          <Button variant={ButtonVariant.control} aria-label="search button" {...SearchIconButtonProps} {...SideSearchIconButtonProps}>
            <SearchIcon {...SearchIconProps} {...SideSearchIconProps} />
          </Button>
        </InputGroup>
      </ToolbarItem>
      <ToolbarItem>
        <Button onClick={onSort} title={sortTitle} variant="plain" {...SortIconButtonProps} {...SideSortIconButtonProps}>
          {!sortDirection ? (
            <PficonSortCommonAscIcon size="md" {...SortIconProps} {...SideSortIconProps} />
          ) : (
            <PficonSortCommonDescIcon size="md" {...SortIconProps} {...SideSortIconProps} />
          )}
        </Button>
      </ToolbarItem>
    </ToolbarContent>
  </Toolbar>
);

InternalToolbar.propTypes = {
  sortTitle: PropTypes.node,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortDirection: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  ToolbarProps: PropTypes.object,
  SideToolbarProps: PropTypes.object,
  FilterFieldProps: PropTypes.object,
  SideFilterFieldProps: PropTypes.object,
  SearchIconProps: PropTypes.object,
  SideSearchIconProps: PropTypes.object,
  SearchIconButtonProps: PropTypes.object,
  SideSearchIconButtonProps: PropTypes.object,
  SortIconButtonProps: PropTypes.object,
  SideSortIconButtonProps: PropTypes.object,
  SortIconProps: PropTypes.object,
  SideSortIconProps: PropTypes.object
};

const DualList = ({
  meta,
  input,
  allToRight,
  allToLeft,
  leftTitle,
  moveAllLeftTitle,
  moveAllRightTitle,
  moveRightTitle,
  moveLeftTitle,
  rightTitle,
  label,
  isRequired,
  helperText,
  noValueTitle,
  noOptionsTitle,
  filterOptionsTitle,
  filterValueTitle,
  filterValueText,
  filterOptionsText,
  state,
  description,
  id,
  hideLabel,
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
  renderStatus,
  // Props
  FormGroupProps,
  ListProps,
  LeftListProps,
  RightListProps,
  ListItemProps,
  LeftListItemProps,
  RightListItemProps,
  ToolbarProps,
  LeftToolbarProps,
  RightToolbarProps,
  FilterFieldProps,
  LeftFilterFieldProps,
  RightFilterFieldProps,
  SearchIconProps,
  LeftSearchIconProps,
  RightSearchIconProps,
  SearchIconButtonProps,
  LeftSearchIconButtonProps,
  RightSearchIconButtonProps,
  SortIconButtonProps,
  LeftSortIconButtonProps,
  RightSortIconButtonProps,
  SortIconProps,
  LeftSortIconProps,
  RightSortIconProps,
  InternalGridProps,
  ListGridProps,
  LeftListGridProps,
  RightListGridProps,
  TitleProps,
  LeftTitleProps,
  RightTitleProps,
  ButtonsGridProps,
  ButtonsInternalFlexProps,
  ButtonFlexProps,
  ToRightFlexProps,
  IconButtonProps,
  ToRightIconButtonProps,
  IconProps,
  AllToRightFlexProps,
  AllToRightIconButtonProps,
  AllToLeftFlexProps,
  AllToLeftIconButtonProps,
  ToLeftFlexProps,
  ToLeftIconButtonProps,
  ToRightIconProps,
  AllToRightIconProps,
  AllToLeftIconProps,
  ToLeftIconProps
}) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    helperText={helperText}
    meta={meta}
    description={description}
    hideLabel={hideLabel}
    id={id || input.name}
    FormGroupProps={FormGroupProps}
  >
    <Grid {...InternalGridProps}>
      <Grid>
        <GridItem md={5} {...ListGridProps} {...LeftListGridProps}>
          <Grid>
            <GridItem md={12}>
              <TextContent {...TitleProps} {...LeftTitleProps}>
                <Text component={TextVariants.h6}>{leftTitle}</Text>
              </TextContent>
            </GridItem>
            <GridItem md={12}>
              <InternalToolbar
                sortDirection={state.sortLeftDesc}
                onSort={sortOptions}
                onFilter={filterOptions}
                value={state.filterOptions}
                placeholder={filterOptionsTitle}
                id={`${input.name}-options-toolbar`}
                ToolbarProps={ToolbarProps}
                SideToolbarProps={LeftToolbarProps}
                FilterFieldProps={FilterFieldProps}
                SideFilterFieldProps={LeftFilterFieldProps}
                SearchIconProps={SearchIconProps}
                SideSearchIconProps={LeftSearchIconProps}
                SearchIconButtonProps={SearchIconButtonProps}
                SideSearchIconButtonProps={LeftSearchIconButtonProps}
                SortIconButtonProps={SortIconButtonProps}
                SideSortIconButtonProps={LeftSortIconButtonProps}
                SortIconProps={SortIconProps}
                SideSortIconProps={LeftSortIconProps}
              />
            </GridItem>
            {renderStatus && (
              <GridItem md={12}>
                <TextContent>
                  <Text data-test-id="left-status-text" component={TextVariants.h6}>
                    {renderStatus({
                      selected: state.selectedLeftValues.length,
                      options: leftValues.length
                    })}
                  </Text>
                </TextContent>
              </GridItem>
            )}
            <GridItem md={12}>
              <List
                optionClick={handleOptionsClick}
                value={leftValues}
                noOptionsTitle={noOptionsTitle}
                filterValue={state.filterOptions}
                filterValueText={filterOptionsText}
                selectedValues={state.selectedLeftValues}
                ListProps={{ ...ListProps, ...LeftListProps }}
                ListItemProps={{ ...ListItemProps, ...LeftListItemProps }}
              />
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem md={2} {...ButtonsGridProps}>
          <Bullseye className="ddorg__pf4-component-mapper__dual-list-select-buttons">
            <Flex direction={{ md: 'column', sm: 'row' }} {...ButtonsInternalFlexProps}>
              <FlexItem {...ButtonFlexProps} {...ToRightFlexProps}>
                <Button
                  disabled={leftValues.length === 0}
                  onClick={handleMoveRight}
                  title={moveRightTitle}
                  variant="plain"
                  {...IconButtonProps}
                  {...ToRightIconButtonProps}
                >
                  <AngleRightIcon size="md" {...IconProps} {...ToRightIconProps} />
                </Button>
              </FlexItem>
              {allToRight && (
                <FlexItem {...ButtonFlexProps} {...AllToRightFlexProps}>
                  <Button
                    disabled={leftValues.length === 0}
                    onClick={handleClearLeftValues}
                    title={moveAllRightTitle}
                    variant="plain"
                    {...IconButtonProps}
                    {...AllToRightIconButtonProps}
                  >
                    <AngleDoubleRightIcon size="md" {...IconProps} {...AllToRightIconProps} />
                  </Button>
                </FlexItem>
              )}
              {allToLeft && (
                <FlexItem {...ButtonFlexProps} {...AllToLeftFlexProps}>
                  <Button
                    disabled={rightValues.length === 0}
                    onClick={handleClearRightValues}
                    title={moveAllLeftTitle}
                    variant="plain"
                    {...IconButtonProps}
                    {...AllToLeftIconButtonProps}
                  >
                    <AngleDoubleLeftIcon size="md" {...IconProps} {...AllToLeftIconProps} />
                  </Button>
                </FlexItem>
              )}
              <FlexItem {...ButtonFlexProps} {...ToLeftFlexProps}>
                <Button
                  disabled={rightValues.length === 0}
                  onClick={handleMoveLeft}
                  title={moveLeftTitle}
                  variant="plain"
                  {...IconButtonProps}
                  {...ToLeftIconButtonProps}
                >
                  <AngleLeftIcon size="md" {...IconProps} {...ToLeftIconProps} />
                </Button>
              </FlexItem>
            </Flex>
          </Bullseye>
        </GridItem>
        <GridItem md={5} {...ListGridProps} {...RightListGridProps}>
          <Grid>
            <GridItem md={12}>
              <TextContent {...TitleProps} {...RightTitleProps}>
                <Text component={TextVariants.h6}>{rightTitle}</Text>
              </TextContent>
            </GridItem>
            <GridItem md={12}>
              <InternalToolbar
                sortDirection={state.sortRightDesc}
                onSort={sortValues}
                onFilter={filterValues}
                value={state.filterValue}
                placeholder={filterValueTitle}
                id={`${input.name}-value-toolbar`}
                ToolbarProps={ToolbarProps}
                SideToolbarProps={RightToolbarProps}
                FilterFieldProps={FilterFieldProps}
                SideFilterFieldProps={RightFilterFieldProps}
                SearchIconProps={SearchIconProps}
                SideSearchIconProps={RightSearchIconProps}
                SearchIconButtonProps={SearchIconButtonProps}
                SideSearchIconButtonProps={RightSearchIconButtonProps}
                SortIconButtonProps={SortIconButtonProps}
                SideSortIconButtonProps={RightSortIconButtonProps}
                SortIconProps={SortIconProps}
                SideSortIconProps={RightSortIconProps}
              />
            </GridItem>
            {renderStatus && (
              <GridItem md={12}>
                <TextContent>
                  <Text data-test-id="right-status-text" component={TextVariants.h6}>
                    {renderStatus({
                      selected: state.selectedRightValues.length,
                      options: rightValues.length
                    })}
                  </Text>
                </TextContent>
              </GridItem>
            )}
            <GridItem md={12}>
              <List
                optionClick={handleValuesClick}
                value={rightValues}
                noOptionsTitle={noValueTitle}
                filterValue={state.filterValue}
                filterValueText={filterValueText}
                selectedValues={state.selectedRightValues}
                ListProps={{ ...ListProps, ...RightListProps }}
                ListItemProps={{ ...ListItemProps, ...RightListItemProps }}
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Grid>
  </FormGroup>
);

DualList.propTypes = {
  leftTitle: PropTypes.node,
  rightTitle: PropTypes.node,
  moveLeftTitle: PropTypes.node,
  moveRightTitle: PropTypes.node,
  allToLeft: PropTypes.bool,
  allToRight: PropTypes.bool,
  moveAllLeftTitle: PropTypes.node,
  moveAllRightTitle: PropTypes.node,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  noValueTitle: PropTypes.node,
  noOptionsTitle: PropTypes.node,
  filterOptionsTitle: PropTypes.node,
  filterValueTitle: PropTypes.node,
  filterValueText: PropTypes.node,
  filterOptionsText: PropTypes.node,
  description: PropTypes.node,
  hideLabel: PropTypes.bool,
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired
  }),
  meta: PropTypes.any,
  state: PropTypes.object,
  sortOptions: PropTypes.func,
  filterOptions: PropTypes.func,
  handleOptionsClick: PropTypes.func,
  leftValues: PropTypes.array,
  handleMoveRight: PropTypes.func,
  handleMoveLeft: PropTypes.func,
  handleClearLeftValues: PropTypes.func,
  handleClearRightValues: PropTypes.func,
  sortValues: PropTypes.func,
  filterValues: PropTypes.func,
  rightValues: PropTypes.array,
  handleValuesClick: PropTypes.func,
  renderStatus: PropTypes.func,
  FormGroupProps: PropTypes.object,
  ListProps: PropTypes.object,
  LeftListProps: PropTypes.object,
  RightListProps: PropTypes.object,
  ListItemProps: PropTypes.object,
  LeftListItemProps: PropTypes.object,
  RightListItemProps: PropTypes.object,
  ToolbarProps: PropTypes.object,
  LeftToolbarProps: PropTypes.object,
  RightToolbarProps: PropTypes.object,
  FilterFieldProps: PropTypes.object,
  LeftFilterFieldProps: PropTypes.object,
  RightFilterFieldProps: PropTypes.object,
  SortIconButtonProps: PropTypes.object,
  LeftSortIconButtonProps: PropTypes.object,
  RightSortIconButtonProps: PropTypes.object,
  SearchIconProps: PropTypes.object,
  LeftSearchIconProps: PropTypes.object,
  RightSearchIconProps: PropTypes.object,
  SearchIconButtonProps: PropTypes.object,
  LeftSearchIconButtonProps: PropTypes.object,
  RightSearchIconButtonProps: PropTypes.object,
  SortIconProps: PropTypes.object,
  LeftSortIconProps: PropTypes.object,
  RightSortIconProps: PropTypes.object,
  InternalGridProps: PropTypes.object,
  ListGridProps: PropTypes.object,
  LeftListGridProps: PropTypes.object,
  RightListGridProps: PropTypes.object,
  TitleProps: PropTypes.object,
  LeftTitleProps: PropTypes.object,
  RightTitleProps: PropTypes.object,
  ButtonsGridProps: PropTypes.object,
  ButtonsInternalFlexProps: PropTypes.object,
  ButtonFlexProps: PropTypes.object,
  ToRightFlexProps: PropTypes.object,
  IconButtonProps: PropTypes.object,
  ToRightIconButtonProps: PropTypes.object,
  IconProps: PropTypes.object,
  AllToRightFlexProps: PropTypes.object,
  AllToRightIconButtonProps: PropTypes.object,
  AllToLeftFlexProps: PropTypes.object,
  AllToLeftIconButtonProps: PropTypes.object,
  ToLeftFlexProps: PropTypes.object,
  ToLeftIconButtonProps: PropTypes.object,
  ToRightIconProps: PropTypes.object,
  AllToRightIconProps: PropTypes.object,
  AllToLeftIconProps: PropTypes.object,
  ToLeftIconProps: PropTypes.object
};

DualList.defaultProps = {
  leftTitle: 'Options',
  rightTitle: 'Selected',
  moveLeftTitle: 'Move selected to left',
  moveRightTitle: 'Move selected to right',
  moveAllRightTitle: 'Move all to right',
  moveAllLeftTitle: 'Move all to left',
  noOptionsTitle: 'No available options',
  noValueTitle: 'No selected',
  filterOptionsTitle: 'Filter options',
  filterValueTitle: 'Filter selected value',
  filterOptionsText: 'Remove your filter to see all options',
  filterValueText: 'Remove your filter to see all selected',
  options: [],
  allToLeft: true,
  allToRight: true
};

const DualListSelectWrapper = (props) => <DualListSelectCommon {...props} DualListSelect={DualList} />;

export default DualListSelectWrapper;
