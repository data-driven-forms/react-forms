import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import {
  TextInput,
  InputGroup,
  Bullseye,
  Button,
  ButtonVariant,
  FormGroup,
  Grid,
  GridItem,
  Text,
  TextVariants,
  TextContent
} from '@patternfly/react-core';

import { DataToolbar, DataToolbarItem, DataToolbarContent } from '@patternfly/react-core/dist/js/experimental';

import {
  SortAlphaDownIcon,
  SortAlphaUpIcon,
  SearchIcon,
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleRightIcon,
  AngleLeftIcon
} from '@patternfly/react-icons';

import { useFieldApi } from '@data-driven-forms/react-form-renderer';

import './dual-list-select.scss';

const getOptionsGroup = (value, lastClicked, options) => {
  const lastIndex = options.map(({ value }) => value.toString()).indexOf(lastClicked.toString());
  const currentIndex = options.map(({ value }) => value.toString()).indexOf(value);
  const startIndex = Math.min(lastIndex, currentIndex);
  const endIndex = Math.max(lastIndex, currentIndex) + 1;
  return [...options.slice(startIndex, endIndex).map(({ value }) => value.toString())];
};

const List = ({ value, optionClick, noOptionsTitle, filterValue, filterValueText, ...rest }) => (
  <select className="pf-c-form-control pf-u-pr-sm ddorg__pf4-component-mapper__dual-list-select" multiple {...rest}>
    {value.length < 1 && (
      <option className="ddorg__pf4-component-mapper__dual-list-select-option" disabled>
        {filterValue ? filterValueText : noOptionsTitle}
      </option>
    )}
    {value.length > 0 &&
      value.map(({ value, label }) => (
        <option onClick={optionClick} key={value} value={value}>
          {label}
        </option>
      ))}
  </select>
);

List.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  optionClick: PropTypes.func.isRequired,
  noOptionsTitle: PropTypes.string,
  filterValue: PropTypes.string,
  filterValueText: PropTypes.string
};

List.defaultProps = {
  value: []
};

const Toolbar = ({ sortTitle, onFilter, onSort, sortDirection, value, placeholder, id }) => (
  <DataToolbar className="pf-u-p-0 ddorg__pf4-component-mapper__dual-list-select-toolbar" id={id}>
    <DataToolbarContent className="pf-u-p-0 pf-u-pb-md">
      <DataToolbarItem>
        <InputGroup>
          <TextInput
            name="filterOptions"
            id="filterOptions"
            type="search"
            aria-label={placeholder}
            onChange={onFilter}
            placeholder={placeholder}
            value={value}
          />
          <Button variant={ButtonVariant.control} aria-label="search button">
            <SearchIcon />
          </Button>
        </InputGroup>
      </DataToolbarItem>
      <DataToolbarItem>
        <Button onClick={onSort} title={sortTitle} variant="plain">
          {!sortDirection ? <SortAlphaDownIcon size="md" /> : <SortAlphaUpIcon size="md" />}
        </Button>
      </DataToolbarItem>
    </DataToolbarContent>
  </DataToolbar>
);

Toolbar.propTypes = {
  sortTitle: PropTypes.node,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortDirection: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string
};

const reducer = (state, { type, value, values, isRight }) => {
  switch (type) {
    case 'setSelectedValue':
      return {
        ...state,
        ...(isRight ? { selectedLeftValues: values } : { selectedRightValues: values }),
        ...(isRight ? { lastLeftClicked: value } : { lastRightClicked: value })
      };
    case 'setFilterValue':
      return {
        ...state,
        filterValue: value
      };
    case 'setFilterOptions':
      return {
        ...state,
        filterOptions: value
      };
    case 'sortValue':
      return {
        ...state,
        sortRightDesc: !state.sortRightDesc
      };
    case 'sortOptions':
      return {
        ...state,
        sortLeftDesc: !state.sortLeftDesc
      };
    case 'clearRightValues':
      return {
        ...state,
        selectedRightValues: []
      };
    case 'clearLeftOptions':
      return {
        ...state,
        selectedLeftValues: []
      };
    default:
      return state;
  }
};

const initialState = {
  lastLeftClicked: undefined,
  selectedLeftValues: [],
  lastRightClicked: undefined,
  selectedRightValues: [],
  sortLeftDesc: true,
  sortRightDesc: true,
  filterOptions: '',
  filterValue: ''
};

const DualList = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    meta: { error, touched },
    clearRightValue,
    clearLeftValues,
    input: { onChange, value, name },
    leftTitle,
    moveAllLeftTitle,
    moveAllRightTitle,
    moveRightTitle,
    moveLeftTitle,
    options,
    rightTitle,
    size,
    label,
    isRequired,
    helperText,
    noValueTitle,
    noOptionsTitle,
    filterOptionsTitle,
    filterValueTitle,
    filterValueText,
    filterOptionsText,
    ...rest
  } = useFieldApi({
    ...props,
    isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort())
  });

  const showError = touched && error;

  const handleOptionClicked = (event, options, isRight) => {
    const {
      target: { value }
    } = event;
    const selectedKey = isRight ? 'selectedLeftValues' : 'selectedRightValues';
    const lastKey = isRight ? 'lastLeftClicked' : 'lastRightClicked';
    if (event.shiftKey && state[lastKey]) {
      dispatch({ type: 'setSelectedValue', value, values: getOptionsGroup(value, state[lastKey], options), isRight });
    } else if (event.ctrlKey && state[lastKey]) {
      const selectedValues = state[selectedKey].includes(value)
        ? state[selectedKey].filter((item) => item !== value)
        : [...state[selectedKey], value];

      dispatch({ type: 'setSelectedValue', value, values: selectedValues, isRight });
    } else {
      dispatch({ type: 'setSelectedValue', value, values: [value], isRight });
    }
  };

  const handleMoveRight = () => {
    onChange([...value, ...state.selectedLeftValues]);
    dispatch({ type: 'clearLeftOptions' });
  };

  const handleMoveLeft = () => {
    onChange(value.filter((value) => !state.selectedRightValues.includes(value)));
    dispatch({ type: 'clearRightValues' });
  };

  const leftValues = options
    .filter((option) => !value.includes(option.value) && option.label.includes(state.filterOptions))
    .sort((a, b) => (state.sortLeftDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));
  const rightValues = options
    .filter((option) => value.includes(option.value) && option.label.includes(state.filterValue))
    .sort((a, b) => (state.sortRightDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));

  return (
    <FormGroup
      isRequired={isRequired}
      label={label}
      fieldId={rest.id || name}
      isValid={!showError}
      helperText={helperText}
      helperTextInvalid={error}
      {...rest}
    >
      <Grid>
        <Grid>
          <GridItem md={5}>
            <Grid>
              <GridItem md={12}>
                <TextContent>
                  <Text component={TextVariants.h6}>{leftTitle}</Text>
                </TextContent>
              </GridItem>
              <GridItem md={12}>
                <Toolbar
                  sortDirection={state.sortLeftDesc}
                  onSort={() => dispatch({ type: 'sortOptions' })}
                  onFilter={(value) => dispatch({ type: 'setFilterOptions', value })}
                  value={state.filterOptions}
                  placeholder={filterOptionsTitle}
                  id={`${name}-options-toolbar`}
                />
              </GridItem>
              <GridItem md={12}>
                <List
                  size={size}
                  optionClick={(event) => handleOptionClicked(event, leftValues, true)}
                  value={leftValues}
                  noOptionsTitle={noOptionsTitle}
                  filterValue={state.filterOptions}
                  filterValueText={filterOptionsText}
                />
              </GridItem>
            </Grid>
          </GridItem>
          <GridItem md={2}>
            <Bullseye>
              <Grid>
                <GridItem md={12} sm={3}>
                  <Button disabled={leftValues.length === 0} onClick={handleMoveRight} title={moveRightTitle} variant="plain">
                    <AngleRightIcon size="md" />
                  </Button>
                </GridItem>
                {clearLeftValues && (
                  <GridItem md={12} sm={3}>
                    <Button
                      disabled={leftValues.length === 0}
                      onClick={() => {
                        dispatch({ type: 'clearLeftValues' });
                        onChange([...value, ...leftValues.map(({ value }) => value)]);
                      }}
                      title={moveAllRightTitle}
                      variant="plain"
                    >
                      <AngleDoubleRightIcon size="md" />
                    </Button>
                  </GridItem>
                )}
                {clearRightValue && (
                  <GridItem md={12} sm={3}>
                    <Button
                      disabled={rightValues.length === 0}
                      onClick={() => {
                        dispatch({ type: 'clearRightValue' });
                        onChange([...value.filter((val) => !rightValues.find(({ value }) => val === value))]);
                      }}
                      title={moveAllLeftTitle}
                      variant="plain"
                    >
                      <AngleDoubleLeftIcon size="md" />
                    </Button>
                  </GridItem>
                )}
                <GridItem md={12} sm={3}>
                  <Button disabled={rightValues.length === 0} onClick={handleMoveLeft} title={moveLeftTitle} variant="plain">
                    <AngleLeftIcon size="md" />
                  </Button>
                </GridItem>
              </Grid>
            </Bullseye>
          </GridItem>
          <GridItem md={5}>
            <Grid>
              <GridItem md={12}>
                <TextContent>
                  <Text component={TextVariants.h6}>{rightTitle}</Text>
                </TextContent>
              </GridItem>
              <GridItem md={12}>
                <Toolbar
                  sortDirection={state.sortRightDesc}
                  onSort={() => dispatch({ type: 'sortValue' })}
                  onFilter={(value) => dispatch({ type: 'setFilterValue', value })}
                  value={state.filterValue}
                  placeholder={filterValueTitle}
                  id={`${name}-value-toolbar`}
                />
              </GridItem>
              <GridItem md={12}>
                <List
                  size={size}
                  optionClick={(event) => handleOptionClicked(event, rightValues, false)}
                  value={rightValues}
                  noOptionsTitle={noValueTitle}
                  filterValue={state.filterValue}
                  filterValueText={filterValueText}
                />
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

DualList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ),
  leftTitle: PropTypes.string,
  rightTitle: PropTypes.string,
  size: PropTypes.number,
  moveLeftTitle: PropTypes.string,
  moveRightTitle: PropTypes.string,
  clearRightValue: PropTypes.bool,
  clearLeftValues: PropTypes.bool,
  moveAllLeftTitle: PropTypes.string,
  moveAllRightTitle: PropTypes.string,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  helperText: PropTypes.node,
  noValueTitle: PropTypes.string,
  noOptionsTitle: PropTypes.string,
  filterOptionsTitle: PropTypes.string,
  filterValueTitle: PropTypes.string,
  filterValueText: PropTypes.string,
  filterOptionsText: PropTypes.string
};

DualList.defaultProps = {
  leftTitle: 'Options',
  rightTitle: 'Selected',
  size: 15,
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
  clearRightValue: true,
  clearLeftValues: true
};

export default DualList;
