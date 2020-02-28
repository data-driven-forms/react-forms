import { componentTypes } from '@data-driven-forms/react-form-renderer';
import componentMapper from '../components/component-mapper';
import SubForm from '../components/sub-form';
import FormTabs from '../components/tabs';
import Wizard from '../components/wizard';
import TextField from '../components/text-field';
import Textarea from '../components/textarea';
import Select from '../components/select';
import Checkbox from '../components/checkbox';
import Radio from '../components/radio';
import Switch from '../components/switch';
import { InputAddonGroup, InputAddonButtonGroup } from '../components/input-group-fields';

describe('Component mapper', () => {
  it('should return TextField component', () => {
    expect(componentMapper[componentTypes.TEXT_FIELD]).toEqual(TextField);
  });

  it('should return TextareaField component', () => {
    expect(componentMapper[componentTypes.TEXTAREA_FIELD]).toEqual(Textarea);
  });

  it('should return SelectField component', () => {
    expect(componentMapper[componentTypes.SELECT_COMPONENT]).toEqual(Select);
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
