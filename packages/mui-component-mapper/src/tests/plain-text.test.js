import React from 'react';
import { render, screen } from '@testing-library/react';

import PlainText from '../plain-text';

describe('PlainText component', () => {
  it('renders correctly with three paragraphs', () => {
    const label = 'One \n Two \n Three';
    const name = 'name';

    render(<PlainText name={name} label={label} />);

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Three')).toBeInTheDocument();
  });

  it('renders correctly with one paragraphs', () => {
    const label = 'One';
    const name = 'name';

    render(<PlainText name={name} label={label} />);

    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
