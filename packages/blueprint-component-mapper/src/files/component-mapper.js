import { componentTypes } from '@data-driven-forms/react-form-renderer';
import Tabs from './tabs';
import SubForm from './sub-form';
import Wizard from './wizard';
import Select from './select';
import FieldArray from './field-array';
import TextField from './text-field';
import Textarea from './textarea';
import Checkbox from './checkbox';
import Radio from './radio';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import Switch from './switch';
import PlainText from './plain-text';
import DualListSelect from './dual-list-select';
import Slider from './slider';

const mapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: Textarea,
  [componentTypes.SELECT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SWITCH]: Switch,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.FIELD_ARRAY]: FieldArray,
  [componentTypes.DUAL_LIST_SELECT]: DualListSelect,
  [componentTypes.SLIDER]: Slider
};

export default mapper;

export const components = {
  TextField,
  Textarea,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  PlainText,
  DualListSelect,
  Slider,
  Wizard
};
