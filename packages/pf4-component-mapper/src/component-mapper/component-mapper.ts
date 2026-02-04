import { ComponentMapper, componentTypes } from '@data-driven-forms/react-form-renderer';

// Import TypeScript components where available
import TextField from '../text-field';
import Textarea from '../textarea';
import Switch from '../switch';
import PlainText from '../plain-text';
import Checkbox from '../checkbox';
import Select from '../select';
// Needs nested import to get the original implementation without the HOC
import RawSelect from '../select/select/select';
import Tabs from '../tabs';
import SubForm from '../sub-form';
import Wizard from '../wizard';
import FieldArray from '../field-array';
import Radio from '../radio';
import DatePicker from '../date-picker';
import TimePicker from '../time-picker';
import DualListSelect from '../dual-list-select';
import Slider from '../slider';

const mapper: ComponentMapper = {
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
  [componentTypes.SLIDER]: Slider,
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
};

export const rawComponents = {
  RawSelect,
};
