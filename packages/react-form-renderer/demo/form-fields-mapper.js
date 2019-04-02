import React from 'react';
import { components } from '../src/constants';

const TextField = ({ input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, ...rest }) => (
  <div>
    <label>{ label } &nbsp;</label>
    <input { ...input } { ...rest } />
    { meta.error && <div><span>{ meta.error }</span></div> }
  </div>
);

const SelectField = ({ input, meta, label, formOptions, helperText, isRequired, dataType, isDisabled, isReadOnly, options, ...rest }) => (
  <div>
    <label>{ label } &nbsp;</label>
    <select { ...input } { ...rest }>
      { options.map(({ value, label }) => <option key={ value || label } value={ value }>{ label }</option>) }
    </select>
    { meta.error && <div><span>{ meta.error }</span></div> }
  </div>
);

const mapper = {
  [components.TEXT_FIELD]: TextField,
  [components.TEXTAREA_FIELD]: TextField,
  [components.SELECT_COMPONENT]: SelectField,
  [components.CHECKBOX]: props => <div>checkbox</div>,
  [components.SUB_FORM]: props => <div>sub form</div>,
  [components.RADIO]: props => <div>radio</div>,
  [components.TABS]: props => <div>tabs</div>,
  [components.TAB_ITEM]: props => <div>tab item</div>,
  [components.DATE_PICKER]: props => <div>date picker</div>,
  [components.TIME_PICKER]: props => <div>time picker</div>,
  [components.TAG_CONTROL]: props => <div>tag control</div>,
};

export default mapper;
