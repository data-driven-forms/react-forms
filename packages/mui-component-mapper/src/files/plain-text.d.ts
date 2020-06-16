import { TypographyProps } from "@material-ui/core";
import { ReactNode } from "react";

export interface PlainTextProps extends TypographyProps {
  label: ReactNode;
  name: string;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
