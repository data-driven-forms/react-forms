import { ReactNode } from "react";

export interface PlainTextProps {
  label: ReactNode;
  element?: string;
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
