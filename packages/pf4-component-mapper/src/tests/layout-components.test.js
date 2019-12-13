import { mount } from 'enzyme';
import { Button, ActionGroup, TextContent, Text } from '@patternfly/react-core';
import { layoutComponents } from '@data-driven-forms/react-form-renderer';
import layoutMapper from '../form-fields/layout-components';

describe('Layout mapper', () => {
  it('should return PF4 Button', () => {
    expect(mount(layoutMapper[layoutComponents.BUTTON]({})).find(Button)).toHaveLength(1);
  });

  it('should return PF4 ButtonGroup', () => {
    expect(mount(layoutMapper[layoutComponents.BUTTON_GROUP]({})).find(ActionGroup)).toHaveLength(1);
  });

  it('should return PF4 Title', () => {
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find(TextContent)).toHaveLength(1);
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find(Text)).toHaveLength(1);
  });

  it('should return PF4 Description', () => {
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find(TextContent)).toHaveLength(1);
    expect(mount(layoutMapper[layoutComponents.TITLE]({})).find(Text)).toHaveLength(1);
  });

  it('should return PF4 Button disabled', () => {
    const wrapper = mount(layoutMapper[layoutComponents.BUTTON]({ disabled: true }));

    expect(wrapper.find(Button)).toHaveLength(1);
    expect(wrapper.find(Button).props().isDisabled).toEqual(true);
  });
});
