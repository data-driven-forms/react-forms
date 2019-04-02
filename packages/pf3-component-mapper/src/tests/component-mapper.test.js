import { componentTypes } from '@data-driven-forms/react-form-renderer';
import { TextField, TextareaField, SelectField, CheckboxGroup, Radio, SwitchField } from '../form-fields/form-fields';
import componentMapper from '../form-fields/component-mapper';
import SubForm from '../form-fields/sub-form';
import FormTabs from '../form-fields/tabs';
import Wizard from '../form-fields/wizzard/wizzard';

describe('Component mapper', () => {
  it('should return TextField component', () => {
    expect(componentMapper[componentTypes.TEXT_FIELD]).toEqual(TextField);
  });

  it('should return TextareaField component', () => {
    expect(componentMapper[componentTypes.TEXTAREA_FIELD]).toEqual(TextareaField);
  });

  it('should return SelectField component', () => {
    expect(componentMapper[componentTypes.SELECT_COMPONENT]).toEqual(SelectField);
  });

  it('should return CheckboxGroup component', () => {
    expect(componentMapper[componentTypes.CHECKBOX]).toEqual(CheckboxGroup);
  });

  it('should return SubForm component', () => {
    expect(componentMapper[componentTypes.SUB_FORM]).toEqual(SubForm);
  });

  it('should return Radio component', () => {
    expect(componentMapper[componentTypes.RADIO]).toEqual(Radio);
  });

  it('should return FormTabs component', () => {
    expect(componentMapper[componentTypes.TABS]).toEqual(FormTabs);
  });

  it('should return SwitchField component', () => {
    expect(componentMapper[componentTypes.SWITCH]).toEqual(SwitchField);
  });

  it('should return Wizard component', () => {
    expect(componentMapper[componentTypes.WIZARD]).toEqual(Wizard);
  });
});
