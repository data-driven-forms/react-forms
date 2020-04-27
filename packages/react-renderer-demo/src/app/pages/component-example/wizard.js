import React from 'react';
import PropTypes from 'prop-types';
import ComponentText from '@docs/components/component-example-text';
import useComponentExample from '../../src/hooks/use-component-example';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Pf4Wizard from '@data-driven-forms/pf4-component-mapper/dist/cjs/wizard';
import MuiWizard from '@data-driven-forms/mui-component-mapper/dist/cjs/wizard';
import Pf4Select from '@data-driven-forms/pf4-component-mapper/dist/cjs/select';
import Pf3Select from '@data-driven-forms/pf3-component-mapper/dist/cjs/select';
import MuiSelect from '@data-driven-forms/mui-component-mapper/dist/cjs/select';
import Pf4Textarea from '@data-driven-forms/pf4-component-mapper/dist/cjs/textarea';
import Pf3Textarea from '@data-driven-forms/pf3-component-mapper/dist/cjs/textarea';
import MuiTextarea from '@data-driven-forms/mui-component-mapper/dist/cjs/textarea';
import Pf4TextField from '@data-driven-forms/pf4-component-mapper/dist/cjs/text-field';
import Pf3TextField from '@data-driven-forms/pf3-component-mapper/dist/cjs/text-field';
import MuiTextField from '@data-driven-forms/mui-component-mapper/dist/cjs/text-field';

import dynamic from 'next/dynamic';

const Pf3Wizard = dynamic(import('@data-driven-forms/pf3-component-mapper/dist/cjs/wizard'), {
  ssr: false
});

const Summary = ({ title }) => <div>{title}</div>;
Summary.propTypes = {
  title: PropTypes.node.isRequired
};

const mappers = {
  pf4: {
    [componentTypes.WIZARD]: Pf4Wizard,
    [componentTypes.SELECT]: Pf4Select,
    [componentTypes.TEXTAREA]: Pf4Textarea,
    [componentTypes.TEXT_FIELD]: Pf4TextField,
    summary: Summary
  },
  pf3: {
    [componentTypes.WIZARD]: Pf3Wizard,
    [componentTypes.SELECT]: Pf3Select,
    [componentTypes.TEXTAREA]: Pf3Textarea,
    [componentTypes.TEXT_FIELD]: Pf3TextField,
    summary: Summary
  },
  mui: {
    [componentTypes.WIZARD]: MuiWizard,
    [componentTypes.SELECT]: MuiSelect,
    [componentTypes.TEXTAREA]: MuiTextarea,
    [componentTypes.TEXT_FIELD]: MuiTextField,
    summary: Summary
  }
};

export default () => {
  const [component, baseStructure, activeMapper] = useComponentExample();
  return <ComponentText component={component} baseStructure={baseStructure} activeMapper={activeMapper} componentMapper={mappers[activeMapper]} />;
};
