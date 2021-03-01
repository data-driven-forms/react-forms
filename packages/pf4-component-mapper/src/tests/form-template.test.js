import React from 'react';
import { mount } from 'enzyme';
import { Button as PF4Button, ActionGroup, TextContent, Text } from '@patternfly/react-core';

import { Button, Title, ButtonGroup, Description } from '../form-template';

describe('Layout mapper', () => {
  it('should return PF4 Button', () => {
    expect(mount(<Button label="some label" />).find(PF4Button)).toHaveLength(1);
  });

  it('should return PF4 ButtonGroup', () => {
    expect(mount(<ButtonGroup />).find(ActionGroup)).toHaveLength(1);
  });

  it('should return PF4 Title', () => {
    const wrapper = mount(<Title />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
  });

  it('should return PF4 Description', () => {
    const wrapper = mount(<Description />);

    expect(wrapper.find(TextContent)).toHaveLength(1);
    expect(wrapper.find(Text)).toHaveLength(1);
  });

  it('should return PF4 Button disabled', () => {
    const wrapper = mount(<Button disabled={true} label="some label" />);

    expect(wrapper.find(PF4Button)).toHaveLength(1);
    expect(wrapper.find(PF4Button).props().isDisabled).toEqual(true);
  });
});
