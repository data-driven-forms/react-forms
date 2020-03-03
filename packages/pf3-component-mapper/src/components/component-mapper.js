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
import Button from './button';
import { InputAddonButtonGroup, InputAddonGroup } from './input-group-fields';

const componentMapper = {
  [componentTypes.BUTTON]: Button,
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: Textarea,
  [componentTypes.SELECT]: Select,
  [componentTypes.CHECKBOX]: Checkbox,
  [componentTypes.SUB_FORM]: SubForm,
  [componentTypes.RADIO]: Radio,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: DatePicker,
  [componentTypes.TIME_PICKER]: (props) => <div>time picker</div>,
  [componentTypes.SWITCH]: Switch,
  [componentTypes.WIZARD]: Wizard,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.INPUT_ADDON_BUTTON_GROUP]: InputAddonButtonGroup,
  [componentTypes.INPUT_ADDON_GROUP]: InputAddonGroup
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
