import React, { useState } from 'react';
import { AppBar, Grid, Tab, Tabs } from '@mui/material';

import FormFieldGrid from '../form-field-grid';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const FormTabs = ({ fields, AppBarProps = {}, TabsProps = {}, TabProps = {}, FormFieldGridProps = {}, GridItemProps = {} }) => {
  const formOptions = useFormApi();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <FormFieldGrid container {...FormFieldGridProps}>
      <AppBar position="static" {...AppBarProps}>
        <Tabs textColor="inherit" value={activeTab} onChange={(_e, tabIndex) => setActiveTab(tabIndex)} {...TabsProps}>
          {fields.map(({ title, name }) => (
            <Tab key={name} label={title} {...TabProps} />
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

/*
        {fields.map(({ fields }, index) =>
          index === activeTab ? (
            formOptions.renderForm(fields)
          ) : (
            <Grid container item xs={12} sx={{ display: 'none' }}>
              {formOptions.renderForm(fields)}
            </Grid>
          )
        )}
        */
