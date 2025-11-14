import React from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Tabs as CarbonTabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const useStyles = createUseStyles({
  tab: {
    '&>:not(:last-child)': {
      marginBottom: 32,
    },
  },
});

const Tabs = ({ fields, component, name, TabWrapperProps = {}, ...props }) => {
  const formOptions = useFormApi();
  const { tab } = useStyles();

  return (
    <CarbonTabs {...props}>
      <TabList aria-label="List of tabs">
        {fields.map(({ name, label, title, ...rest }) => (
          <Tab key={name} {...rest}>
            {label || title}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {fields.map(({ fields: tabFields, name }) => (
          <TabPanel key={name}>
            <div {...TabWrapperProps} className={clsx(tab, TabWrapperProps.className)}>
              {formOptions.renderForm(tabFields, formOptions)}
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </CarbonTabs>
  );
};

export default Tabs;
