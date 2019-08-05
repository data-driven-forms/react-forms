import React from 'react';
import { layoutComponents } from "../packages/react-form-renderer/src/constants";

export const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.BUTTON]: ({ label, ...rest }) =>  <button { ...rest }>{ label }</button>,
  [layoutComponents.COL]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.FORM_GROUP]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.ICON]: props => <div>Icon</div>,
  [layoutComponents.ARRAY_FIELD_WRAPPER]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.HELP_BLOCK]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.TITLE]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
};
