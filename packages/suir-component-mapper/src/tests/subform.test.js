import React from 'react';
import { render, screen } from '@testing-library/react';

import Subform from '../sub-form';
import RenderWithProvider from '../../../../__mocks__/with-provider';

describe('subform', () => {
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

  const TITLE = 'TIIIITLE';
  const DESCRIPTION = 'THIS IS DESCRIPTION';

  it('should render correctly', () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
          },
        }}
      >
        <Subform {...props} />
      </RenderWithProvider>
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should render correctly with title', () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
          },
        }}
      >
        <Subform {...props} title={TITLE} />
      </RenderWithProvider>
    );

    expect(screen.getByText(TITLE)).toBeInTheDocument();
  });

  it('should render correctly with description', () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
          },
        }}
      >
        <Subform {...props} description={DESCRIPTION} />
      </RenderWithProvider>
    );

    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });

  it('should render correctly with title and description', () => {
    render(
      <RenderWithProvider
        value={{
          formOptions: {
            renderForm: jest.fn().mockImplementation(() => <h1>Content</h1>),
          },
        }}
      >
        <Subform {...props} title={TITLE} description={DESCRIPTION} />
      </RenderWithProvider>
    );

    expect(screen.getByText(TITLE)).toBeInTheDocument();
    expect(screen.getByText(DESCRIPTION)).toBeInTheDocument();
  });
});
