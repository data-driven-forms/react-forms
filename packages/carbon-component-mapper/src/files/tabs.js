import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { Tabs as CarbonTabs, Tab } from 'carbon-components-react';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

import './tabs.scss';

const Tabs = ({ fields, component, name, TabWrapperProps, ...props }) => {
  const formOptions = useFormApi();

  return (
    <CarbonTabs {...props}>
      {fields.map(({ fields, name, label, title, ...rest }) => (
        <Tab {...rest} className="pepa" id={name} key={name} label={label || title}>
          <div {...TabWrapperProps} className={clsx('ddorg__carbon-form-template-tab', TabWrapperProps.className)}>
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
