import React from 'react';
import { mount } from 'enzyme';
import Switch, {
  computeLabelWidth,
  createTransform,
  createLabelStyles,
  DIVIDER_SIZE,
  COMBINED_MARGIN,
  TEXT_PADDING,
} from '../form-fields/switch-field';
import { computeTextWidth } from '../helpers/html-helper';

jest.mock('../helpers/html-helper', () => ({ computeTextWidth: jest.fn() }));

/* Snapshot tests are in form-fields test file! */
describe('Switch-field', () => {
  let width = 10;
  const computedWidth = width + COMBINED_MARGIN;
  const computedWidthWithDivider = width + COMBINED_MARGIN + DIVIDER_SIZE;
  const widthWithPadding = width + TEXT_PADDING;

  describe('computeLabelWidth', () => {
    it('return value increased of padding', () => {
      computeTextWidth.mockImplementation(() => width);
      expect(computeLabelWidth('sometext')).toEqual(widthWithPadding);
    });
  });

  describe('createLabelWidth', () => {
    it('return left width object', () => {
      expect(createLabelStyles(width)).toEqual(
        {
          width: computedWidth,
          left: -computedWidth,
        }
      );
    });

    it('return right width object', () => {
      expect(createLabelStyles(width, false)).toEqual(
        {
          width: computedWidth,
          left: DIVIDER_SIZE,
        }
      );
    });
  });

  describe('createTransform', () => {
    it('return object when isChecked', () => {
      expect(createTransform(width, true)).toEqual(
        {
          WebkitTransform: `translateX(${computedWidth}px)`,
          msTransform: `translateX(${computedWidth}px)`,
          transform: `translateX(${computedWidth}px)`,
        }
      );
    });

    it('return empty object when is not checked', () => {
      expect(createTransform(width, false)).toEqual(
        {}
      );
    });

    it('return object when isChecked and is offText', () => {
      expect(createTransform(width, true, true)).toEqual(
        {
          WebkitTransform: `translateX(${computedWidthWithDivider}px)`,
          msTransform: `translateX(${computedWidthWithDivider}px)`,
          transform: `translateX(${computedWidthWithDivider}px)`,
        }
      );
    });

    it('return empty object when is not Checked and is offText', () => {
      expect(createTransform(width, false, true)).toEqual(
        {}
      );
    });
  });

  describe('Switch', () => {
    it('should call componentDidUpdate Switch correctly', () => {
      const wrapper = mount(
        <Switch bsSize='mn' onChange={ jest.fn() } />
      );
      const switchInstance = wrapper.find(Switch).instance();
      const spy = jest.spyOn(switchInstance, 'setState');
      expect(spy).not.toHaveBeenCalled();
      wrapper.setProps({ offText: 'verylongoffteeeeeeeext' });
      expect(spy).toHaveBeenCalled();
      spy.mockReset();
      wrapper.setProps({ offText: 'verylongoffteeeeeeeext' });
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
