import React, { ReactNode } from "react";

export interface WithDescriptionProps {
  labelText?: ReactNode;
  description?: ReactNode;
}

declare const WithDescription: React.ComponentType<WithDescriptionProps>;

export default WithDescription;
