import React from 'react';

const isClassComponent = (component) => (
  typeof component === 'function'
  && component.prototype
  && !!component.prototype.isReactComponent
) ? true : false;

const isFunctionComponent = component => (
  typeof component === 'function' &&
      String(component).includes('.createElement')
) ? true : false;

const isReactComponent = (component) => (
  isClassComponent(component) ||
      isFunctionComponent(component)
) ? true : false;

const isElement = (element) => React.isValidElement(element);

const isDOMTypeElement = (element) => isElement(element) && typeof element.type === 'string';

const isCompositeTypeElement = (element) => isElement(element) && typeof element.type === 'function';

export default component => (
  isReactComponent(component)
  || isDOMTypeElement(component)
  || isCompositeTypeElement(component)
);
