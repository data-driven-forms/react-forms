import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const FormTabs = ({ fields, ...rest }) => {
  const formOptions = useFormApi();
  return (
    <Tabs {...rest}>
      {fields.map(({ fields, title, name, ...rest }) => (
        <TabPane tab={title} key={name} {...rest} forceRender>
          {formOptions.renderForm(fields, formOptions)}
        </TabPane>
      ))}
    </Tabs>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired
};

export default FormTabs;
