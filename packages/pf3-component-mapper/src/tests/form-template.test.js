import React from 'react';
import { mount } from 'enzyme';
import { Button, Form } from 'patternfly-react';
import { Button as FormButton, FormWrapper, Title, Description } from '../components/form-template';

describe('Layout mapper', () => {
  it('should return PF3 Button', () => {
    expect(mount(<FormButton />).find(Button)).toHaveLength(1);
  });

  it('should return PF3 Form', () => {
    expect(mount(<FormWrapper />).find(Form)).toHaveLength(1);
  });

  it('should return PF3 Title', () => {
    expect(mount(<Title />).find('h1')).toHaveLength(1);
  });

  it('should return PF3 Description', () => {
    expect(mount(<Description />).find('p')).toHaveLength(1);
  });
});
