import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import Tabs from './tabs';
import SubForm from './sub-form';
import Wizard from './wizard';
import Select from './select';
import { Select as RawSelect } from './select/select';
import FieldArray from './field-array';
import TextField from './text-field';
import TextArea from './text-area';
import Checkbox from './checkbox';
import Radio from './radio';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import Switch from './switch';
import PlainText from './plain-text';

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: TextArea,
  [componentTypes.SELECT_COMPONENT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SWITCH]: Switch,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.FIELD_ARRAY]: FieldArray
};

export default mapper;

export const components = {
  TextField,
  TextArea,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  PlainText
};

export const rawComponents = {
  RawSelect
};
