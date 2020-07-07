import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Row, Col } from 'antd';

import { useFormApi } from '@data-driven-forms/react-form-renderer';

const { Title, Paragraph } = Typography;

const SubForm = ({
  fields,
  title,
  description,
  TitleRowProps,
  TitleColProps,
  TitleProps,
  DescriptionColProps,
  DescriptionProps,
  DescriptionRowProps,
  RowProps,
  ColProps,
  component,
  name,
  ...rest
}) => {
  const { renderForm } = useFormApi();

  return (
    <div {...rest}>
      {title && (
        <Row {...TitleRowProps}>
          <Col span={24} {...TitleColProps}>
            <Title level={3} {...TitleProps}>
              {title}
            </Title>
          </Col>
        </Row>
      )}
      {description && (
        <Row {...DescriptionRowProps}>
          <Col span={24} {...DescriptionColProps}>
            <Paragraph {...DescriptionProps}>{description}</Paragraph>
          </Col>
        </Row>
      )}
      <Row {...RowProps}>
        <Col span={24} {...ColProps}>
          {renderForm(fields)}
        </Col>
      </Row>
    </div>
  );
};

SubForm.propTypes = {
  fields: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  TitleRowProps: PropTypes.object,
  TitleColProps: PropTypes.object,
  TitleProps: PropTypes.object,
  DescriptionColProps: PropTypes.object,
  DescriptionProps: PropTypes.object,
  DescriptionRowProps: PropTypes.object,
  RowProps: PropTypes.object,
  ColProps: PropTypes.object,
  component: PropTypes.string,
  name: PropTypes.string
};

export default SubForm;
