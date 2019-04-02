import './html-helper.scss';

export const computeTextWidth = (text, classes = []) => {
  const element = document.createElement('div');
  const textNode = document.createTextNode(text);

  element.classList.add(...classes, 'textDimensionCalculation');

  element.appendChild(textNode);
  document.body.appendChild(element);

  let result = element.offsetWidth || 0;

  document.body.removeChild(element);

  return result;
};
