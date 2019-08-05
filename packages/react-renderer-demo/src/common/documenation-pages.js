import GetStartedText from './doc-texts/get-started';
import InstallationText from './doc-texts/installation';
import FormSchemasText from './doc-texts/form-schemas';
import ComponentMappingText from './doc-texts/component-mapping';
import ComponentApi from './doc-texts/component-api';
import Condition from './doc-texts/condition';
import Validators from './doc-texts/validators';
import FieldProvider from './doc-texts/field-provider';
import Unmounting from './doc-texts/unmounting';
import FormControls from './doc-texts/form-controls';
import DataTypes from './doc-texts/data-types';

export const docs = [{
  component: 'installation',
  linkText: 'Installation',
  contentText: InstallationText,
}, {
  component: 'get-started',
  linkText: 'Getting started',
  contentText: GetStartedText,
}, {
  component: 'form-schemas',
  linkText: 'Form schemas',
  contentText: FormSchemasText,
}, {
  component: 'component-mapping',
  linkText: 'Create component mapper',
  contentText: ComponentMappingText,
}, {
  component: 'component-api',
  linkText: 'Components API',
  contentText: ComponentApi,
}, {
  component: 'conditions',
  linkText: 'Conditional fields',
  contentText: Condition,
}, {
  component: 'unmounting',
  linkText: 'Clear On Unmount',
  contentText: Unmounting,
}, {
  component: 'validators',
  linkText: 'Validators',
  contentText: Validators,
}, {
  component: 'data-types',
  linkText: 'Data types',
  contentText: DataTypes,
}, {
  component: 'field-provider',
  linkText: 'FieldProvider',
  contentText: FieldProvider,
}, {
  component: 'form-controls',
  linkText: 'Form buttons',
  contentText: FormControls,
}];
