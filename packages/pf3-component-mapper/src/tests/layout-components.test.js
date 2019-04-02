import { mount } from 'enzyme';
import { Col, FormGroup, Button, ButtonGroup, Icon, HelpBlock, Form } from 'patternfly-react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import layoutMapper from '../form-fields/layout-components';

describe('Layout mapper', () => {
  it('should return PF3 Col', () => {
    expect(mount(layoutMapper[layoutComponents.COL]({})).find(Col)).toHaveLength(1);
  });

  it('should return PF3 Button', () => {
    expect(mount(layoutMapper[layoutComponents.BUTTON]({})).find(Button)).toHaveLength(1);
  });

  it('should return PF3 Form', () => {
    expect(mount(layoutMapper[layoutComponents.FORM_WRAPPER]({})).find(Form)).toHaveLength(1);
  });

  it('should return PF3 FormGroup', () => {
    expect(layoutMapper[layoutComponents.FORM_GROUP]).toEqual(FormGroup);
  });

  it('should return PF3 ButtonGroup', () => {
    expect(mount(layoutMapper[layoutComponents.BUTTON_GROUP]({})).find(ButtonGroup)).toHaveLength(1);
  });

  it('should return PF3 Icon', () => {
    expect(mount(layoutMapper[layoutComponents.ICON]({ name: 'Foo' })).find(Icon)).toHaveLength(1);
  });

  it('should return PF3 HelpBlock', () => {
    expect(layoutMapper[layoutComponents.HELP_BLOCK]).toEqual(HelpBlock);
  });

  it('should return PF3 Title', () => {
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find('h3')).toHaveLength(1);
  });

  it('should return PF3 Description', () => {
    expect(mount(layoutMapper[layoutComponents.DESCRIPTION]({})).find('p')).toHaveLength(1);
  });
});
