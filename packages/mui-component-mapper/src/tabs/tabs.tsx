import React, { useState } from 'react';
import { AppBar, Grid, Tab, Tabs } from '@mui/material';
import type { AppBarProps, GridProps, TabProps as MUITabProps, TabsProps } from '@mui/material';

import FormFieldGrid from '../form-field-grid';
import type { FormFieldGridProps } from '../form-field-grid/form-field-grid';

import { useFormApi } from '@data-driven-forms/react-form-renderer';
import type { Field } from '@data-driven-forms/react-form-renderer';

interface TabField {
  fields: Field[];
  title?: string;
  name?: string;
}

export interface FormTabsProps {
  fields: TabField[];
  AppBarProps?: AppBarProps;
  TabsProps?: TabsProps;
  TabProps?: MUITabProps;
  FormFieldGridProps?: FormFieldGridProps;
  GridItemProps?: GridProps;
}

const FormTabs: React.FC<FormTabsProps> = ({
  fields,
  AppBarProps = {},
  TabsProps = {},
  TabProps = {},
  FormFieldGridProps = {},
  GridItemProps = {},
}) => {
  const formOptions = useFormApi();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <FormFieldGrid container {...FormFieldGridProps}>
      <AppBar position="static" {...AppBarProps}>
        <Tabs textColor="inherit" value={activeTab} onChange={(_e, tabIndex) => setActiveTab(tabIndex)} {...TabsProps}>
          {fields.map(({ title, name }, index) => (
            <Tab key={name || index} label={title} {...TabProps} />
          ))}
        </Tabs>
      </AppBar>
      {fields.map(({ fields, name }, index) => (
        <Grid
          key={name || index}
          container
          item
          xs={12}
          rowSpacing={2}
          sx={{ mt: 1, ...(index !== activeTab && { display: 'none' }) }}
          {...GridItemProps}
        >
          {formOptions.renderForm(fields)}
        </Grid>
      ))}
    </FormFieldGrid>
  );
};

export default FormTabs;
