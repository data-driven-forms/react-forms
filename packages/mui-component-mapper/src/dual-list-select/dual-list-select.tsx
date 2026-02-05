import React from 'react';
import { styled } from '@mui/material/styles';
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
import type {
  GridProps,
  ListProps,
  ListItemProps,
  ListItemTextProps,
  ListItemIconProps,
  ListItemSecondaryActionProps,
  IconButtonProps,
  FormControlProps,
  FormLabelProps,
  FormHelperTextProps,
  ToolbarProps,
  TextFieldProps,
  TypographyProps,
  PaperProps,
  ButtonProps,
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

interface ListOption {
  value: any;
  label: string;
  icon?: React.ReactNode;
  isCheckbox?: boolean;
  secondaryActions?: React.ReactNode;
  ListItemProps?: ListItemProps;
  ListItemIconProps?: ListItemIconProps;
  ListItemTextProps?: ListItemTextProps;
  ListItemSecondaryActionProps?: ListItemSecondaryActionProps;
}

interface ListInternalProps {
  value?: ListOption[];
  optionClick: (e: any, value: any) => void;
  noOptionsTitle: string;
  filterValue: any;
  filterValueText: string;
  selectedValues: any[];
  ListProps?: ListProps;
  ListItemProps?: ListItemProps;
  ListItemIconProps?: ListItemIconProps;
  ListItemTextProps?: ListItemTextProps;
  ListItemSecondaryActionProps?: ListItemSecondaryActionProps;
  checkboxVariant?: boolean;
  PaperProps?: PaperProps;
  LeftPaperProps?: PaperProps;
}

const ListInternal: React.FC<ListInternalProps> = ({
  value = [],
  optionClick,
  noOptionsTitle,
  filterValue,
  filterValueText,
  selectedValues,
  ListProps = {},
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
        // Need to be migrated to ListItemButton
        // @ts-ignore
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
              // Need to be migrated to ListItemButton
              // @ts-ignore
              button
              key={value}
              selected={selectedValues.includes(value)}
              onClick={(e) => optionClick(isCheckbox || checkboxVariant ? { ...e, ctrlKey: true } : e, value)}
              sx={{ cursor: 'pointer' }}
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

interface ToolbarInternalProps {
  ToolbarProps?: ToolbarProps;
  LeftToolbarProps?: ToolbarProps;
  filterOptions: (value: string) => void;
  filterOptionsTitle: string;
  FilterFieldProps?: TextFieldProps;
  sortOptions: () => void;
  SortIconButtonProps?: IconButtonProps;
  SortIconProps?: any;
  LeftSortIconProps?: any;
  LeftFilterFieldProps?: TextFieldProps;
  LeftSortIconButtonProps?: IconButtonProps;
  filter: any;
  sortDesc: any;
  isValue?: boolean;
}

const ToolbarInternal: React.FC<ToolbarInternalProps> = ({
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
  isValue = false,
}) => (
  <Toolbar
    variant="dense"
    {...ToolbarProps}
    {...LeftToolbarProps}
    className={clsx(classes.toolbar, ToolbarProps && ToolbarProps.className, LeftToolbarProps && LeftToolbarProps.className)}
  >
    <TextField
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

interface DualListSelectProps {
  handleOptionsClick: (e: any, value: any) => void;
  rightValues: any[];
  noValueTitle?: string;
  filterValueText?: string;
  leftValues: any[];
  noOptionsTitle?: string;
  state: any;
  filterOptionsText?: string;
  handleValuesClick: (e: any, value: any) => void;
  handleMoveRight: () => void;
  moveRightTitle?: string;
  handleClearLeftValues: () => void;
  moveAllRightTitle?: string;
  handleClearRightValues: () => void;
  moveAllLeftTitle?: string;
  handleMoveLeft: () => void;
  moveLeftTitle?: string;
  allToRight?: boolean;
  allToLeft?: boolean;
  checkboxVariant?: boolean;
  isRequired?: boolean;
  meta: any;
  validateOnMount?: boolean;
  label?: string;
  helperText?: string;
  description?: string;
  filterOptionsTitle?: string;
  leftTitle?: string;
  filterOptions: (value: string) => void;
  sortOptions: () => void;
  sortValues: () => void;
  filterValueTitle?: string;
  filterValues: (value: string) => void;
  rightTitle?: string;
  isFilterable?: boolean;
  // MUI component props
  FormFieldGridProps?: any;
  InternalGridProps?: GridProps;
  ListGridProps?: GridProps;
  LeftListGridProps?: GridProps;
  ListProps?: ListProps;
  LeftListProps?: ListProps;
  ButtonsGridProps?: GridProps;
  ButtonsInternalGridProps?: GridProps;
  ButtonGridProps?: GridProps;
  ToRightGridProps?: GridProps;
  IconButtonProps?: ButtonProps;
  ToRightIconButtonProps?: ButtonProps;
  AllToRightGridProps?: GridProps;
  AllToRightIconButtonProps?: ButtonProps;
  AllToLeftGridProps?: GridProps;
  AllToLeftIconButtonProps?: ButtonProps;
  ToLeftGridProps?: GridProps;
  ToLeftIconButtonProps?: ButtonProps;
  RightListGridProps?: GridProps;
  RightListProps?: ListProps;
  ListItemProps?: ListItemProps;
  ListItemIconProps?: ListItemIconProps;
  ListItemTextProps?: ListItemTextProps;
  ListItemSecondaryActionProps?: ListItemSecondaryActionProps;
  LeftListItemProps?: ListItemProps;
  LeftListItemIconProps?: ListItemIconProps;
  LeftItemTextProps?: ListItemTextProps;
  LeftItemSecondaryActionProps?: ListItemSecondaryActionProps;
  RightListItemProps?: ListItemProps;
  RightListItemIconProps?: ListItemIconProps;
  RightItemTextProps?: ListItemTextProps;
  RightItemSecondaryActionProps?: ListItemSecondaryActionProps;
  FormControlProps?: FormControlProps;
  FormLabelProps?: FormLabelProps;
  FormHelperTextProps?: FormHelperTextProps;
  TitleProps?: TypographyProps;
  ToolbarProps?: ToolbarProps;
  FilterFieldProps?: TextFieldProps;
  SortIconButtonProps?: IconButtonProps;
  SortIconProps?: any;
  LeftToolbarProps?: ToolbarProps;
  LeftFilterFieldProps?: TextFieldProps;
  LeftSortIconButtonProps?: IconButtonProps;
  LeftSortIconProps?: any;
  LeftTitleProps?: TypographyProps;
  RightToolbarProps?: ToolbarProps;
  RightFilterFieldProps?: TextFieldProps;
  RightSortIconButtonProps?: IconButtonProps;
  RightSortIconProps?: any;
  RightTitleProps?: TypographyProps;
  PaperProps?: PaperProps;
  LeftPaperProps?: PaperProps;
  RightPaperProps?: PaperProps;
}

const DualListSelect: React.FC<DualListSelectProps> = ({
  handleOptionsClick,
  rightValues,
  noValueTitle = 'No selected',
  filterValueText = 'Remove your filter to see all selected',
  leftValues,
  noOptionsTitle = 'No available options',
  state,
  filterOptionsText = 'Remove your filter to see all options',
  handleValuesClick,
  handleMoveRight,
  moveRightTitle = 'Move selected to right',
  handleClearLeftValues,
  moveAllRightTitle = 'Move all to right',
  handleClearRightValues,
  moveAllLeftTitle = 'Move all to left',
  handleMoveLeft,
  moveLeftTitle = 'Move selected to left',
  allToRight = true,
  allToLeft = true,
  checkboxVariant,
  isRequired,
  meta,
  validateOnMount,
  label,
  helperText,
  description,
  filterOptionsTitle = 'Filter options',
  leftTitle = 'Options',
  filterOptions,
  sortOptions,
  sortValues,
  filterValueTitle = 'Filter selected value',
  filterValues,
  rightTitle = 'Selected',
  isFilterable = true,
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

const DualListSelectWrapper: React.FC<any> = (props) => <DualListSelectCommon {...props} DualListSelect={DualListSelect} />;

export default DualListSelectWrapper;
