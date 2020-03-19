import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const TabContent = ({ name, fields, formOptions }) => <Fragment key={name}>{formOptions.renderForm(fields, formOptions)}</Fragment>;

TabContent.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({ renderForm: PropTypes.func.isRequired }).isRequired
};

const FormTabs = ({ fields }) => {
  const formOptions = useFormApi();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <AppBar position="static">
        <Tabs value={activeTab} onChange={(_e, tabIndex) => setActiveTab(tabIndex)}>
          {fields.map(({ title, name }) => (
            <Tab key={name} label={title} />
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
  fields: PropTypes.array.isRequired
};

export default FormTabs;
