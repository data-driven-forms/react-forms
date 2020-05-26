import { ComponentType } from "react";

export interface SchemaErrorProps {
  name: string;
  message: string;
}

declare const SchemaErrorComponent: ComponentType<SchemaErrorProps>;

export default SchemaErrorComponent;
