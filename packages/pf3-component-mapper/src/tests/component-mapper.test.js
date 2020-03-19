import { componentTypes } from '@data-driven-forms/react-form-renderer';
import componentMapper from '../files/component-mapper';
import SubForm from '../files/sub-form';
import FormTabs from '../files/tabs';
import Wizard from '../files/wizard';
import TextField from '../files/text-field';
import Textarea from '../files/textarea';
import Select from '../files/select';
import Checkbox from '../files/checkbox';
import Radio from '../files/radio';
import Switch from '../files/switch';
import { InputAddonGroup, InputAddonButtonGroup } from '../files/input-group-fields';

describe('Component mapper', () => {
  it('should return TextField component', () => {
    expect(componentMapper[componentTypes.TEXT_FIELD]).toEqual(TextField);
  });

  it('should return TextareaField component', () => {
    expect(componentMapper[componentTypes.TEXTAREA]).toEqual(Textarea);
  });

  it('should return SelectField component', () => {
    expect(componentMapper[componentTypes.SELECT]).toEqual(Select);
  });

  it('should return CheckboxGroup component', () => {
    expect(componentMapper[componentTypes.CHECKBOX]).toEqual(Checkbox);
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
    expect(componentMapper[componentTypes.SWITCH]).toEqual(Switch);
  });

  it('should return Wizard component', () => {
    expect(componentMapper[componentTypes.WIZARD]).toEqual(Wizard);
  });

  it('should return input addon group component', () => {
    expect(componentMapper[componentTypes.INPUT_ADDON_GROUP]).toEqual(InputAddonGroup);
  });

  it('should return input addon buttom group component', () => {
    expect(componentMapper[componentTypes.INPUT_ADDON_BUTTON_GROUP]).toEqual(InputAddonButtonGroup);
  });
});
