import { TypographyProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface PlainTextProps extends Omit<TypographyProps, 'component'> {
  label: ReactNode;
  name: string;
  element?: ElementType;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
