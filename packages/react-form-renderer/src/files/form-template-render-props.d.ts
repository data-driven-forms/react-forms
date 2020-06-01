import { ComponentType, ElementType } from "react";
import Schema from "./schema";

export interface FormTemplateRenderProps {
  formFields: ElementType[];
  schema: Schema;
}

export default FormTemplateRenderProps;
