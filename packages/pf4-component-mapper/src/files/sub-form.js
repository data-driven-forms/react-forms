import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Title, Grid, GridItem, TextContent, Text, TextVariants } from '@patternfly/react-core';

const SubForm = ({ fields, title, description, validate: _validate, component, ...rest }) => {
  const formOptions = useFormApi();

  return (
    <Grid gutter="md" {...rest}>
      {title && (
        <GridItem sm={12}>
          <Title size="xl">{title}</Title>
        </GridItem>
      )}
      {description && (
        <GridItem sm={12}>
          <TextContent>
            <Text component={TextVariants.small} style={{ marginBottom: 0 }}>
              {description}
            </Text>
          </TextContent>
        </GridItem>
      )}
      {formOptions.renderForm(fields, formOptions)}
    </Grid>
  );
};

SubForm.propTypes = {
  fields: PropTypes.array.isRequired,
  name: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  validate: PropTypes.any,
  component: PropTypes.any
};

export default SubForm;
