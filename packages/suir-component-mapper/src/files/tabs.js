import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tab, TabPane } from 'semantic-ui-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const TabContent = ({ name, fields, formOptions }) => <Fragment key={name}>{formOptions.renderForm(fields, formOptions)}</Fragment>;

TabContent.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  formOptions: PropTypes.shape({ renderForm: PropTypes.func.isRequired }).isRequired
};

const FormTabs = ({ fields }) => {
  const formOptions = useFormApi();

  const panes = fields.map((field, index) => ({
    menuItem: field.title,
    pane: (
      <TabPane key={index}>
        <TabContent {...field} formOptions={formOptions} />
      </TabPane>
    )
  }));
  return <Tab renderActiveOnly={false} panes={panes} />;
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
