import React from 'react';
import { mount } from 'enzyme';
import Switch, {
  computeLabelWidth,
  createTransform,
  createLabelStyles,
  DIVIDER_SIZE,
  COMBINED_MARGIN,
  TEXT_PADDING
} from '../form-fields/switch-field';
import { computeTextWidth } from '../helpers/html-helper';
import RenderWithProvider from '../../../../__mocks__/with-provider';

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
      expect(createLabelStyles(width)).toEqual({
        width: computedWidth,
        left: -computedWidth
      });
    });

    it('return right width object', () => {
      expect(createLabelStyles(width, false)).toEqual({
        width: computedWidth,
        left: DIVIDER_SIZE
      });
    });
  });

  describe('createTransform', () => {
    it('return object when isChecked', () => {
      expect(createTransform(width, true)).toEqual({
        WebkitTransform: `translateX(${computedWidth}px)`,
        msTransform: `translateX(${computedWidth}px)`,
        transform: `translateX(${computedWidth}px)`
      });
    });

    it('return empty object when is not checked', () => {
      expect(createTransform(width, false)).toEqual({});
    });

    it('return object when isChecked and is offText', () => {
      expect(createTransform(width, true, true)).toEqual({
        WebkitTransform: `translateX(${computedWidthWithDivider}px)`,
        msTransform: `translateX(${computedWidthWithDivider}px)`,
        transform: `translateX(${computedWidthWithDivider}px)`
      });
    });

    it('return empty object when is not Checked and is offText', () => {
      expect(createTransform(width, false, true)).toEqual({});
    });
  });

  describe('Switch', () => {
    it('should call submit when press enter', () => {
      const submitSpy = jest.fn();
      const preventDefault = jest.fn();
      const onChange = jest.fn();

      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: submitSpy }}}>
          <Switch bsSize="mn" onChange={onChange} />
        </RenderWithProvider>
      );

      wrapper
      .find('label')
      .props()
      .onKeyDown({ keyCode: 13, preventDefault });

      expect(preventDefault).toHaveBeenCalled();
      expect(submitSpy).toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('should call onChange when press spacebar', () => {
      const submitSpy = jest.fn();
      const preventDefault = jest.fn();
      const onChange = jest.fn();
      const checked = false;

      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: submitSpy }}}>
          <Switch bsSize="mn" onChange={onChange} checked={checked} />
        </RenderWithProvider>
      );

      wrapper
      .find('label')
      .props()
      .onKeyDown({ keyCode: 32, preventDefault });

      expect(preventDefault).toHaveBeenCalled();
      expect(submitSpy).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith({ target: { checked: true }});
    });

    it('should call onChange when press spacebar - checked true', () => {
      const submitSpy = jest.fn();
      const preventDefault = jest.fn();
      const onChange = jest.fn();
      const checked = true;

      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: submitSpy }}}>
          <Switch bsSize="mn" onChange={onChange} checked={checked} />
        </RenderWithProvider>
      );

      wrapper
      .find('label')
      .props()
      .onKeyDown({ keyCode: 32, preventDefault });

      expect(preventDefault).toHaveBeenCalled();
      expect(submitSpy).not.toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith({ target: { checked: false }});
    });

    it('should call nothing when press something else than enter and spacebar', () => {
      const submitSpy = jest.fn();
      const preventDefault = jest.fn();
      const onChange = jest.fn();

      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: submitSpy }}}>
          <Switch bsSize="mn" onChange={onChange} />
        </RenderWithProvider>
      );

      wrapper
      .find('label')
      .props()
      .onKeyDown({ keyCode: 88, preventDefault });

      expect(preventDefault).not.toHaveBeenCalled();
      expect(submitSpy).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('tabIndex is 0 by default', () => {
      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: jest.fn() }}}>
          <Switch bsSize="mn" onChange={jest.fn()} />
        </RenderWithProvider>
      );

      expect(wrapper.find('label').props().tabIndex).toEqual(0);
    });

    it('tabIndex is -1 when isReadOnly', () => {
      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: jest.fn() }}}>
          <Switch bsSize="mn" onChange={jest.fn()} isReadOnly={true} />
        </RenderWithProvider>
      );

      expect(wrapper.find('label').props().tabIndex).toEqual(-1);
    });

    it('tabIndex is -1 when disabled', () => {
      const wrapper = mount(
        <RenderWithProvider value={{ formOptions: { handleSubmit: jest.fn() }}}>
          <Switch bsSize="mn" onChange={jest.fn()} disabled={true} />
        </RenderWithProvider>
      );

      expect(wrapper.find('label').props().tabIndex).toEqual(-1);
    });
  });
});
