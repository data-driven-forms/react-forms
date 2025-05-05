import React from 'react';

import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';
import { Button, Grid, GridColumn, Input, Segment, Header } from 'semantic-ui-react';
import FormField from '../form-field';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';
import FormFieldGrid from '../form-field-grid';
import { validationError, validationWarning } from '../helpers/helpers';

const useListStyles = createUseStyles({
  root: {
    padding: '.25em',
  },
  selected: {
    color: 'white',
    background: '#2185d0',
  },
});

const List = ({
  value = [],
  optionClick,
  noOptionsTitle,
  filterValue,
  filterValueText,
  selectedValues,
  OptionProps: { className, selectedClassName, ...OptionProps } = {},
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
              [selectedClassName]: selectedValues.includes(value),
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

const Toolbar = ({
  sortTitle,
  onFilter,
  onSort,
  sortDirection,
  value,
  placeholder,
  id,
  sortUpIcon = 'sort amount up',
  sortDownIcon = 'sort amount down',
  ...rest
}) => (
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

const useDualListStyles = createUseStyles({
  dualListButtons: {
    display: 'flex !important',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  transferButton: {
    display: 'block !important',
    margin: 'auto !important',
  },
  formField: {
    '&>label': {
      display: 'inline-block !important',
    },
  },
  '@media screen and (max-width: 767px)': {
    transferButton: {
      transform: 'rotate(90deg)',
    },
  },
});

const DualList = ({
  meta,
  input,
  label,
  isRequired,
  helperText,
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
  LabelProps: { className: labelClassName, error: labelError, ...LabelProps } = {},
  ButtonGridProps: { className: buttonGridClassName, ...ButtonGridProps } = {},
  leftTitle = 'Options',
  rightTitle = 'Selected',
  moveLeftTitle = 'Move selected to left',
  moveRightTitle = 'Move selected to right',
  moveAllRightTitle = 'Move all to right',
  moveAllLeftTitle = 'Move all to left',
  noOptionsTitle = 'No available options',
  noValueTitle = 'No selected',
  filterOptionsTitle = 'Filter options',
  filterValueTitle = 'Filter selected value',
  filterOptionsText = 'Remove your filter to see all options',
  filterValueText = 'Remove your filter to see all selected',
  leftSortTitle = 'Sort options',
  rightSortTitle = 'Sort value',
  allToLeft = true,
  allToRight = true,
  OptionsListProps = {},
  OptionProps = {},
  ToolbarProps = {},
  RightButtonProps = {},
  DoubleRightButtonProps = {},
  LeftButtonProps = {},
  DoubleLeftButtonProps = {},
  OptionsHeaderProps = {},
  ValuesHeaderProps = {},
  HelperTextProps = {},
  FormFieldGridProps = {},
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
            ...labelError,
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
                sortTitle={leftSortTitle}
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
                sortTitle={rightSortTitle}
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

const DualListSelectWrapper = (props) => <DualListSelectCommon {...props} DualListSelect={DualList} />;

export default DualListSelectWrapper;
