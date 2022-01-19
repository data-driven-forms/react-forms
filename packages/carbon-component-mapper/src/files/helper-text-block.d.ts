import { ReactNode } from "react";

export interface HelperTextBlockProps {
  helperText?: ReactNode;
  errorText?: ReactNode;
  warnText?: ReactNode;
}

declare const HelperTextBlock: React.ComponentType<HelperTextBlockProps>;

export default HelperTextBlock;
