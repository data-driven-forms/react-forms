import { mount } from 'enzyme';
import { Button, Form } from 'patternfly-react';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import layoutMapper from '../form-fields/layout-components';

describe('Layout mapper', () => {
  it('should return PF3 Button', () => {
    expect(mount(layoutMapper[layoutComponents.BUTTON]({})).find(Button)).toHaveLength(1);
  });

  it('should return PF3 Form', () => {
    expect(mount(layoutMapper[layoutComponents.FORM_WRAPPER]({})).find(Form)).toHaveLength(1);
  });

  it('should return PF3 Title', () => {
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find('h1')).toHaveLength(1);
  });

  it('should return PF3 Description', () => {
    expect(mount(layoutMapper[layoutComponents.DESCRIPTION]({})).find('p')).toHaveLength(1);
  });
});
