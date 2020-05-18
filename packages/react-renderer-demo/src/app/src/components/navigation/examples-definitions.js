import { componentTypes } from '@data-driven-forms/react-form-renderer';

export const baseExamples = [
  {
    component: componentTypes.TEXT_FIELD,
    link: componentTypes.TEXT_FIELD,
    linkText: 'Text Field'
  },
  {
    component: componentTypes.TEXTAREA,
    link: componentTypes.TEXTAREA,
    linkText: 'Text area'
  },
  {
    component: componentTypes.CHECKBOX,
    link: componentTypes.CHECKBOX,
    prev: {
      link: '/renderer/form-template',
      label: 'Form Controls'
    },
    linkText: 'Checkbox'
  },
  {
    component: componentTypes.RADIO,
    link: componentTypes.RADIO,
    linkText: 'Radio'
  },
  {
    component: componentTypes.SELECT,
    link: componentTypes.SELECT,
    linkText: 'Select'
  },
  {
    component: componentTypes.SWITCH,
    link: componentTypes.SWITCH,
    linkText: 'Switch'
  },
  {
    component: componentTypes.DATE_PICKER,
    link: componentTypes.DATE_PICKER,
    linkText: 'Date picker'
  },
  {
    component: componentTypes.TIME_PICKER,
    link: componentTypes.TIME_PICKER,
    linkText: 'Time picker'
  },
  {
    component: componentTypes.TABS,
    link: componentTypes.TABS,
    linkText: 'Tabs / Tab item'
  },
  {
    component: componentTypes.SUB_FORM,
    link: componentTypes.SUB_FORM,
    linkText: 'Subform'
  },
  {
    component: 'checkbox-multiple',
    link: 'checkbox-multiple',
    linkText: 'Checkbox multiple'
  },
  {
    component: componentTypes.PLAIN_TEXT,
    link: 'plain-text',
    linkText: 'Plain Text'
  },
  {
    component: componentTypes.DUAL_LIST_SELECT,
    link: componentTypes.DUAL_LIST_SELECT,
    linkText: 'Dual list select'
  },
  {
    component: componentTypes.FIELD_ARRAY,
    link: componentTypes.FIELD_ARRAY,
    linkText: 'Field Array'
  },
  {
    component: componentTypes.SLIDER,
    link: componentTypes.SLIDER,
    linkText: 'Slider'
  },
  {
    component: componentTypes.WIZARD,
    link: componentTypes.WIZARD,
    linkText: 'Wizard',
    next: {
      link: '/releases',
      label: 'Releases'
    },
    prev: {
      link: '/component-example/time-picker',
      label: 'Time Picker'
    }
  }
];
