import { ElementType } from "react";
import Schema from "./schema";
import { AnyObject } from "./common";

export interface FormTemplateRenderProps extends AnyObject {
  formFields: ElementType[];
  schema: Schema;
}

export default FormTemplateRenderProps;
