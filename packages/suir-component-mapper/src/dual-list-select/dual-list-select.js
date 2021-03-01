import React from 'react';
import PropTypes from 'prop-types';

import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';
import { Button, Grid, GridColumn, Input, Segment, Header } from 'semantic-ui-react';
import FormField from '../form-field';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import FormFieldGrid from '../form-field-grid';
import { validationError, validationWarning } from '../common/helpers';

const useListStyles = createUseStyles({
  root: {
    padding: '.25em'
  },
  selected: {
    color: 'white',
    background: '#2185d0'
  }
});

const List = ({
  value,
  optionClick,
  noOptionsTitle,
  filterValue,
  filterValueText,
  selectedValues,
  OptionProps: { className, selectedClassName, ...OptionProps },
  ...rest
}) => {
  const classes = useListStyles();
  return (
    <Segment {...rest}>
      {value.length < 1 && <div>{filterValue ? filterValueText : noOptionsTitle}</div>}
      {value.length > 0 &&
        value.map(({ value, label }) => (
          <div
            className={clsx(classes.root, className, {
              [classes.selected]: selectedValues.includes(value),
              [selectedClassName]: selectedValues.includes(value)
            })}
            {...OptionProps}
            onClick={(e) => optionClick(e, value)}
            key={value}
            value={value}
          >
            {label}
          </div>
        ))}
    </Segment>
  );
};

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
  OptionProps: PropTypes.shape({ className: PropTypes.string, selectedClassName: PropTypes.string })
};

List.defaultProps = {
  value: [],
  OptionProps: {}
};

const Toolbar = ({ sortTitle, onFilter, onSort, sortDirection, value, placeholder, id, sortUpIcon, sortDownIcon, ...rest }) => (
  <div id={id}>
    <Input
      name="filterOptions"
      id="filterOptions"
      type="search"
      icon="search"
      iconPosition="left"
      aria-label={placeholder}
      onChange={({ target: { value } }) => onFilter(value)}
      placeholder={placeholder}
      action={<Button type="button" onClick={onSort} title={sortTitle} icon={sortDirection ? sortUpIcon : sortDownIcon} />}
      {...rest}
    />
  </div>
);

Toolbar.propTypes = {
  sortTitle: PropTypes.node,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  sortDirection: PropTypes.bool,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  sortUpIcon: PropTypes.string,
  sortDownIcon: PropTypes.string
};

Toolbar.defaultProps = {
  sortUpIcon: 'sort amount up',
  sortDownIcon: 'sort amount down'
};

const useDualListStyles = createUseStyles({
  dualListButtons: {
    display: 'flex !important',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  transferButton: {
    display: 'block !important',
    margin: 'auto !important'
  },
  formField: {
    '&>label': {
      display: 'inline-block !important'
    }
  },
  '@media screen and (max-width: 767px)': {
    transferButton: {
      transform: 'rotate(90deg)'
    }
  }
});

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
  id,
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
  validateOnMount,
  OptionsListProps,
  OptionProps,
  LabelProps: { className: labelClassName, error: labelError, ...LabelProps },
  ToolbarProps,
  ButtonGridProps: { className: buttonGridClassName, ...ButtonGridProps },
  RightButtonProps,
  DoubleRightButtonProps,
  LeftButtonProps,
  DoubleLeftButtonProps,
  OptionsHeaderProps,
  ValuesHeaderProps,
  HelperTextProps,
  FormFieldGridProps
}) => {
  const invalid = validationError(meta, validateOnMount);
  const classes = useDualListStyles();
  return (
    <FormFieldGrid helperText={validationWarning(meta, validateOnMount) || helperText} HelperTextProps={HelperTextProps} {...FormFieldGridProps}>
      <FormField
        label={label}
        required={isRequired}
        error={
          invalid && {
            content: meta.error || meta.submitError,
            pointing: 'left',
            ...labelError
          }
        }
        id={id || input.name}
        control={(props) => null}
        {...LabelProps}
        className={clsx(classes.formField, labelClassName)}
      />
      <Grid key="0">
        <GridColumn mobile={16} tablet={7} computer={7}>
          <Grid>
            <GridColumn mobile={16} tablet={16}>
              <Header sub {...OptionsHeaderProps}>
                {leftTitle}
              </Header>
            </GridColumn>
            <GridColumn mobile={16} tablet={16}>
              <Toolbar
                sortDirection={state.sortLeftDesc}
                onSort={sortOptions}
                onFilter={filterOptions}
                value={state.filterOptions}
                placeholder={filterOptionsTitle}
                id={`${input.name}-options-toolbar`}
                {...ToolbarProps}
              />
            </GridColumn>
            <GridColumn mobile={16} tablet={16}>
              <List
                {...OptionsListProps}
                OptionProps={OptionProps}
                optionClick={handleOptionsClick}
                value={leftValues}
                noOptionsTitle={noOptionsTitle}
                filterValue={state.filterOptions}
                filterValueText={filterOptionsText}
                selectedValues={state.selectedLeftValues}
              />
            </GridColumn>
          </Grid>
        </GridColumn>
        <GridColumn className={clsx(classes.dualListButtons, buttonGridClassName)} {...ButtonGridProps} mobile={16} tablet={2} computer={2}>
          <Grid>
            <GridColumn tablet={16} mobile={4}>
              <Button
                className={classes.transferButton}
                icon="angle right"
                {...RightButtonProps}
                type="button"
                disabled={leftValues.length === 0}
                onClick={handleMoveRight}
                title={moveRightTitle}
              />
            </GridColumn>
            {allToRight && (
              <GridColumn tablet={16} mobile={4}>
                <Button
                  className={classes.transferButton}
                  icon="angle double right"
                  {...DoubleRightButtonProps}
                  type="button"
                  disabled={leftValues.length === 0}
                  onClick={handleClearLeftValues}
                  title={moveAllRightTitle}
                />
              </GridColumn>
            )}
            {allToLeft && (
              <GridColumn tablet={16} mobile={4}>
                <Button
                  className={classes.transferButton}
                  icon="angle double left"
                  {...LeftButtonProps}
                  type="button"
                  disabled={rightValues.length === 0}
                  onClick={handleClearRightValues}
                  title={moveAllLeftTitle}
                />
              </GridColumn>
            )}
            <GridColumn tablet={16} mobile={4}>
              <Button
                className={classes.transferButton}
                icon="angle left"
                {...DoubleLeftButtonProps}
                type="button"
                disabled={rightValues.length === 0}
                onClick={handleMoveLeft}
                title={moveLeftTitle}
              />
            </GridColumn>
          </Grid>
        </GridColumn>
        <GridColumn mobile={16} tablet={7} computer={7}>
          <Grid>
            <GridColumn tablet={16}>
              <Header sub {...ValuesHeaderProps}>
                {rightTitle}
              </Header>
            </GridColumn>
            <GridColumn tablet={16}>
              <Toolbar
                sortDirection={state.sortRightDesc}
                onSort={sortValues}
                onFilter={filterValues}
                value={state.filterValue}
                placeholder={filterValueTitle}
                id={`${input.name}-value-toolbar`}
                {...ToolbarProps}
              />
            </GridColumn>
            <GridColumn tablet={16}>
              <List
                {...OptionsListProps}
                OptionProps={OptionProps}
                optionClick={handleValuesClick}
                value={rightValues}
                noOptionsTitle={noValueTitle}
                filterValue={state.filterValue}
                filterValueText={filterValueText}
                selectedValues={state.selectedRightValues}
              />
            </GridColumn>
          </Grid>
        </GridColumn>
      </Grid>
    </FormFieldGrid>
  );
};

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
  validateOnMount: PropTypes.bool,
  /** Sub components customization API */
  OptionsListProps: PropTypes.object,
  OptionProps: PropTypes.object,
  LabelProps: PropTypes.shape({ error: PropTypes.object, className: PropTypes.string }),
  ToolbarProps: PropTypes.object,
  ButtonGridProps: PropTypes.shape({ className: PropTypes.string }),
  RightButtonProps: PropTypes.object,
  DoubleRightButtonProps: PropTypes.object,
  LeftButtonProps: PropTypes.object,
  DoubleLeftButtonProps: PropTypes.object,
  OptionsHeaderProps: PropTypes.object,
  ValuesHeaderProps: PropTypes.object,
  HelperTextProps: PropTypes.object,
  FormFieldGridProps: PropTypes.object
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
  allToRight: true,
  OptionsListProps: {},
  OptionProps: {},
  LabelProps: {},
  ToolbarProps: {},
  ButtonGridProps: {},
  RightButtonProps: {},
  DoubleRightButtonProps: {},
  LeftButtonProps: {},
  DoubleLeftButtonProps: {},
  OptionsHeaderProps: {},
  ValuesHeaderProps: {},
  HelperTextProps: {},
  FormFieldGridProps: {}
};

const DualListSelectWrapper = (props) => <DualListSelectCommon {...props} DualListSelect={DualList} />;

export default DualListSelectWrapper;
