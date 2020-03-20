import React from 'react';
import { componentTypes } from '@data-driven-forms/react-form-renderer';
import Tabs from './tabs';
import PlainText from './plain-text';
import TextField from './text-field';

export const components = {};

const componentMapper = {
  [componentTypes.TEXT_FIELD]: TextField,
  [componentTypes.TEXTAREA]: () => <div>Textarea field</div>,
  [componentTypes.SELECT]: () => <div>Select field</div>,
  [componentTypes.CHECKBOX]: () => <div>checkbox field</div>,
  [componentTypes.SUB_FORM]: () => <div>sub form</div>,
  [componentTypes.RADIO]: () => <div>Radio field</div>,
  [componentTypes.TABS]: Tabs,
  [componentTypes.DATE_PICKER]: () => <div>Date picker</div>,
  [componentTypes.TIME_PICKER]: () => <div>Time picker</div>,
  [componentTypes.TEXTAREA]: () => <div>Textarea field</div>,
  [componentTypes.SELECT]: () => <div>Select field</div>,
  [componentTypes.PLAIN_TEXT]: PlainText,
  [componentTypes.SWITCH]: <div>Switch</div>
};

export default componentMapper;
