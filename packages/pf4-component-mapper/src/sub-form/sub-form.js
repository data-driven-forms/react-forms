import React from 'react';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Title, Grid, GridItem, Content, ContentVariants } from '@patternfly/react-core';

const SubForm = ({ fields, title, description, validate: _validate, component, ...rest }) => {
  const formOptions = useFormApi();

  return (
    <Grid hasGutter {...rest}>
      {title && (
        <GridItem sm={12}>
          <Title headingLevel="h2" size="xl">
            {title}
          </Title>
        </GridItem>
      )}
      {description && (
        <GridItem sm={12}>
          <Content>
            <Content component={ContentVariants.small} style={{ marginBottom: 0 }}>
              {description}
            </Content>
          </Content>
        </GridItem>
      )}
      {formOptions.renderForm(fields, formOptions)}
    </Grid>
  );
};

export default SubForm;
