import React, { Fragment } from 'react';
import { Tab, TabPane } from 'semantic-ui-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const TabContent = ({ name, fields, formOptions }) => <Fragment key={name}>{formOptions.renderForm(fields, formOptions)}</Fragment>;

const FormTabs = ({ fields, TabProps = {}, TabPaneProps = {} }) => {
  const formOptions = useFormApi();

  const panes = fields.map((field, index) => ({
    menuItem: field.title,
    pane: (
      <TabPane {...TabPaneProps} key={index}>
        <TabContent {...field} formOptions={formOptions} />
      </TabPane>
    ),
  }));
  return <Tab renderActiveOnly={false} {...TabProps} panes={panes} />;
};

export default FormTabs;
