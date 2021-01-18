import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { Tabs as CarbonTabs, Tab } from 'carbon-components-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const useStyles = createUseStyles({
  tab: {
    '&>:not(:last-child)': {
      marginBottom: 32
    }
  }
});

const Tabs = ({ fields, component, name, TabWrapperProps, ...props }) => {
  const formOptions = useFormApi();
  const { tab } = useStyles();

  return (
    <CarbonTabs {...props}>
      {fields.map(({ fields, name, label, title, ...rest }) => (
        <Tab {...rest} id={name} key={name} label={label || title}>
          <div {...TabWrapperProps} className={clsx(tab, TabWrapperProps.className)}>
            {formOptions.renderForm(fields, formOptions)}
          </div>
        </Tab>
      ))}
    </CarbonTabs>
  );
};

Tabs.propTypes = {
  TabWrapperProps: PropTypes.object,
  component: PropTypes.string,
  name: PropTypes.string,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fields: PropTypes.array,
      title: PropTypes.node,
      label: PropTypes.node
    })
  )
};

Tabs.defaultProps = {
  TabWrapperProps: {}
};

export default Tabs;
