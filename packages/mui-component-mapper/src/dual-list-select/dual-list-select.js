import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  FormLabel,
  FormHelperText,
  Toolbar,
  TextField,
  Typography,
  Paper,
  Button,
} from '@mui/material';

import SortIcon from '@mui/icons-material/ArrowUpward';

import DualListSelectCommon from '@data-driven-forms/common/dual-list-select';

import FormFieldGrid from '../form-field-grid/form-field-grid';
import { validationError } from '../validation-error/validation-error';

const PREFIX = 'DualListSelectWrapper';

const classes = {
  allToLeftIcon: `${PREFIX}-allToLeftIcon`,
  upsideDown: `${PREFIX}-upsideDown`,
  list: `${PREFIX}-list`,
  button: `${PREFIX}-button`,
  buttonsGrid: `${PREFIX}-buttonsGrid`,
  filter: `${PREFIX}-filter`,
  toolbar: `${PREFIX}-toolbar`,
};

const StyledDualListSelect = styled(FormFieldGrid)(({ theme }) => ({
  [`& .${classes.allToLeftIcon}`]: {
    transform: 'scaleX(-1)',
  },

  [`& .${classes.upsideDown}`]: {
    transform: 'scaleY(-1)',
  },

  [`& .${classes.list}`]: {
    height: 300,
    overflow: 'auto',
  },

  [`& .${classes.button}`]: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(0.5, 0),
  },

  [`& .${classes.buttonsGrid}`]: {
    height: '100%',
    alignContent: 'center',
  },

  [`& .${classes.filter}`]: {
    width: '100%',
  },

  [`& .${classes.toolbar}`]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

const ListInternal = ({
  value,
  optionClick,
  noOptionsTitle,
  filterValue,
  filterValueText,
  selectedValues,
  ListProps,
  ListItemProps,
  ListItemIconProps,
  ListItemTextProps,
  ListItemSecondaryActionProps,
  checkboxVariant,
  PaperProps,
  LeftPaperProps,
}) => (
  <Paper {...PaperProps} {...LeftPaperProps} className={clsx(PaperProps && PaperProps.className, LeftPaperProps && LeftPaperProps.className)}>
    <List component="div" role="list" dense {...ListProps} className={clsx(classes.list, ListProps.className)}>
      {value.length < 1 && (
        <ListItem button disabled {...ListItemProps}>
          <ListItemText primary={filterValue ? filterValueText : noOptionsTitle} />
        </ListItem>
      )}
      {value.length > 0 &&
        value.map(
          ({
            value,
            label,
            icon,
            isCheckbox,
            secondaryActions,
            ListItemProps: ListItemPropsItem,
            ListItemIconProps: ListItemIconPropsItem,
            ListItemTextProps: ListItemTextPropsItem,
            ListItemSecondaryActionProps: ListItemSecondaryActionPropsItem,
          }) => (
            <ListItem
              button
              key={value}
              selected={selectedValues.includes(value)}
              onClick={(e) => optionClick(isCheckbox || checkboxVariant ? { ...e, ctrlKey: true } : e, value)}
              {...ListItemProps}
              {...ListItemPropsItem}
            >
              {(icon || isCheckbox || checkboxVariant) && (
                <ListItemIcon {...ListItemIconProps} {...ListItemIconPropsItem}>
                  {isCheckbox || checkboxVariant ? (
                    <Checkbox edge="start" checked={selectedValues.includes(value)} tabIndex={-1} disableRipple />
                  ) : (
                    icon
                  )}
                </ListItemIcon>
              )}
              <ListItemText primary={label} {...ListItemTextProps} {...ListItemTextPropsItem} />
              {secondaryActions && (
                <ListItemSecondaryAction {...ListItemSecondaryActionProps} {...ListItemSecondaryActionPropsItem}>
                  {secondaryActions}
                </ListItemSecondaryAction>
              )}
            </ListItem>
          )
        )}
    </List>
  </Paper>
);

ListInternal.propTypes = {
  value: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  optionClick: PropTypes.func.isRequired,
  noOptionsTitle: PropTypes.node,
  filterValue: PropTypes.string,
  filterValueText: PropTypes.node,
  selectedValues: PropTypes.array,
  checkboxVariant: PropTypes.bool,
  ListProps: PropTypes.object,
  ListItemProps: PropTypes.object,
  ListItemIconProps: PropTypes.object,
  ListItemTextProps: PropTypes.object,
  ListItemSecondaryActionProps: PropTypes.object,
  PaperProps: PropTypes.object,
  LeftPaperProps: PropTypes.object,
};

ListInternal.defaultProps = {
  value: [],
  ListProps: {},
};

const ToolbarInternal = ({
  ToolbarProps,
  LeftToolbarProps,
  filterOptions,
  filterOptionsTitle,
  FilterFieldProps,
  sortOptions,
  SortIconButtonProps,
  SortIconProps,
  LeftSortIconProps,
  LeftFilterFieldProps,
  LeftSortIconButtonProps,
  filter,
  sortDesc,
  isValue,
}) => (
  <Toolbar
    variant="dense"
    {...ToolbarProps}
    {...LeftToolbarProps}
    className={clsx(classes.toolbar, ToolbarProps && ToolbarProps.className, LeftToolbarProps && LeftToolbarProps.className)}
  >
    <TextField
      edge="start"
      aria-label={isValue ? 'value-search' : 'options-search'}
      label={filterOptionsTitle}
      onChange={({ target: { value } }) => filterOptions(value)}
      value={filter}
      type="search"
      {...FilterFieldProps}
      {...LeftFilterFieldProps}
      className={clsx(classes.filter, FilterFieldProps && FilterFieldProps.className, LeftFilterFieldProps && LeftFilterFieldProps.className)}
    />
    <IconButton
      aria-label={isValue ? 'sort value' : 'sort options'}
      edge="end"
      onClick={sortOptions}
      color="inherit"
      {...SortIconButtonProps}
      {...LeftSortIconButtonProps}
      size="large"
    >
      <SortIcon
        {...SortIconProps}
        {...LeftSortIconProps}
        className={clsx(!sortDesc && classes.upsideDown, SortIconProps && SortIconProps.className, LeftSortIconProps && LeftSortIconProps.className)}
      />
    </IconButton>
  </Toolbar>
);

ToolbarInternal.propTypes = {
  ToolbarProps: PropTypes.object,
  LeftToolbarProps: PropTypes.object,
  filterOptions: PropTypes.func,
  filterOptionsTitle: PropTypes.node,
  state: PropTypes.object,
  FilterFieldProps: PropTypes.object,
  sortOptions: PropTypes.func,
  SortIconButtonProps: PropTypes.object,
  SortIconProps: PropTypes.object,
  LeftSortIconProps: PropTypes.object,
  LeftFilterFieldProps: PropTypes.object,
  LeftSortIconButtonProps: PropTypes.object,
  filter: PropTypes.string,
  sortDesc: PropTypes.bool,
  isValue: PropTypes.bool,
};

const DualListSelect = ({
  handleOptionsClick,
  rightValues,
  noValueTitle,
  filterValueText,
  leftValues,
  noOptionsTitle,
  state,
  filterOptionsText,
  handleValuesClick,
  handleMoveRight,
  moveRightTitle,
  handleClearLeftValues,
  moveAllRightTitle,
  handleClearRightValues,
  moveAllLeftTitle,
  handleMoveLeft,
  moveLeftTitle,
  allToRight,
  allToLeft,
  checkboxVariant,
  isRequired,
  meta,
  validateOnMount,
  label,
  helperText,
  description,
  filterOptionsTitle,
  leftTitle,
  filterOptions,
  sortOptions,
  sortValues,
  filterValueTitle,
  filterValues,
  rightTitle,
  isFilterable,
  // Props
  FormFieldGridProps,
  InternalGridProps,
  ListGridProps,
  LeftListGridProps,
  ListProps,
  LeftListProps,
  ButtonsGridProps,
  ButtonsInternalGridProps,
  ButtonGridProps,
  ToRightGridProps,
  IconButtonProps,
  ToRightIconButtonProps,
  AllToRightGridProps,
  AllToRightIconButtonProps,
  AllToLeftGridProps,
  AllToLeftIconButtonProps,
  ToLeftGridProps,
  ToLeftIconButtonProps,
  RightListGridProps,
  RightListProps,
  ListItemProps,
  ListItemIconProps,
  ListItemTextProps,
  ListItemSecondaryActionProps,
  LeftListItemProps,
  LeftListItemIconProps,
  LeftItemTextProps,
  LeftItemSecondaryActionProps,
  RightListItemProps,
  RightListItemIconProps,
  RightItemTextProps,
  RightItemSecondaryActionProps,
  FormControlProps,
  FormLabelProps,
  FormHelperTextProps,
  TitleProps,
  ToolbarProps,
  FilterFieldProps,
  SortIconButtonProps,
  SortIconProps,
  LeftToolbarProps,
  LeftFilterFieldProps,
  LeftSortIconButtonProps,
  LeftSortIconProps,
  LeftTitleProps,
  RightToolbarProps,
  RightFilterFieldProps,
  RightSortIconButtonProps,
  RightSortIconProps,
  RightTitleProps,
  PaperProps,
  LeftPaperProps,
  RightPaperProps,
}) => {
  const invalid = validationError(meta, validateOnMount);
  const text = invalid || ((meta.touched || validateOnMount) && meta.warning) || helperText || description;

  return (
    <StyledDualListSelect {...FormFieldGridProps}>
      <FormControl fullWidth required={isRequired} error={!!invalid} component="fieldset" {...FormControlProps}>
        <FormLabel component="legend" {...FormLabelProps}>
          {label}
        </FormLabel>
        <Grid container {...InternalGridProps}>
          <Grid item xs={12} md={5} {...ListGridProps} {...LeftListGridProps}>
            {leftTitle && (
              <Typography variant="h6" gutterBottom {...TitleProps} {...LeftTitleProps}>
                {leftTitle}
              </Typography>
            )}
            {isFilterable && (
              <ToolbarInternal
                ToolbarProps={ToolbarProps}
                LeftToolbarProps={LeftToolbarProps}
                filterOptions={filterOptions}
                filterOptionsTitle={filterOptionsTitle}
                FilterFieldProps={FilterFieldProps}
                sortOptions={sortOptions}
                SortIconButtonProps={SortIconButtonProps}
                SortIconProps={SortIconProps}
                LeftSortIconProps={LeftSortIconProps}
                LeftFilterFieldProps={LeftFilterFieldProps}
                LeftSortIconButtonProps={LeftSortIconButtonProps}
                filter={state.filterOptions}
                sortDesc={state.sortLeftDesc}
              />
            )}
            <ListInternal
              optionClick={handleOptionsClick}
              value={leftValues}
              noOptionsTitle={noOptionsTitle}
              filterValue={state.filterOptions}
              filterValueText={filterOptionsText}
              selectedValues={state.selectedLeftValues}
              checkboxVariant={checkboxVariant}
              ListProps={{ ...ListProps, ...LeftListProps }}
              ListItemProps={{ ...ListItemProps, ...LeftListItemProps }}
              ListItemIconProps={{ ...ListItemIconProps, ...LeftListItemIconProps }}
              ListItemTextProps={{ ...ListItemTextProps, ...LeftItemTextProps }}
              ListItemSecondaryActionProps={{ ...ListItemSecondaryActionProps, ...LeftItemSecondaryActionProps }}
              PaperProps={PaperProps}
              LeftPaperProps={LeftPaperProps}
            />
          </Grid>
          <Grid item xs={12} md={2} {...ButtonsGridProps}>
            <Grid
              container
              {...ButtonsInternalGridProps}
              className={clsx(classes.buttonsGrid, ButtonsInternalGridProps && ButtonsInternalGridProps.className)}
            >
              {allToRight && (
                <Grid
                  item
                  md={12}
                  sm={3}
                  {...ButtonGridProps}
                  {...AllToRightGridProps}
                  className={clsx(classes.button, ButtonGridProps && ButtonGridProps.className, AllToRightGridProps && AllToRightGridProps.className)}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={leftValues.length === 0}
                    onClick={handleClearLeftValues}
                    aria-label={moveAllRightTitle}
                    {...IconButtonProps}
                    {...AllToRightIconButtonProps}
                  >
                    ≫
                  </Button>
                </Grid>
              )}
              <Grid
                item
                md={12}
                sm={3}
                {...ButtonGridProps}
                {...ToRightGridProps}
                className={clsx(classes.button, ButtonGridProps && ButtonGridProps.className, ToRightGridProps && ToRightGridProps.className)}
              >
                <Button
                  variant="outlined"
                  size="small"
                  disabled={leftValues.length === 0}
                  onClick={handleMoveRight}
                  aria-label={moveRightTitle}
                  {...IconButtonProps}
                  {...ToRightIconButtonProps}
                >
                  &gt;
                </Button>
              </Grid>
              <Grid
                item
                md={12}
                sm={3}
                {...ButtonGridProps}
                {...ToLeftGridProps}
                className={clsx(classes.button, ButtonGridProps && ButtonGridProps.className, ToLeftGridProps && ToLeftGridProps.className)}
              >
                <Button
                  variant="outlined"
                  size="small"
                  disabled={rightValues.length === 0}
                  onClick={handleMoveLeft}
                  aria-label={moveLeftTitle}
                  {...IconButtonProps}
                  {...ToLeftIconButtonProps}
                >
                  &lt;
                </Button>
              </Grid>
              {allToLeft && (
                <Grid
                  item
                  md={12}
                  sm={3}
                  {...ButtonGridProps}
                  {...AllToLeftGridProps}
                  className={clsx(classes.button, ButtonGridProps && ButtonGridProps.className, AllToLeftGridProps && AllToLeftGridProps.className)}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    disabled={rightValues.length === 0}
                    onClick={handleClearRightValues}
                    aria-label={moveAllLeftTitle}
                    {...IconButtonProps}
                    {...AllToLeftIconButtonProps}
                  >
                    ≪
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={5} {...ListGridProps} {...RightListGridProps}>
            {rightTitle && (
              <Typography variant="h6" gutterBottom {...TitleProps} {...RightTitleProps}>
                {rightTitle}
              </Typography>
            )}
            {isFilterable && (
              <ToolbarInternal
                ToolbarProps={ToolbarProps}
                LeftToolbarProps={RightToolbarProps}
                filterOptions={filterValues}
                filterOptionsTitle={filterValueTitle}
                FilterFieldProps={FilterFieldProps}
                sortOptions={sortValues}
                SortIconButtonProps={SortIconButtonProps}
                SortIconProps={SortIconProps}
                LeftSortIconProps={RightSortIconProps}
                LeftFilterFieldProps={RightFilterFieldProps}
                LeftSortIconButtonProps={RightSortIconButtonProps}
                filter={state.filterValue}
                sortDesc={state.sortRightDesc}
                isValue
              />
            )}
            <ListInternal
              checkboxVariant={checkboxVariant}
              optionClick={handleValuesClick}
              value={rightValues}
              noOptionsTitle={noValueTitle}
              filterValue={state.filterValue}
              filterValueText={filterValueText}
              selectedValues={state.selectedRightValues}
              ListProps={{ ...ListProps, ...RightListProps }}
              ListItemProps={{ ...ListItemProps, ...RightListItemProps }}
              ListItemIconProps={{ ...ListItemIconProps, ...RightListItemIconProps }}
              ListItemTextProps={{ ...ListItemTextProps, ...RightItemTextProps }}
              ListItemSecondaryActionProps={{ ...ListItemSecondaryActionProps, ...RightItemSecondaryActionProps }}
              PaperProps={PaperProps}
              LeftPaperProps={RightPaperProps}
            />
          </Grid>
        </Grid>
        {text && <FormHelperText {...FormHelperTextProps}>{text}</FormHelperText>}
      </FormControl>
    </StyledDualListSelect>
  );
};

DualListSelect.propTypes = {
  leftTitle: PropTypes.node,
  rightTitle: PropTypes.node,
  moveLeftTitle: PropTypes.node,
  moveRightTitle: PropTypes.node,
  allToLeft: PropTypes.bool,
  allToRight: PropTypes.bool,
  checkboxVariant: PropTypes.bool,
  validateOnMount: PropTypes.bool,
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
    name: PropTypes.string.isRequired,
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
  isFilterable: PropTypes.bool,
  // props
  FormFieldGridProps: PropTypes.object,
  InternalGridProps: PropTypes.object,
  ListGridProps: PropTypes.object,
  LeftListGridProps: PropTypes.object,
  ListProps: PropTypes.object,
  LeftListProps: PropTypes.object,
  ButtonsGridProps: PropTypes.object,
  ButtonsInternalGridProps: PropTypes.object,
  ButtonGridProps: PropTypes.object,
  ToRightGridProps: PropTypes.object,
  IconButtonProps: PropTypes.object,
  ToRightIconButtonProps: PropTypes.object,
  AllToRightGridProps: PropTypes.object,
  AllToRightIconButtonProps: PropTypes.object,
  AllToLeftGridProps: PropTypes.object,
  AllToLeftIconButtonProps: PropTypes.object,
  ToLeftGridProps: PropTypes.object,
  ToLeftIconButtonProps: PropTypes.object,
  RightListGridProps: PropTypes.object,
  RightListProps: PropTypes.object,
  ListItemProps: PropTypes.object,
  ListItemIconProps: PropTypes.object,
  ListItemTextProps: PropTypes.object,
  ListItemSecondaryActionProps: PropTypes.object,
  LeftListItemProps: PropTypes.object,
  LeftListItemIconProps: PropTypes.object,
  LeftItemTextProps: PropTypes.object,
  LeftItemSecondaryActionProps: PropTypes.object,
  RightListItemProps: PropTypes.object,
  RightListItemIconProps: PropTypes.object,
  RightItemTextProps: PropTypes.object,
  RightItemSecondaryActionProps: PropTypes.object,
  FormControlProps: PropTypes.object,
  FormLabelProps: PropTypes.object,
  FormHelperTextProps: PropTypes.object,
  TitleProps: PropTypes.object,
  ToolbarProps: PropTypes.object,
  FilterFieldProps: PropTypes.object,
  SortIconButtonProps: PropTypes.object,
  SortIconProps: PropTypes.object,
  LeftToolbarProps: PropTypes.object,
  LeftFilterFieldProps: PropTypes.object,
  LeftSortIconButtonProps: PropTypes.object,
  LeftSortIconProps: PropTypes.object,
  LeftTitleProps: PropTypes.object,
  RightToolbarProps: PropTypes.object,
  RightFilterFieldProps: PropTypes.object,
  RightSortIconButtonProps: PropTypes.object,
  RightSortIconProps: PropTypes.object,
  RightTitleProps: PropTypes.object,
  PaperProps: PropTypes.object,
  LeftPaperProps: PropTypes.object,
  RightPaperProps: PropTypes.object,
};

DualListSelect.defaultProps = {
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
  isFilterable: true,
};

const DualListSelectWrapper = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelect} />;

export default DualListSelectWrapper;
