import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import Tabs from './tabs';
import PlainText from './plain-text';
import TextField from './text-field';
import TextArea from './text-area';
import Checkbox from './checkbox';
import DatePicker from './date-picker';
import TimePicker from './time-picker';
import Radio from './radio';
import Switch from './switch';
import Select from './select';
export const components = {};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: TextArea,
  [componentTypes.SELECT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: () => <div>sub form</div>,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.SWITCH]: Switch
};

export default componentMapper;
