import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Tab, Tabs } from '@material-ui/core';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const TabContent = ({ name, fields, formOptions }) => <Fragment key={name}>{formOptions.renderForm(fields, formOptions)}</Fragment>;

TabContent.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({ renderForm: PropTypes.func.isRequired }).isRequired
};

const FormTabs = ({ fields, AppBarProps, TabsProps, TabProps }) => {
  const formOptions = useFormApi();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <AppBar position="static" {...AppBarProps}>
        <Tabs value={activeTab} onChange={(_e, tabIndex) => setActiveTab(tabIndex)} {...TabsProps}>
          {fields.map(({ title, name }) => (
            <Tab key={name} label={title} {...TabProps} />
          ))}
        </Tabs>
      </AppBar>
      {fields.map((field, index) => (
        <div key={field.name} hidden={index !== activeTab}>
          <TabContent {...field} name={field.name} formOptions={formOptions} />
        </div>
      ))}
    </div>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired,
  AppBarProps: PropTypes.object,
  TabsProps: PropTypes.object,
  TabProps: PropTypes.object
};

FormTabs.defaultProps = {
  AppBarProps: {},
  TabsProps: {},
  TabProps: {}
};

export default FormTabs;
