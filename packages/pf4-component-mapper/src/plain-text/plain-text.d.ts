import { ReactNode } from "react";
import { ContentProps, TextContentProps } from "@patternfly/react-core";

interface InternalPlainTextProps {
  label: ReactNode;
  name: string;
  variant?: 'p'|'span'|'strong'|'b'|'cite'|'caption'|'code'|'em'|'i'|'h1'|'h2'|'h3'|'h4'|'h5'|'h6'|'h6'|'div'|'label'|'pre'|'q'|'samp'|'small'|'sub'|'sup';
  TextContentProps: TextContentProps,
}

export type PlainTextProps = InternalPlainTextProps & ContentProps;

declare const PlainText: React.ComponentType<PlainTextProps>;

export default PlainText;
