import { Field } from "@data-driven-forms/react-form-renderer";
import { ReactNode } from "react";

import { RowProps } from "antd/lib/row";
import { ColProps } from "antd/lib/col";
import { TitleProps } from "antd/lib/typography/Title";
import { ParagraphProps } from "antd/es/typography/Paragraph";

export interface SubFormProps {
  fields: Field | Field[];
  title?: ReactNode;
  description?: ReactNode;
  TitleRowProps?: RowProps;
  TitleColProps?: ColProps;
  TitleProps?: TitleProps;
  DescriptionColProps?: ColProps;
  DescriptionProps?: ParagraphProps;
  DescriptionRowProps?: RowProps;
  RowProps?: RowProps;
  ColProps?: ColProps;
  name: string;
}

declare const SubForm: React.ComponentType<SubFormProps>;

export default SubForm;
