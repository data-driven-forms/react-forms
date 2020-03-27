import React from 'react';
import PropTypes from 'prop-types';
import MuiFormTemplate from '@data-driven-forms/mui-component-mapper/dist/cjs/form-template';
import Pf4FormTemplate from '@data-driven-forms/pf4-component-mapper/dist/cjs/form-template';
import Pf3FormTemplate from '@data-driven-forms/pf3-component-mapper/dist/cjs/form-template';
import ComponentExample from '@docs/components/component-example';
import { Heading } from './mdx/mdx-components';

const templates = {
  mui: MuiFormTemplate,
  pf4: Pf4FormTemplate,
  pf3: Pf3FormTemplate
};

const ComponentExampleText = ({ component, activeMapper, baseStructure, componentMapper }) => {
  return (
    <React.Fragment>
      <Heading level="4" component="h1">
        {baseStructure.linkText}
      </Heading>
      <ComponentExample
        activeMapper={activeMapper}
        baseStructure={baseStructure}
        component={component}
        componentMapper={componentMapper}
        FormTemplate={templates[activeMapper]}
      />
      <div hidden={activeMapper !== 'mui'} className="mui">
        <Heading level="5" component="h2">{`MUI ${baseStructure.linkText}`}</Heading>
        <baseStructure.ContentText activeMapper={'mui'} component={component} />
      </div>
      <div hidden={activeMapper !== 'pf3'}>
        <Heading level="5" component="h2">{`PF3 ${baseStructure.linkText}`}</Heading>
        <baseStructure.ContentText activeMapper={'pf3'} component={component} />
      </div>
      <div hidden={activeMapper !== 'pf4'}>
        <Heading level="5" component="h2">{`PF4 ${baseStructure.linkText}`}</Heading>
        <baseStructure.ContentText activeMapper={'pf4'} component={component} />
      </div>
    </React.Fragment>
  );
};

ComponentExampleText.propTypes = {
  component: PropTypes.string.isRequired,
  activeMapper: PropTypes.oneOf(['mui', 'pf4', 'pf3']),
  baseStructure: PropTypes.shape({ linkText: PropTypes.string.isRequired }).isRequired,
  componentMapper: PropTypes.object.isRequired
};

export default ComponentExampleText;
