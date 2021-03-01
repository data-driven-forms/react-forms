import { ReactNode } from "react";
import Field from "./field";

interface Schema {
  title?: ReactNode;
  description?: ReactNode;
  fields: Field[];
}

export default Schema;
