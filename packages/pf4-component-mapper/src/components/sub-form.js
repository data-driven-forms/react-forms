import React from 'react';
import PropTypes from 'prop-types';
import { useFormApi } from '@data-driven-forms/react-form-renderer';

import { Text, TextVariants } from '@patternfly/react-core/dist/js/components/Text/Text';
import { TextContent } from '@patternfly/react-core/dist/js/components/Text/TextContent';
import { Grid, GridItem } from '@patternfly/react-core/dist/js/layouts/Grid/index';
import { Title } from '@patternfly/react-core/dist/js/components/Title/Title';

const SubForm = ({ fields, title, description, validate: _validate, ...rest }) => {
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
  validate: PropTypes.any
};

export default SubForm;
