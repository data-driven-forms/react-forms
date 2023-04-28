import React from 'react';
import { Form as DDFForm, RendererContext } from '@data-driven-forms/react-form-renderer';
import { render, screen } from '@testing-library/react';

import { Form as OriginalForm } from 'antd';
import Slider from '../slider';

const Form = (props) => (
  <OriginalForm>
    <RendererContext.Provider value={{ formOptions: { internalRegisterField: jest.fn(), internalUnRegisterField: jest.fn() } }}>
      <DDFForm onSubmit={jest.fn()} {...props} />
    </RendererContext.Provider>
  </OriginalForm>
);

describe('<Slider />', () => {
  const initialProps = {
    label: 'Slider',
    name: 'slider',
  };

  it('should render default slider with label', () => {
    render(<Form>{() => <Slider {...initialProps} />}</Form>);

    expect(screen.getByRole('slider')).toBeInTheDocument();
    expect(screen.getByText('Slider')).toBeInTheDocument();
  });

  it('should have disabled prop when isDisabled is passed', () => {
    render(<Form>{() => <Slider {...initialProps} isDisabled />}</Form>);

    expect(screen.getByRole('slider')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should set value to array after first render if range propery is true', () => {
    render(<Form>{() => <Slider {...initialProps} range isDisabled />}</Form>);

    expect(screen.getAllByRole('slider')[0]).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getAllByRole('slider')[1]).toHaveAttribute('aria-valuenow', '100');
  });

  it('min/max should default to 0/100', () => {
    render(<Form>{() => <Slider {...initialProps} />}</Form>);

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemin', '0');
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuemax', '100');
  });
});
