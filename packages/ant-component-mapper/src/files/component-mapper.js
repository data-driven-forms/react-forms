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

export const components = {};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: TextArea,
  [componentTypes.SELECT]: () => <div>Select field</div>,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: () => <div>sub form</div>,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: TimePicker,
  [componentTypes.SELECT]: () => <div>Select field</div>,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.SWITCH]: <div>Switch</div>
};

export default componentMapper;
