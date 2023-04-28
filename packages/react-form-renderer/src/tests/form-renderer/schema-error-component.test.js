import React from 'react';
import { render, screen } from '@testing-library/react';

import SchemaErrorComponent from '../../form-renderer/schema-error-component';

describe('schemaErrorComponent', () => {
  it('renders correctly', () => {
    const message = 'Error message';
    const name = 'Invalid schema :(';

    render(<SchemaErrorComponent message={message} name={name} />);

    expect(screen.getByText(name, { exact: false, selector: 'h2' })).toBeInTheDocument();
    expect(screen.getByText(message, { exact: false, selector: 'p' })).toBeInTheDocument();
  });
});
