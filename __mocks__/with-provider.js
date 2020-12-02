/* eslint-disable react/prop-types */
import React from 'react';
import { RendererContext } from '@data-driven-forms/react-form-renderer';
import Form from '@data-driven-forms/react-form-renderer/form';

const RenderWithProvider = ({ value = { formOptions: {} }, children, onSubmit = () => {} }) => {
  return (
    <Form onSubmit={onSubmit}>
      {() => (
        <RendererContext.Provider
          value={{
            ...value
          }}
        >
          {children}
        </RendererContext.Provider>
      )}
    </Form>
  );
};

export default RenderWithProvider;
