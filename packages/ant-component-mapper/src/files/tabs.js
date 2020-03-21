import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

const FormTabs = ({ fields }) => {
  const formOptions = useFormApi();
  //const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <Tabs /* defaultActiveKey={} */>
        {fields.map(({ fields, title, name }, index) => (
          <TabPane tab={title} key={name}>
            {formOptions.renderForm(fields, formOptions)}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
};

FormTabs.propTypes = {
  fields: PropTypes.array.isRequired
};

export default FormTabs;
