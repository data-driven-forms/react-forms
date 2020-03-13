/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Typography } from 'antd';
import 'antd/dist/antd.css';
import FormTemplate from '@data-driven-forms/common/src/form-template';
// import { Row, Col } from 'antd';
// import Grid from '@material-ui/core/Grid';
// import MUIButton from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

const { Title, Paragraph /* , Text  */ } = Typography;

const AntButton = ({ children, ...props }) => {
  //type is submit in props however type is an attribuite of antButton
  //console.log(props);
  return (
    <Button {...props} type="primary">
      {children}
    </Button>
  );
};

const Form = ({ children, ...props }) => <form {...props}>{children}</form>;
const Description = ({ children }) => (
  <Typography>
    <Paragraph>{children}</Paragraph>
  </Typography>
);
const TitleComponent = ({ children }) => (
  <Typography>
    <Title level={3}>{children}</Title>
  </Typography>
);

const ButtonGroup = ({ children }) => <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{children}</div>;
const ButtonComponent = ({ label, variant, children, ...props }) => <AntButton {...props}>{label || children}</AntButton>;

const AntFormTemplate = (props) => (
  <FormTemplate FormWrapper={Form} Button={ButtonComponent} ButtonGroup={ButtonGroup} Title={TitleComponent} Description={Description} {...props} />
);

export default AntFormTemplate;
