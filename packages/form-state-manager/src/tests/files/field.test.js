import React from 'react';
import { render, screen } from '@testing-library/react';

import FormStateManager from '../../form-state-manager';
import Field from '../../field';

describe('<Field />', () => {
  const initialProps = { name: 'some-field', initialValue: 'some-value' };

  it('renders with children', () => {
    render(<FormStateManager>{() => <Field {...initialProps}>{(props) => <input {...props.input} />}</Field>}</FormStateManager>);

    expect(screen.getByRole('textbox')).toHaveValue('some-value');
  });

  it('renders with string component', () => {
    const ref = React.createRef();

    render(<FormStateManager>{() => <Field {...initialProps} component="input" ref={ref} />}</FormStateManager>);

    expect(screen.getByRole('textbox')).toHaveValue('some-value');
  });

  it('renders with component as ComponentType', () => {
    const Component = ({ input }) => <input {...input} />;

    render(<FormStateManager>{() => <Field {...initialProps} component={Component} />}</FormStateManager>);

    expect(screen.getByRole('textbox')).toHaveValue('some-value');
  });

  it('renders with render function', () => {
    render(<FormStateManager>{() => <Field {...initialProps} render={(props) => <input {...props.input} />} />}</FormStateManager>);

    expect(screen.getByRole('textbox')).toHaveValue('some-value');
  });
});
