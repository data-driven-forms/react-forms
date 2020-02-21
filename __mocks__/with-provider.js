import React from 'react';
import { RendererContext } from "@data-driven-forms/react-form-renderer";

const RenderWithProvider = ({value, children}) => <RendererContext.Provider
    value={{
        ...value
    }}
>
    {children}
</RendererContext.Provider>;

export default RenderWithProvider