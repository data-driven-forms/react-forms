import { componentTypes } from '@data-driven-forms/react-form-renderer';

import Tabs from '../tabs';
import PlainText from '../plain-text';
import TextField from '../text-field';
import Textarea from '../textarea';
import Checkbox from '../checkbox';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import Radio from '../radio';
import Switch from '../switch';
import Select from '../select';
import Wizard from '../wizard';
import SubForm from '../sub-form';
import DualListSelect from '../dual-list-select';
import FieldArray from '../field-array';
import Slider from '../slider';

export const components = {
  TextField,
  Textarea,
  Select,
  Checkbox,
  Radio,
  Switch,
  DatePicker,
  TimePicker,
  PlainText,
  SubForm,
  Wizard,
  DualListSelect,
  FieldArray,
  Slider
};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: Textarea,
  [componentTypes.SELECT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.SWITCH]: Switch,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.SLIDER]: Slider,
  [componentTypes.DUAL_LIST_SELECT]: DualListSelect,
  [componentTypes.FIELD_ARRAY]: FieldArray
};

export default componentMapper;
