import React from 'react';
import componentTypes from '@data-driven-forms/react-form-renderer/dist/cjs/component-types';
import SubForm from './sub-form';
import Tabs from './tabs';
import Wizard from './wizard';
import Select from './select';
import TextField from './text-field';
import Textarea from './textarea';
import Checkbox from './checkbox';
import Switch from './switch';
import DatePicker from './date-picker';
import PlainText from './plain-text';
import Radio from './radio';

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA_FIELD]: Textarea,
  [componentTypes.SELECT_COMPONENT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: (props) => <div>time picker</div>,
  [componentTypes.SWITCH]: Switch,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.PLAIN_TEXT]: PlainText
};

export default componentMapper;

export const components = {
  TextField,
  Textarea,
  Select,
  Checkbox,
  SubForm,
  Radio,
  Tabs,
  DatePicker,
  Switch,
  Wizard,
  PlainText
};

export const rawComponents = {
  Select
};
