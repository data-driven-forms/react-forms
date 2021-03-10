import { componentTypes } from '@data-driven-forms/react-form-renderer';
import SubForm from '../sub-form';
import Tabs from '../tabs';
import TextField from '../text-field';
import Textarea from '../textarea';
import Checkbox from '../checkbox';
import Switch from '../switch';
import TimePicker from '../time-picker';
import DatePicker from '../date-picker';
import PlainText from '../plain-text';
import Select from '../select';
import Radio from '../radio';
import Wizard from '../wizard';
import FieldArray from '../field-array';
import DualListSelect from '../dual-list-select';
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
  [componentTypes.SWITCH]: Switch,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.FIELD_ARRAY]: FieldArray,
  [componentTypes.DUAL_LIST_SELECT]: DualListSelect,
  [componentTypes.SLIDER]: Slider
};

export default componentMapper;
