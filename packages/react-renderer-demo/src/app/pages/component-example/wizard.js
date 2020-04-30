import React from 'react';
import PropTypes from 'prop-types';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import MuiWizard from '@data-driven-forms/mui-component-mapper/dist/cjs/wizard';
import MuiSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/select';
import MuiTextarea from '@data-driven-forms/mui-component-mapper/dist/cjs/textarea';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

const Summary = ({ title }) => <div>{title}</div>;
Summary.propTypes = {
  title: PropTypes.node.isRequired
};

const mappers = {
  mui: {
    [componentTypes.WIZARD]: MuiWizard,
    [componentTypes.SELECT]: MuiSelect,
    [componentTypes.TEXTAREA]: MuiTextarea,
    [componentTypes.TEXT_FIELD]: MuiTextField,
    summary: Summary
  }
};

export default () => {
  const [component, baseStructure] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper="mui" componentMapper={mappers.mui} />;
};
