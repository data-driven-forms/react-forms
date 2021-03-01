import { ReactNode } from "react";

export interface PlainTextProps {
  label: ReactNode;
  name: string;
  variant?: 'p'|'span'|'strong'|'b'|'cite'|'caption'|'code'|'em'|'i'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'h6'|'div'|'label'|'pre'|'q'|'samp'|'small'|'sub'|'sup';
}

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
