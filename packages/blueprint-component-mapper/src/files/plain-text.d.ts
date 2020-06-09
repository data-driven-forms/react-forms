import { ReactNode } from "react";
import { ITextProps } from "@blueprintjs/core";

export interface PlainTextProps extends ITextProps {
  label: ReactNode;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
