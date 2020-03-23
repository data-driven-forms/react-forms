import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const { Title, Paragraph } = Typography;
const SubForm = ({ fields, title, description, FormSpyProvider: _FormSpyProvider, validate: _validate, ...rest }) => {
  const { renderForm } = useFormApi();
  return (
    <div>
      {title && (
        <Row>
          <Col span={24}>
            <Title>{title}</Title>
          </Col>
        </Row>
      )}
      {description && (
        <Row>
          <Col span={24}>
            <Paragraph>{description}</Paragraph>
          </Col>
        </Row>
      )}
      <Row>
        <Col span={24}>{renderForm(fields)}</Col>
      </Row>
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  FormSpyProvider: PropTypes.any,
  validate: PropTypes.any
};

export default SubForm;
