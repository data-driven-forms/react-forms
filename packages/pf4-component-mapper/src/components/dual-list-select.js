import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { meta } from '@data-driven-forms/common/src/prop-types-templates';

import { Grid, GridItem } from '@patternfly/react-core/dist/js/layouts/Grid/index';

import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { FormGroup } from '@patternfly/react-core/dist/js/components/Form/FormGroup';
import { Button, ButtonVariant } from '@patternfly/react-core/dist/js/components/Button/Button';
import { Bullseye } from '@patternfly/react-core/dist/js/layouts/Bullseye/Bullseye';
import { InputGroup } from '@patternfly/react-core/dist/js/components/InputGroup/InputGroup';
import { TextInput } from '@patternfly/react-core/dist/js/components/TextInput/TextInput';

import { DataToolbar, DataToolbarItem, DataToolbarContent } from '@patternfly/react-core/dist/js/experimental';

import AngleRightIcon from '@patternfly/react-icons/dist/js/icons/angle-right-icon';
import AngleLeftIcon from '@patternfly/react-icons/dist/js/icons/angle-left-icon';
import AngleDoubleRightIcon from '@patternfly/react-icons/dist/js/icons/angle-double-right-icon';
import AngleDoubleLeftIcon from '@patternfly/react-icons/dist/js/icons/angle-double-left-icon';
import SearchIcon from '@patternfly/react-icons/dist/js/icons/search-icon';

import SortAlphaUp from '@patternfly/react-icons/dist/js/icons/sort-alpha-up-icon';
import SortAlphaDown from '@patternfly/react-icons/dist/js/icons/sort-alpha-down-icon';

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
          {!sortDirection ? <SortAlphaDown size="md" /> : <SortAlphaUp size="md" />}
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

class DualList extends Component {
  state = {
    lastLeftClicked: undefined,
    selectedLeftValues: [],
    lastRightClicked: undefined,
    selectedRightValues: [],
    sortLeftDesc: true,
    sortRightDesc: true,
    filterOptions: '',
    filterValue: ''
  };

  handleOptionClicked = (event, options, isRight) => {
    const {
      target: { value }
    } = event;
    const selectedKey = isRight ? 'selectedLeftValues' : 'selectedRightValues';
    const lastKey = isRight ? 'lastLeftClicked' : 'lastRightClicked';
    if (event.shiftKey && this.state[lastKey]) {
      this.setState((prevState) => ({ [selectedKey]: getOptionsGroup(value, prevState[lastKey], options) }));
    } else if (event.ctrlKey && this.state[lastKey]) {
      this.setState((prevState) => {
        const selectedValues = prevState[selectedKey].includes(value)
          ? prevState[selectedKey].filter((item) => item !== value)
          : [...prevState[selectedKey], value];
        return { [selectedKey]: selectedValues };
      });
    } else {
      this.setState({ [selectedKey]: [value] });
    }

    this.setState({ [lastKey]: value });
  };

  handleMoveRight = () => {
    this.props.input.onChange([...this.props.input.value, ...this.state.selectedLeftValues]);
    this.setState({ selectedLeftValues: [] });
  };

  handleMoveLeft = () => {
    this.props.input.onChange(this.props.input.value.filter((value) => !this.state.selectedRightValues.includes(value)));
    this.setState({ selectedRightValues: [] });
  };

  getOptions = () =>
    this.props.options
      .filter((option) => !this.props.input.value.includes(option.value) && option.label.includes(this.state.filterOptions))
      .sort((a, b) => (this.state.sortLeftDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));

  getValue = () =>
    this.props.options
      .filter((option) => this.props.input.value.includes(option.value) && option.label.includes(this.state.filterValue))
      .sort((a, b) => (this.state.sortRightDesc ? a.label.localeCompare(b.label) : b.label.localeCompare(a.label)));

  render() {
    const {
      allToLeft,
      allToRight,
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
      meta,
      helperText,
      noValueTitle,
      noOptionsTitle,
      filterOptionsTitle,
      filterValueTitle,
      filterValueText,
      filterOptionsText,
      formOptions: _formOptions,
      FormSpyProvider: _FormSpyProvider,
      ...rest
    } = this.props;
    const { error, touched } = meta;
    const showError = touched && error;

    const leftValues = this.getOptions();
    const rightValues = this.getValue();

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
                    sortDirection={this.state.sortLeftDesc}
                    onSort={() => this.setState((prevState) => ({ sortLeftDesc: !prevState.sortLeftDesc }))}
                    onFilter={(value) => this.setState({ filterOptions: value })}
                    value={this.state.filterOptions}
                    placeholder={filterOptionsTitle}
                    id={`${name}-options-toolbar`}
                  />
                </GridItem>
                <GridItem md={12}>
                  <List
                    size={size}
                    optionClick={(event) => this.handleOptionClicked(event, leftValues, true)}
                    value={leftValues}
                    noOptionsTitle={noOptionsTitle}
                    filterValue={this.state.filterOptions}
                    filterValueText={filterOptionsText}
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem md={2}>
              <Bullseye>
                <Grid>
                  <GridItem md={12} sm={3}>
                    <Button disabled={leftValues.length === 0} onClick={this.handleMoveRight} title={moveRightTitle} variant="plain">
                      <AngleRightIcon size="md" />
                    </Button>
                  </GridItem>
                  {allToRight && (
                    <GridItem md={12} sm={3}>
                      <Button
                        disabled={leftValues.length === 0}
                        onClick={() => this.setState({ selectedLeftValues: [] }, () => onChange([...value, ...leftValues.map(({ value }) => value)]))}
                        title={moveAllRightTitle}
                        variant="plain"
                      >
                        <AngleDoubleRightIcon size="md" />
                      </Button>
                    </GridItem>
                  )}
                  {allToLeft && (
                    <GridItem md={12} sm={3}>
                      <Button
                        disabled={rightValues.length === 0}
                        onClick={() =>
                          this.setState({ selectedRightValues: [] }, () =>
                            onChange([...value.filter((val) => !rightValues.find(({ value }) => val === value))])
                          )
                        }
                        title={moveAllLeftTitle}
                        variant="plain"
                      >
                        <AngleDoubleLeftIcon size="md" />
                      </Button>
                    </GridItem>
                  )}
                  <GridItem md={12} sm={3}>
                    <Button disabled={rightValues.length === 0} onClick={this.handleMoveLeft} title={moveLeftTitle} variant="plain">
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
                    sortDirection={this.state.sortRightDesc}
                    onSort={() => this.setState((prevState) => ({ sortRightDesc: !prevState.sortRightDesc }))}
                    onFilter={(value) => this.setState({ filterValue: value })}
                    value={this.state.filterValue}
                    placeholder={filterValueTitle}
                    id={`${name}-value-toolbar`}
                  />
                </GridItem>
                <GridItem md={12}>
                  <List
                    size={size}
                    optionClick={(event) => this.handleOptionClicked(event, rightValues, false)}
                    value={rightValues}
                    noOptionsTitle={noValueTitle}
                    filterValue={this.state.filterValue}
                    filterValueText={filterValueText}
                  />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Grid>
      </FormGroup>
    );
  }
}

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
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  allToLeft: PropTypes.bool,
  allToRight: PropTypes.bool,
  moveAllLeftTitle: PropTypes.string,
  moveAllRightTitle: PropTypes.string,
  label: PropTypes.node,
  isRequired: PropTypes.bool,
  meta,
  helperText: PropTypes.node,
  noValueTitle: PropTypes.string,
  noOptionsTitle: PropTypes.string,
  filterOptionsTitle: PropTypes.string,
  filterValueTitle: PropTypes.string,
  filterValueText: PropTypes.string,
  filterOptionsText: PropTypes.string,
  formOptions: PropTypes.any,
  FormSpyProvider: PropTypes.any
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
  allToLeft: true,
  allToRight: true
};

const WrappedDualList = (props) => {
  const { input, meta, ...rest } = useFieldApi({
    ...props,
    isEqual: (current, initial) => isEqual([...(current || [])].sort(), [...(initial || [])].sort())
  });

  return <DualList {...rest} input={input} meta={meta} />;
};

WrappedDualList.propTypes = {
  FieldProvider: PropTypes.func.isRequired
};

export default WrappedDualList;
