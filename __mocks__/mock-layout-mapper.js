import React from 'react';
import { layoutComponents } from "../packages/react-form-renderer/src/constants";

export const layoutMapper = {
  [layoutComponents.FORM_WRAPPER]: ({ children, ...rest }) => <form {...rest}>{ children }</form>,
  [layoutComponents.BUTTON]: ({ label, buttonType, ...rest }) =>  <button { ...rest }>{ label }</button>,
  [layoutComponents.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.TITLE]: ({ children }) => <div>{ children }</div>,
  [layoutComponents.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
};
