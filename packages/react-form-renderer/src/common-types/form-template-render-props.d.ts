import { ElementType, ReactNode } from "react";
import Schema from "./schema";
import { AnyObject } from "../common-types/any-object";

export interface FormTemplateRenderProps extends AnyObject {
  formFields: ReactNode[];
  schema: Schema;
}

export default FormTemplateRenderProps;
