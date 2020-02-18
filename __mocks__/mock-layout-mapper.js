import React from 'react';
import layoutComponentTypes from '../packages/react-form-renderer/src/components/layout-component-types';

export const layoutMapper = {
  [layoutComponentTypes.FORM_WRAPPER]: ({ children, ...rest }) => <form {...rest}>{ children }</form>,
  [layoutComponentTypes.BUTTON]: ({ label, ...rest }) =>  <button { ...rest }>{ label }</button>,
  [layoutComponentTypes.BUTTON_GROUP]: ({ children }) => <div>{ children }</div>,
  [layoutComponentTypes.TITLE]: ({ children }) => <div>{ children }</div>,
  [layoutComponentTypes.DESCRIPTION]: ({ children }) => <div>{ children }</div>,
};
