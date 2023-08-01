import React from 'react';
import { render, screen } from '@testing-library/react';

import { Button, Title, ButtonGroup, Description } from '../form-template';

describe('Layout mapper', () => {
  it('should return PF4 Button', () => {
    render(<Button label="some label" />);

    expect(screen.getByText('some label', { selector: 'button' })).toBeInTheDocument();
  });

  it('should return PF4 ButtonGroup', () => {
    render(
      <ButtonGroup>
        <Button label="some label" />
      </ButtonGroup>
    );

    expect(screen.getByText('some label', { selector: 'button' }).closest('.pf-v5-c-form__actions')).toBeInTheDocument();
  });

  it('should return PF4 Title', () => {
    render(<Title>Title</Title>);

    expect(screen.getByText('Title', { selector: 'h1' })).toBeInTheDocument();
  });

  it('should return PF4 Description', () => {
    render(<Description>Description</Description>);

    expect(screen.getByText('Description', { selector: 'p' })).toBeInTheDocument();
  });

  it('should return PF4 Button disabled', () => {
    render(<Button disabled={true} label="some label" />);

    expect(screen.getByText('some label', { selector: 'button' })).toBeDisabled();
  });
});
