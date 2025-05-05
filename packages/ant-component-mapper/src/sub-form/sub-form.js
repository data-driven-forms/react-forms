import React from 'react';
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

export default SubForm;
