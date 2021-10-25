import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Grid, Tab, Tabs } from '@mui/material';

import FormFieldGrid from '../form-field-grid';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const FormTabs = ({ fields, AppBarProps, TabsProps, TabProps, FormFieldGridProps, GridItemProps }) => {
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
      <Grid container item xs={12} spacing={2} sx={{ mt: 1 }} {...GridItemProps}>
        {formOptions.renderForm(fields[activeTab].fields)}
      </Grid>
    </FormFieldGrid>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  AppBarProps: PropTypes.object,
  TabsProps: PropTypes.object,
  TabProps: PropTypes.object,
  FormFieldGridProps: PropTypes.object,
  GridItemProps: PropTypes.object,
};

FormTabs.defaultProps = {
  AppBarProps: {},
  TabsProps: {},
  TabProps: {},
  FormFieldGridProps: {},
  GridItemProps: {},
};

export default FormTabs;
