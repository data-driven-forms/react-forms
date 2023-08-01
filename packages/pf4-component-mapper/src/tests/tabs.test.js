import React from 'react';
import Tabs from '../tabs';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('Tabs component', () => {
  const props = {
    fields: [
      {
        title: 'cosiTitle',
        name: 'cosiName',
        fields: [],
      },
      {
        title: 'cosiTitle2',
        name: 'cosiName2',
        fields: [],
      },
    ],
  };

  it('should render tabs correctly', () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: (fields, formOptions) => <span className="content">Here would be form</span>,
          },
        }}
      >
        <Tabs {...props}></Tabs>
      </RenderWithProvider>
    );

    expect(screen.getAllByText('Here would be form')).toHaveLength(2);
    expect(screen.getByText('cosiTitle')).toBeInTheDocument();
    expect(screen.getByText('cosiTitle2')).toBeInTheDocument();
  });

  it('should switch tabs correctly', async () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: (fields, formOptions) => <div>{'Here would be form'}</div>,
          },
        }}
      >
        <Tabs {...props}></Tabs>
      </RenderWithProvider>
    );

    expect(screen.getByText('cosiTitle').closest('.pf-v5-c-tabs__item')).toHaveClass('pf-m-current');

    await userEvent.click(screen.getByText('cosiTitle2'));

    expect(screen.getByText('cosiTitle2').closest('.pf-v5-c-tabs__item')).toHaveClass('pf-m-current');
  });
});
