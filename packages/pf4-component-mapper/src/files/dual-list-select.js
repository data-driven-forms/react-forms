import React from 'react';
import PropTypes from 'prop-types';

import {
  TextInput,
  InputGroup,
  Bullseye,
  Button,
  ButtonVariant,
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
  SortAlphaDownIcon,
  SortAlphaUpIcon,
  SearchIcon,
  AngleDoubleLeftIcon,
  AngleDoubleRightIcon,
  AngleRightIcon,
  AngleLeftIcon
} from '@patternfly/react-icons';

import './dual-list-select.scss';
import DualListSelectCommon from '../../../common/src/dual-list-select';
import FormGroup from '../common/form-group';

const List = ({ value, optionClick, noOptionsTitle, filterValue, filterValueText, selectedValues, ...rest }) => (
  <div className="pf-c-form-control pf-u-pr-sm ddorg__pf4-component-mapper__dual-list-select" {...rest}>
    {value.length < 1 && (
      <div className="ddorg__pf4-component-mapper__dual-list-select-option-text ddorg__pf4-component-mapper__dual-list-select-option-disabled">
        {filterValue ? filterValueText : noOptionsTitle}
      </div>
    )}
    {value.length > 0 &&
      value.map(({ value, label }) => (
        <div
          onClick={(e) => optionClick(e, value)}
          key={value}
          value={value}
          className={`ddorg__pf4-component-mapper__dual-list-select-option ${
            selectedValues.includes(value) ? 'ddorg__pf4-component-mapper__dual-list-select-option-selected' : ''
          }`}
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
  selectedValues: PropTypes.array
};

List.defaultProps = {
  value: []
};

const InternalToolbar = ({ sortTitle, onFilter, onSort, sortDirection, value, placeholder, id }) => (
  <Toolbar className="pf-u-p-0 ddorg__pf4-component-mapper__dual-list-select-toolbar" id={id}>
    <ToolbarContent className="pf-u-p-0 pf-u-pb-md">
      <ToolbarItem>
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
      </ToolbarItem>
      <ToolbarItem>
        <Button onClick={onSort} title={sortTitle} variant="plain">
          {!sortDirection ? <SortAlphaDownIcon size="md" /> : <SortAlphaUpIcon size="md" />}
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
  id: PropTypes.string
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
  renderStatus
}) => (
  <FormGroup
    label={label}
    isRequired={isRequired}
    helperText={helperText}
    meta={meta}
    description={description}
    hideLabel={hideLabel}
    id={id || input.name}
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
              <InternalToolbar
                sortDirection={state.sortLeftDesc}
                onSort={sortOptions}
                onFilter={filterOptions}
                value={state.filterOptions}
                placeholder={filterOptionsTitle}
                id={`${input.name}-options-toolbar`}
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
              {allToRight && (
                <GridItem md={12} sm={3}>
                  <Button disabled={leftValues.length === 0} onClick={handleClearLeftValues} title={moveAllRightTitle} variant="plain">
                    <AngleDoubleRightIcon size="md" />
                  </Button>
                </GridItem>
              )}
              {allToLeft && (
                <GridItem md={12} sm={3}>
                  <Button disabled={rightValues.length === 0} onClick={handleClearRightValues} title={moveAllLeftTitle} variant="plain">
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
              <InternalToolbar
                sortDirection={state.sortRightDesc}
                onSort={sortValues}
                onFilter={filterValues}
                value={state.filterValue}
                placeholder={filterValueTitle}
                id={`${input.name}-value-toolbar`}
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
  renderStatus: PropTypes.func
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
