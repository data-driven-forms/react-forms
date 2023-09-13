import React from 'react';
import PropTypes from 'prop-types';

import { useFormApi } from '@data-driven-forms/react-form-renderer';
import { Form, FormItem, Tab, TabContainer } from '@ui5/webcomponents-react';

const Tabs = ({ fields }) => {
  const formOptions = useFormApi();

  return (
    <FormItem>
      <TabContainer>
        {fields.map((tab) => (
          <Tab key={tab.name} text={tab.text || tab.title}>
            <Form as="div">{formOptions.renderForm(tab.fields)}</Form>
          </Tab>
        ))}
      </TabContainer>
    </FormItem>
  );
};

Tabs.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      fields: PropTypes.array,
      title: PropTypes.node,
    })
  ),
};

export default Tabs;
